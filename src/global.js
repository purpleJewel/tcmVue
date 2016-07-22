'use strict'

import sim from '../sim/sim.js';
//注册接口数据：接口名、回调函数。

window.TCM = {};
TCM.Global = {};


// import commnication from './libs/commnication.js';

TCM.Global.common = (name, params, cbFn, failFn) => {
	switch (name) {
		case 'login':
			/**
			 * 登录系统
			 * @param  {userName, password} ( [description]
			 * @return {siteId, siteName, siteType, userName, userId, userType, lineName}   [description]
			 */
			setTimeout(() => {cbFn(Test.login(params));}, 200);
			break;
		case 'logout':
			setTimeout(() => {cbFn(Test.logout(params));}, 200);
			break;
		// case 'getSession':
		// 	setTimeout(() => {cbFn(Test.getSession(params));}, 200);
		// 	break;
	}
};

TCM.Global.sysCaller = (name, params, cbFn, failFn) => {
	switch (name) {
		case 'getAllSites':
			/**
			 * 进入线路页面
			 * @param  {} ( [description]
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
			 * @param  {id} ( [description]
			 * @return {id, no, type, name, ip, desc}   [description]
			 */
			setTimeout(() => {cbFn(Test.getSite(params));}, 200);
			break;
		case 'createSite':
			/**
			 * 添加站点
			 * @param  {id, no, type, name, ip, desc} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.createSite(params));}, 200);
			break;
		case 'editSite':
			/**
			 * 修改站点
			 * @param  {id, no, type, name, ip, desc} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editSite(params));}, 200);
			break;
		case 'deletedSites':
			/**
			 * 删除站点
			 * @param  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deletedSites(params));}, 200);
			break;
		case 'copySite':
			/**
			 * 删除站点
			 * @param  {id} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.copySite(params));}, 200);
			break;
	}
};
