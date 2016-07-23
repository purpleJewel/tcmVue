<template>
<div id="body" transition="fade">
	<div id="sysline-grid">
		<grid 
			:clz="grid.clz" 
			:title="grid.title"
			:has-checkbox="hasCheckbox"
			:headers="grid.headers" 
			:columns="grid.columns" 
			:tools="tools"
			:actions="actions"
			:get-data="grid.getData"
		></grid>
	</div>
	<dialog 
		:show.sync="dialog.show" 
		:clz="dialog.clz"
		:title="dialog.title"
		:unit.sync="dialog.unit" 
		@check-site="setPromptable"
		@ok-fn="okFn">
		<div slot="content">{{dialog.content}}</div>
	</dialog>
</div>
</template>
<script>
	import grid from '../../components/grid/grid.vue';
	import dialog from '../../components/dialog.vue';
	import Const from '../../libs/const.js';
	import Utils from '../../libs/utils.js';

	const Caller = TCM.Global.sysCaller;

	export default {
		data () {
			return {
				grid: {
					clz: 'sys-role',
					title: '角色管理',
					headers: ['角色名称','角色所属单位类型', '特殊情况下是否允许启动临时授权'],
					columns: ['name', 'siteType', 'promptable'],
					getData (params, cbFn) {
						Caller('getRoles', _.merge({}, params), cbFn);
					}
				},
				dialog: {
					show: false,
					clz: '',
					title: '',
					content: '',
					unit: null
				}
			};
		},
		computed: {
			//获取grid配置数据，并判断权限
			hasCheckbox () { 
				if (window.OCC) 
					return true;
				return false;
			},
			tools () { 
				const _self = this;
				let toolList = ['refresh'];
				if (window.OCC) 
					toolList = ['refresh', 'create', 'deleted'];
				return _.reduce(toolList, (obj, item) => {
					obj[item] = _self[item];
					return obj;
				}, {});
			},
			actions () { 
				const _self = this;
				if (window.OCC) 
					return _.reduce(['edit', 'deleted'], (obj, item) => {
						obj[item] = _self[item];
						return obj;
					}, {});
				return {};
			}
		},
		methods: {
			//设置特殊情况下允许启动临时授权
			setPromptable (key, status) {
				this.promptable = status;
			},
			//default dialog okFn
			okFn () {},
			showDialog (cfg) {
				for (let key in this.dialog) {
					this.dialog[key] = cfg[key];
				}
				this.dialog.show = true;
			},
			//获取设置dialog中dropdownArr后的对象
			getDropDown (clz, unit) {
				unit.checkboxList = [{key: unit.id, text: '特殊情况下允许启动临时授权', selected: unit.promptable}];
				unit.dropdownArr = ['siteType'];
				unit.dropdownList = {
					siteType: (() => {
						const arr = [];
						for (let key in Const.SiteTypeNameHT) {
							arr.push({name: Const.SiteTypeNameHT[key], value: key});
						}
						return arr;
					})()
				};
				return unit;
			},
			//dialog配置及设置提交函数
			useDialog4Tool (cfg, cbFn) {
				this.promptable = false;
				cfg.params = this.getDropDown(cfg.clz, cfg.params);
				delete cfg.params.promptable;
				this.showDialog({
					clz: cfg.clz,
					title: cfg.title,
					unit: cfg.params
				});
				this.okFn = () => {
					cfg.params.promptable = this.promptable;
					let msg = Utils.validator(cfg.params, this.dialog.clz);
					if (msg)
						return;
					delete cfg.params.dropdownArr;
					delete cfg.params.dropdownList;
					delete cfg.params.checkboxList;
					Caller(cfg.callerName, cfg.params, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			},
			//表格刷新
			refresh (cbFn) {
				cbFn();
			},
			//新建用户角色
			create (cbFn) {
				let unit = _.reduce(['name', 'siteType', 'promptable'], (acc, item, idx) => {
					acc[item] = '';
					return acc;
				}, {});
				this.useDialog4Tool({
					clz: 'create-role',
					title: '新建用户角色',
					callerName: 'createRole',
					params: unit
				}, cbFn);
			},
			//编辑用户角色
			edit (cbFn, item) {
				Caller('getRole', {id: item.id}, (result) => {
					this.useDialog4Tool({
						clz: 'create-role', 
						title: '编辑用户角色', 
						callerName: 'editRole',
						params:result
					}, cbFn);
				});
			},
			//删除角色
			deleted (cbFn, selected) {
				const ids = _.isArray(selected) ? selected : [selected.id];
				this.showDialog({
					clz: 'deleted-role',
					title: '删除角色',
					content: '是否删除选中角色？'
				});
				this.okFn = () => {
					Caller('deletedRoles', {ids: ids}, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			}
		},
		components: {
			grid,
			dialog
		}
	}
</script>
<style lang="less">
	.sys-role{
		.col-name, .col-siteType{
			width: 20%;
		}
		.col-promptable{
			width: 30%;
		}
	}
	.create-role{
		.content{
			.label{width: 90px;}
			.checkbox{margin-right: 10px;}
		}
	}
</style>