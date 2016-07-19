"use strict"

import utils from  './libs/utils';
import TcmConst from './libs/const.js';

/**格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
    if (friendly) {
        return utils.MillisecondToDate(new Date() - new Date(time));
    } else {
        return utils.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
    }
};


/** 获取表格每一个栏数据
 *  @param {string} [value] [用于显示的值]
 *  @param {string} [key] [这列数据的key值]
 *  @param {string} [clz] [此表格的clz类区别]
 */

exports.getGridValue = (value, key, clz) => {
    const customSysLine = (key, value) => {
        switch (key) {
            case 'type':
                return TcmConst.SiteTypeNames[value];
                break;
            case 'selected':
                return value ? '<span class="tick"></span>' : '';
                break;
            default:
                return value;
                break;
        }
    };
    switch (clz) {
        case 'sys-line':
            return customSysLine(key, value);
            break;
        default:
            return value;
            break;
    }
};