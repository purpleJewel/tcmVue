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
 *  @param {string} [key] [这列数据的key值]
 *  @param {string} [value] [用于显示的值]
 *  @param {string} [clz] [此表格的clz类区别]
 */

exports.getGridValue = (key, value, clz) => {
    const CustomSysLine = (key, value) => {
        switch (key) {
            case 'type':
                return TcmConst.SiteTypeNameHT[value];
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
            return CustomSysLine(key, value);
            break;
        default:
            return value;
            break;
    }
};

exports.getDialogTitle = (key, value, clz) => {
    const CreateSite = (key, value) => {
        switch (key) {
            case 'id':
                return '标识号';
            case 'no':
                return '编号';
            case 'name':
                return '名称';
            case 'type':
                return '类型';
            case 'ip':
                return 'IP地址';
            case 'desc':
                return '说明';
            default:
                return value;
        }
    };
    switch (clz) {
        case 'create-site':
            return CreateSite(key, value);
            break;
        case 'copy-site':
            return '数据源站点IP';
            break;
        default:
            return value;
            break;
    }
};