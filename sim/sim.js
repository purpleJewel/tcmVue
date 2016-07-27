const Const = {};
Const.SiteTypes = {TCC : 0, OCC: 1, Depot: 2, Station: 3, BOCC: 4, LinePolice: 5, PTSD:6};
Const.UserTypes = {Super: 0, Admin:1, User :2};
Const.SiteTypeNamesHT = {0: "指挥中心", 1: "控制中心", 2: "车辆段／停车场", 3: "车站", 4: "备用控制中心", 5: "公安派出所", 6: "公交总队"};
Const.UserTypeNamesHT = {0: "超级用户", 1: "管理员", 2: "普通用户"};
// Const.DeviceTypes = {
// 	TNM: 0, TVS: 1, TAS: 2, TVR: 3,
// 	Storage: 10, 
// 	IPCFixed: 20, IPCSemiSphere: 21, IPCSphere: 22, 
// 	CameraFixed: 31, CameraSemiSphere: 32, CameraSphere: 33, 
// 	RedirectPickup: 40, OmnidirectPickup: 41,
// 	Coder: 50, Decoder: 51, Spliter: 52, Monitor: 53, Terminal: 54, SpecialDecoder: 55,
// 	HUB: 60, PDH: 61, FiberConvertor: 62, KVM: 63, PDU: 64, VDM: 65,
// 	Other: 90
// };
// Const.DeviceTypeNames = {
// 	0: "网管服务器", 1: "视频服务器", 2: "视频分析服务器", 3: "存储服务器",
// 	10: "存储设备",
// 	20: "固定枪机",  21: "半球机",  22: "球机",
// 	31: "固定枪机",  32: "半球机",  33: "球机",
// 	40: "定向拾音器",41: "全向拾音器",
// 	50: "编码器",  51: "解码器",  52: "画面分割器",53: "监视器",  54: "控制终端", 55: "解码器",
// 	60: "交换机",  61: "光端机",  62: "光纤收发器",63: "数字KVM",64: "数字PDU", 65: "字符叠加器",
// 	90: "其他设备"
// };

window.Test = {};
let session = {};
session.Const = Const;
let siteType = 1;
let userType = 1;
let siteName = '西直门';
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
	session.lineName = '13号线';
	return session;
};
Test.refresh = () => {
	session.siteName = siteName;
	session.siteId = 1;
	session.siteType = siteType;
	session.userName = 'admin';
	session.userId = 1;
	session.userType = 1;
	session.lineName = '13号线';
	return session;
};

Test.logout = () => {
	session = {};
};

var SiteTypes = Const.SiteTypes;
var SiteTypeNamesHT = Const.SiteTypeNamesHT;

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

function getData2Grid(params, arr){
	return {
		total: arr.length,
		data: arr.slice(params.pageNo * params.pageSize, (params.pageNo+1) * params.pageSize)
	};
}

/***********************线路和车站管理****************************/

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

/**************************角色管理******************************/

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

/***********************用户管理*********************/

var Users = {
	super : {id: 0, name: "超级用户", type: 0, siteId : 0},
	admin : [
		{id: 1, name: "张无忌", account: "admin1", type: 1, siteId : '站点1'},
		{id: 2, name: "杨无悔", account: "admin2", type: 1, siteId : '站点2'},
		{id: 3, name: "赵敏", account: "admin3", type: 1, siteId : '站点3'},
		{id: 4, name: "阳顶天", account: "admin4", type: 1, siteId : '站点4'}
	],
	users : []
};

var SNames = "赵钱孙李周吴郑王刘花辛魏宋马朱陆".split("");
var LNames = "系统部署时由超级用户创建拥有创建修改删除各自车站的普通用户及赋予权限拥有创建修改删除等权限不能登陆以及云台控制等权限".split("");
var SiteTypeNames = [];
for (var key in SiteTypeNamesHT) {
	SiteTypeNames.push(SiteTypeNamesHT[key]);
}

var RolesSelectable = _.map(SiteTypeNames, function(item, idx){
	return _.reduce(UserRoles, function(acc, r, _idx){
		if (r.siteType === idx)
			acc.push(r.name);
		return acc;
	}, []);
});

function getUser(idx){
	var username = getRandonItem(SNames) + getRandonItem(LNames) +  getRandonItem(LNames);
	var site = getRandonItem(Sites);
	while(site.type == 4)
		site = getRandonItem(Sites);
	return {
		id : 10 + idx, name : username, account: "user" + idx, type: 2,
		siteId: '站点'+site.id, role : getRandonItem(RolesSelectable[site.type]),
		desc : "<asdasd><asdaSD<asd>",
		access:""
	};
}
Users.users = (function(){
	var arr = [];
	for (var i=0; i<300; i++)
		arr.push(getUser(i));
	return arr;
})();

var userIds = [].concat(_.map(Users.admin, user => user.id), _.map(Users.users, user => user.id));

Test.getUsers = (params) => {
	return getData2Grid(params, [].concat(Users.admin, Users.users));
};

Test.changePassword = (params) => {

};

Test.deletedUsers = (params) => {
	var arr = _.difference(userIds, params.ids);
	if (arr.length === 0) {
		Users.users = [];
		return Users.admin = [];
	}
	Users.admin = _.reduce(Users.admin, (acc, user) => {
		if (_.indexOf(arr, user.id) > -1)
			acc.push(user);
		return acc;
	}, []);
	Users.users = _.reduce(Users.users, (acc, user) => {
		if (_.indexOf(arr, user.id) > -1)
			acc.push(user);
		return acc;
	}, []);
	return Users;
};

Test.getUserRoles = () => {
	return _.map([
			"TCC 调度员",
			"控制中心防灾值班员",
			"控制中心行车调度员",
			"控制中心电力调度员",
			"控制中心AFC调度员", 
			"车辆段/停车场防灾值班员",	
			"车辆段/停车场行车值班员",	
			"车辆段/停车场运转值班员",	
			"车辆段/停车场安保值班员", 
			"车站防灾值班员", 		
			"车站行车值班员", 		
			"换乘线路车站值班员",
			"公安车站值班员",		
			"公安派出所调度员",	
			"公安派出所值班员", 
			"公安交总队调度员及其它部门人员"
		], (name, idx) => {
		return {name: name, value: idx};
	});
};

Test.createUser = (params) => {
	if (params.type == Const.UserTypes.Admin) {
		params.id = Users.admin.length +1;
		Users.admin.push(params);
	} else {
		params.id = Users.users.length +20;
		Users.users.push(params);
	}
};

Test.getUser = (params) => {
	let user = {};
	user = getOneInArr(params, Users.admin) || getOneInArr(params, Users.users);
	if (user.type == Const.UserTypes.User) {
		delete user.access;
		user.role = Math.floor(Math.random() * 16);
		user.dropdownArr = ['role'];
		user.dropdownList = {
			role: Test.getUserRoles()
		}
	} else {
		delete user.actions;
	}
	user.desc = '';
	return user;
};

Test.editUser = (params) => {
	
};

Test.chgpriv = (params) => {

};

/********************系统设置************************/

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


/********************设备列表*************************/
Test.getDeviceTree = () => {
	return {
		id: 0,
		name: 'My Tree',
		children: [
			{id: 1, name: 'hello' },
			{id: 2, name: 'wat' },
			{
				id: 3, 
				name: 'child1 folder',
				children: [
					{ 
						id: 4, 
						name: 'child2 folder',
						children: [
							{id: 5, name: 'hello' },
							{id: 6, name: 'wat' }
						]
					},
					{id: 7, name: 'hello' },
					{id: 8, name: 'wat' },
					{ 
						id: 9, 
						name: 'child3 folder',
						children: [
							{id: 10, name: 'hello' },
							{id: 11, name: 'wat' }
						]
					}
				]
			}
		]
	};
};