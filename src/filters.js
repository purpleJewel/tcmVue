"use strict"

import utils from  './libs/utils';

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
 *  @param {string} [title] [此表格的title区别]
 *  @return {[string/html]}       [description]
 */

exports.getGridValue = (key, value, clz, title) => {
    const Const = window.getConst();
    const CustomSysLine = (key, value) => {
        switch (key) {
            case 'type':
                return Const.Const.SiteTypeNamesHT[value];
                break;
            case 'selected':
                return value ? (title ? '管辖': '<span class="tick"></span>') : '';
                break;
            default:
                return value;
                break;
        }
    };
    const CustomSysRole = (key, value) => {
        switch (key) {
            case 'siteType':
                return Const.Const.SiteTypeNamesHT[value];
                break;
            case 'promptable':
                return value ? '允许' : '';
                break;
            default:
                return value;
                break;
        }
    };
    const CustomSysUser = (key, value) => {
        switch (key) {
            case 'type':
                return Const.Const.UserTypeNamesHT[value];
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
        case 'sys-role':
            return CustomSysRole(key, value);
            break;
        case 'sys-user':
            return CustomSysUser(key, value);
            break;
        default:
            return value;
            break;
    }
};

/**
 * 显示dialog的每一项title
 * @param  {[string]} key   [列名]
 * @param  {[null]} value [参数]
 * @param  {[string]} clz   [dialog的class]
 * @return {[string]}       [description]
 */
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
    const CreateRole = (key, value) => {
        switch (key) {
            case 'name':
                return '角色名称';
            case 'siteType':
                return '所属单位类型';
            default:
                return value;
        }
    };
    const CreateUser = (key, value) => {
        switch (key) {
            case 'name':
                return '用户名';
            case 'account':
                return '登录账号';
            case 'password':
                return '登录密码';
            case 'account':
                return '登录账号';
            case 'valPwd':
                return '确定密码';
            case 'desc':
                return '说明';
            case 'type':
                return '用户类型';
            case 'role':
                return '用户角色';
            default:
                return value;
        }
    };
    const ChangePassword = (key, value) => {
        switch (key) {
            case 'password':
                return '新密码';
            case 'valPwd':
                return '确认新密码';
            default:
                return value;
        }
    }; 
    const CreateDevice = (key, value) => {
        switch (key) {
            case 'name':
                return '设备名称';
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
        case 'set-site':
            return '当前站点';
            break;
        case 'create-role':
            return CreateRole(key, value);
            break;
        case 'create-user': case 'edit-user':
            return CreateUser(key, value);
            break;
        case 'change-password':
            return ChangePassword(key,value);
            break;  
        case 'create-device': case 'edit-device':
            return CreateDevice(key, value);
            break; 
        default:
            return value;
            break;
    }
};