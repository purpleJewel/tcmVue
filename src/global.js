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
			 * 登录系统
			 * @param  {} ( [description]
			 * @return {siteId, siteName, siteType, userName, userId, userType, lineName}   [description]
			 */
			setTimeout(() => {cbFn(Test.getAllSites(params));}, 200);
			break;
		// case 'logout':
		// 	setTimeout(() => {cbFn(Test.logout(params));}, 200);
		// 	break;
	}
};
