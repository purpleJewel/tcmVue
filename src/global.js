'use strict'

window.TCM = {};
TCM.Global = {};

import commnication from './libs/commnication.js';

TCM.Global.common = (name, params, cbFn, failFn) => {
	switch (name) {
		case 'login':
			cbFn(setTimeout(() => {console.log('login');}, 200));
			break;
		case 'logout':
			cbFn(setTimeout(() => {console.log('logout');}, 200));
			break;
	}
};