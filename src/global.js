'use strict'

import sim from '../sim/sim.js';
//注册接口数据：接口名、回调函数。

window.TCM = {};
TCM.Global = {};

// let requestHT = {
// 	'login': {
// 		request: 'login',
// 		response: 'response/login'
// 	}
	
// }

// function respenseFn(name, params, cbFn, failFn){
// 	let socket = requestHT[name];

// 	eventBus.once(socket.response, (result) => {
// 		cbFn(result);
// 		failFn(result)
// 	});
// 	client.send(socket.request, params);
// }


// import commnication from './libs/commnication.js';

TCM.Global.common = (name, params, cbFn, failFn) => {
	switch (name) {
		case 'login':
			/**
			 * 登录系统
			 * @params  {userName, password} ( [description]
			 * @return {siteId, siteName, siteType, userName, userId, userType, lineName}   [description]
			 */
			setTimeout(() => {cbFn(Test.login(params));}, 200);
			break;
		case 'logout':
			/**
			 * 退出系统
			 * @params  {} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.logout(params));}, 200);
			break;
		case 'refresh':
			/**
			 * 刷新或多开系统窗口
			 * @params  {} ( [description]
			 * @return {siteId, siteName, siteType, userName, userId, userType, lineName}   [description]
			 */
			cbFn(Test.refresh(params));
			break;
	}
};


TCM.Global.sysCaller = (name, params, cbFn, failFn) => {
	switch (name) {
		case 'setSite':
			/**
			 * 设置管辖站点
			 * @params  {id} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.setSite(params));}, 200);
			break;
		case 'getAllSites':
			/**
			 * 进入线路页面
			 * @params  {} ( [description]
			 * @return {
			 *         total,
			 *         data: [
			 *         	{id, no, type, name, ip, selected, desc}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getAllSites(params));}, 200);
			break;
		case 'getSite':
			/**
			 * 添加站点
			 * @params  {id} ( [description]
			 * @return {id, no, type, name, ip, desc}   [description]
			 */
			setTimeout(() => {cbFn(Test.getSite(params));}, 200);
			break;
		case 'createSite':
			/**
			 * 添加站点
			 * @params  {id, no, type, name, ip, desc} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.createSite(params));}, 200);
			break;
		case 'editSite':
			/**
			 * 修改站点
			 * @params  {id, no, type, name, ip, desc} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editSite(params));}, 200);
			break;
		case 'deletedSites':
			/**
			 * 删除站点
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deletedSites(params));}, 200);
			break;
		case 'copySite':
			/**
			 * 复制站点信息
			 * @params  {ip} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.copySite(params));}, 200);
			break;
		case 'getAffiliateSites':
			/**
			 * 获取可管辖站点
			 * @params  {} ( [description]
			 * @return {sites: [{id, name, type, selected}]}   [description]
			 */
			setTimeout(() => {cbFn(Test.getAffiliateSites(params));}, 200);
			break;
		case 'setAffiliateSites':
			/**
			 * 设置管辖站点
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.setAffiliateSites(params));}, 200);
			break;
		case 'getRoles':
			/**
			 * 进入角色管理页面
			 * @params  {} ( [description]
			 * @return {total, data: [{id, name, promptable, siteType}]}   [description]
			 */
			setTimeout(() => {cbFn(Test.getRoles(params));}, 200);
			break;
		case 'getRole':
			/**
			 * 获取角色信息
			 * @params  {} ( [description]
			 * @return {id, name, promptable, siteType}   [description]
			 */
			setTimeout(() => {cbFn(Test.getRole(params));}, 200);
			break;
		case 'createRole':
			/**
			 * 新建角色
			 * @params  {name, promptable, siteType} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.createRole(params));}, 200);
			break;
		case 'editRole':
			/**
			 * 修改角色
			 * @params  {id, name, promptable, siteType} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editRole(params));}, 200);
			break;
		case 'deletedRoles':
			/**
			 * 删除角色
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deletedRoles(params));}, 200);
			break;
		case 'getUsers':
			/**
			 * 进去用户管理
			 * @params  {pageNo, pageSize} ( [description]
			 * @return {
			 *         total,
			 *         data: [
			 *         	{access,account,desc,id,name,role,siteId,type}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getUsers(params));}, 200);
			break;
		case 'changePassword':
			/**
			 * 修改角色密码
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.changePassword(params));}, 200);
			break;
		case 'deletedUsers':
			/**
			 * 删除用户
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deletedUsers(params));}, 200);
			break;
		case 'getUserRoles':
			/**
			 * 新建用户时，获取可用roles
			 * @params  {} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.getUserRoles(params));}, 200);
			break;
		case 'createUser':
			/**
			 * 新建用户
			 * @params  {type, account, password, name, desc [role]} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.createUser(params));}, 200);
			break;
		case 'getUser':
			/**
			 * 修改用户信息时，获取用户信息
			 * @params  {id} ( [description]
			 * @return {type, account, name, desc [role]}   [description]
			 */
			setTimeout(() => {cbFn(Test.getUser(params));}, 200);
			break;
		case 'editUser':
			/**
			 * 新建用户
			 * @params  {type, account, name, desc [role]} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editUser(params));}, 200);
			break;
		case 'chgpriv':
			/**
			 * 修改用户权限
			 * @params  {id,} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.chgpriv(params));}, 200);
			break;
	}
};

TCM.Global.deviceCaller = (name, params, cbFn, failFn) => {
	switch (name) {
		case 'getDeviceTree':
			/**
			 * 进入设备管理页面，获取tree数据
			 * @params  {} ( [description]
			 * @return {  
		 	 *      id: i,
					name: siteNames[i],
					children: [
						{
							id: 50, 
							name: '服务器', 
							num: 22,
							children: [
								{id: 51, name: '网管服务器', num: 0},
								{id: 52, name: '视频服务器', num: 11},
								{id: 53, name: '视频分析服务器', num: 8},
								{id: 54, name: '存储服务器', num: 3}
							]
						},
						{id: 55, name: '存储设备', num: 3},
						{
							id: 56, 
							name: '数字摄像机', 
							num: 51,
							children: [
								{id: 57, name: '固定枪机', num: 15},
								{id: 58, name: '半球机', num: 20},
								{id: 59, name: '球机', num: 16}
							]
						}
					]
			 * }   
			 * [单站点数据，此数据为多站点数据的children里面一项]
			 */
			setTimeout(() => {cbFn(Test.getDeviceTree(params));}, 200);
			break;
		case 'getDevieList':
			/**
			 * 获取设备列表
			 * @params  {siteId, majorTypeId, deviceTypeId} ( [description]
			 * @return {
			 *    headers: [
			 *    	titles: [],
			 *    	columns: []
			 *    ],
			 *    total,
			 *    data: [id, name, type, desc...]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getDevieList(params));}, 200);
			break;
	}
}