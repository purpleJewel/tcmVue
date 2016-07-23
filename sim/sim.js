import Const from '../src/libs/const.js';

window.Test = {};
let session = {};
let siteType = 1;
let userType = 1;
let siteName = '';
Test.login = (params) => {
	if (params.userName == 'root') 
		userType = 0;
	else
		userType = 1;
	session.siteName = siteName;
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
function getOneInArr(params, arr){
	let _index = '';
	arr.forEach((item, idx) => {
		if (item.id == params.id)
			_index = idx;
	})
	return arr[_index];
}
function editOneInArr(params, arr){
	let _index = '';
	arr.forEach((item, idx) => {
		if (item.id == params.id)
			_index = idx;
	})
	arr[_index] = params;
}

var SiteTypes = Const.SiteTypes;
var SiteTypeNameHT = Const.SiteTypeNameHT;
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

var roleIds = UserRoles.map((role, idx) => {return role.id});

var Line = {id: 1, name: "13号线"};
var siteIds = [];
var allSiteIds = [];
function genSite(idx, name, type, _idx){
	if (type == 2 || type == 3) {
		siteIds.push(idx);
	}
	allSiteIds.push(idx);
	return {id: idx, name: name, lineId:1, type: type, ip: "192.168.1." + idx, selected: idx === 0 ? true : false, 
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

Test.setSite = (params) => {
	siteName = '望京';
};

Test.getAllSites = () => {
	return {
		total: Sites.length,
		data: Sites
	};
};

Test.createSite = (params) => {
	params.lineId = 1;
	Sites.push(params);
};

Test.getSite = (params) => {
	return getOneInArr(params, Sites);
};

Test.editSite = (params) => {
	editOneInArr(params, Sites);
};

Test.deletedSites = (params) => {
	var arr = _.difference(allSiteIds, params.ids);
	if (arr.length === 0) 
		return Sites = [];
	var arr1 = _.reduce(Sites, (acc, site) => {
		if (_.indexOf(arr, site.id) > -1)
			acc.push(site);
		return acc;
	}, []);
	Sites = arr1;
	return Sites;
};

Test.copySite = (params) => {
	
};

Test.getAffiliateSites = (params) => {
	return Sites;
};

Test.setAffiliateSites = (params) => {
	Sites.forEach((site) => {
		if (_.indexOf(params.ids, site.id) > -1)
			site.selected = true;
		else
			site.selected = false;
	});
};

Test.getRoles = () => {
	return {
		total: UserRoles.length,
		data: UserRoles
	};
};

Test.createRole = (params) => {
	params.id = UserRoles.length+1;
	UserRoles.push(params);
};

Test.getRole = (params) => {
	return getOneInArr(params, UserRoles);
};

Test.editRole = (params) => {
	editOneInArr(params, UserRoles);
};

Test.deletedRoles = (params) => {
	var arr = _.difference(roleIds, params.ids);
	if (arr.length === 0) 
		return UserRoles = [];
	var arr1 = _.reduce(UserRoles, (acc, role) => {
		if (_.indexOf(arr, role.id) > -1)
			acc.push(role);
		return acc;
	}, []);
	UserRoles = arr1;
	return UserRoles;
};