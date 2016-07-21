import Const from '../src/libs/const.js';

window.Test = {};
let session = {};
let siteType = 1;
let userType = 1;
Test.login = (params) => {
	if (params.userName == 'root') 
		userType = 0;
	else
		userType = 1;
	session.siteName = '望京';
	session.siteId = 1;
	session.siteType = siteType;
	session.userName = params.userName;
	session.userId = 1;
	session.userType = userType;
	session.lineName = '15号线';
	return session;
};
Test.logout = () => {
	session = {};
};

var _config = {
	ControlReleaseTime: "3000",// MS
	TimingSetting: '{"schedule":"01:00:00","useRS422":false,"useNTP":true,"ntpIP":"1.1.1.1","ntpPort":"1","autoTiming":true}',
	ServerBackupSetting: '{"backupTVS" : true,"backupSS": true}', 
	StorageBackupSetting : true, 
	Sync : false,
	ControlOsdEnable : true
}

Test.getConfig = () => {
	return _config;
};
Test.setConfig = (params) => {
	_config = params;
};
Test.timingSetting = (params) => {
	_config.TimingSetting = params;
};

function getRandonItem(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}
function getPagedData(arr, pageNo, pageSize){
	return {
		total : arr.length,
		items : IX.partLoop(arr, pageNo* pageSize, pageNo*pageSize + pageSize, [], function(acc, item){acc.push(item); return acc;})
	};
}

var SiteTypes = Const.SiteTypes;
var SiteTypeNames = Const.SiteTypeNames;
var UserRoles = [ 
["TCC 调度员",					SiteTypes.TCC, true],

["控制中心防灾值班员", 			SiteTypes.OCC],
["控制中心行车调度员", 			SiteTypes.OCC],
["控制中心电力调度员", 			SiteTypes.OCC],
["控制中心AFC调度员", 				SiteTypes.OCC],

["车辆段/停车场防灾值班员",			SiteTypes.Depot],
["车辆段/停车场行车值班员",			SiteTypes.Depot],
["车辆段/停车场运转值班员",			SiteTypes.Depot],
["车辆段/停车场安保值班员", 		SiteTypes.Depot],

["车站防灾值班员", 				SiteTypes.Station],
["车站行车值班员", 				SiteTypes.Station],
["换乘线路车站值班员", 			SiteTypes.Station],
["公安车站值班员",					SiteTypes.Station],

["公安派出所调度员",				SiteTypes.LinePolice],
["公安派出所值班员", 				SiteTypes.LinePolice],
["公安交总队调度员及其它部门人员",		SiteTypes.PTSD]
].map(function(r, idx) {
	return {id:idx+1, name: r[0], siteType: r[1], promptable : r[2] || false};
});

var Line = {id: 1, name: "13号线"};
var siteIds = [];
var allSiteIds = [];
function genSite(idx, name, type, _idx){
	if (type == 2 || type == 3) {
		siteIds.push(idx);
	}
	allSiteIds.push(idx);
	return {id: idx, name: name, lineId:1, type: type, ip: "192.168.1." + idx, selected: idx%3 === 0 ? 1 : 0, 
		no:idx+1, desc: type===3?("第"+ _idx + "站") : ""};
}
var siteNames = "西直门,大钟寺,知春路,五道口,上地,西二旗,龙泽,回龙观,霍营,立水桥,北苑,望京西,芍药居,光熙门,柳芳,东直门".split(",");
var Sites = [].concat(
	genSite(0, "地铁指挥中心", 0),
	genSite(1, "13号线控制中心", 1),
	genSite(2, "回龙观车辆段", 2),
	genSite(3, "东直门停车场", 2),
	siteNames.map(function(name, idx) {
		return genSite(4 + idx, name, 3, idx + 1);
	}),
	genSite(4 + siteNames.length, "13号线备用中心", 4),
	genSite(5 + siteNames.length, "13号线派出所", 5),
	genSite(6 + siteNames.length, "公交总队", 6)
);
var siteIds = Sites.map((item, idx) => {return item.id});
Test.getAllSites = () => {
	return {
		total: Sites.length,
		data: Sites
	};
}
Test.deletedSites = (params) => {
	var arr = _.difference(siteIds, params.ids);
	if (arr.length === 0) 
		return Sites = [];
	var arr1 = _.reduce(Sites, (acc, item) => {
		if (_.indexOf(arr, item.id) > -1)
			acc.push(item);
		return acc;
	}, []);
	Sites = arr1;
	return Sites;
}