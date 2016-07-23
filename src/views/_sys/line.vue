<template>
<div id="body" transition="fade">
	<div class="sys-info">
		<div class="lt icon">
			<div class="pic"></div>
			<div>线路信息</div>
		</div>
		<div class="lt text">
			<div>
				<span class="label">线路名称：</span>
				<input type="text" class="line-name" disabled="true" value="{{lineName}}">
			</div>
			<div>
				<span class="label">当前单位：</span>
				<input type="text" class="site-name" disabled="true" value="{{siteName}}">
				<a class="set-siteName" @click="setSite" v-if="!siteName"></a>
			</div>
		</div>
	</div>
	<div id="sysline-grid">
		<grid 
			:clz="grid.clz" 
			:title="grid.title"
			:has-checkbox="hasCheckbox"
			:headers="headers" 
			:columns="columns" 
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
		@check-site="setAffiliateSite"
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
				lineName: localStorage.lineName,
				siteName: localStorage.siteName,
				affiliateSites: [],
				grid: {
					clz: 'sys-line',
					title: '线路和车站管理',
					getData (params, cbFn) {
						Caller('getAllSites', _.merge({}, params), cbFn);
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
				if (window.Super || window.OCC) 
					return true;
				return false;
			},
			headers () { 
				if (window.PTSD) 
					return ['编号', '标识号','名字', '类型', 'IP地址', '管辖状态', '说明'];
				return ['编号', '标识号','名字', '类型', 'IP地址', '说明'];
			},
			columns () { 
				if (window.PTSD) 
					return ['no', 'id','name', 'type', 'ip', 'selected', 'desc'];
				return ['no', 'id','name', 'type', 'ip', 'desc'];
			},
			tools () { 
				const _self = this;
				let toolList = ['refresh'];
				if (window.PTSD && window.Super)
					toolList = ['refresh', 'create', 'deleted', 'copy', 'affiliate'];
				if (window.PTSD)
					toolList = ['refresh', 'affiliate'];
				if (window.Super || window.OCC) 
					toolList = ['refresh', 'create', 'deleted', 'copy'];
				return _.reduce(toolList, (obj, item) => {
					obj[item] = _self[item];
					return obj;
				}, {});
			},
			actions () { 
				const _self = this;
				if (window.Super || window.OCC) 
					return _.reduce(['edit', 'deleted'], (obj, item) => {
						obj[item] = _self[item];
						return obj;
					}, {});
				return {};
			}
		},
		methods: {
			//设置当前站点
			setSite () {
				Caller('getAllSites', {}, (result) => {
					const unit = {
						id: '',
						dropdownArr: ['id'],
						dropdownList: {
							id: _.map(result.data, (site) => {return {name: site.name, value: site.id};})
						}
					};
					this.showDialog({
						clz: 'set-site', 
						title: '设置当前站点', 
						callerName: 'setSite',
						content: '只能设置一次，请慎重！(修改后需重新登录)',
						unit: unit
					});
					this.okFn = () => {
						delete unit.dropdownArr;
						delete unit.dropdownList;
						Caller('setSite', unit, window.refreshView);
					};
				});
			},
			//用于监听dialog的checkbox选择事件
			setAffiliateSite (key, status) {
				if (status) 
					return this.affiliateSites.push(key);
				this.affiliateSites.splice(_.indexOf(this.affiliateSites, key), 1);
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
				if (clz == 'create-site' || clz == 'edit-site') {
					unit.dropdownArr = ['type'];
					unit.dropdownList = {
						type: (() => {
							const arr = [];
							for (let key in Const.SiteTypeNameHT) {
								arr.push({name: Const.SiteTypeNameHT[key], value: key});
							}
							return arr;
						})()
					};
					return unit;
				}
				return unit;
			},
			//dialog配置及设置提交函数
			useDialog4Tool (cfg, cbFn) {
				cfg.params = this.getDropDown(cfg.clz, cfg.params);
				this.showDialog({
					clz: cfg.clz,
					title: cfg.title,
					unit: cfg.params
				});
				this.okFn = () => {
					let msg = Utils.validator(cfg.params, this.dialog.clz);
					if (msg)
						return;
					delete cfg.params.dropdownArr;
					delete cfg.params.dropdownList;
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
			//创建站点
			create (cbFn) {
				let unit = _.reduce(['id', 'no', 'name', 'type', 'ip', 'desc'], (acc, item, idx) => {
					acc[item] = '';
					return acc;
				}, {});
				this.useDialog4Tool({
					clz: 'create-site',
					title: '新建站点',
					callerName: 'createSite',
					params: unit
				}, cbFn);
			},
			//修改站点
			edit (cbFn, item) {
				Caller('getSite', {id: item.id}, (result) => {
					delete result.lineId;
					delete result.selected;
					this.useDialog4Tool({
						clz: 'create-site', 
						title: '修改站点', 
						callerName: 'editSite',
						params:result
					}, cbFn);
				});
			},
			//删除站点
			deleted (cbFn, selected) {
				const ids = _.isArray(selected) ? selected : [selected.id];
				this.showDialog({
					clz: 'deleted-site',
					title: '删除站点',
					content: '是否删除选中站点？'
				});
				this.okFn = () => {
					Caller('deletedSites', {ids: ids}, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			},
			//复制站点数据
			copy (cbFn) {
				this.useDialog4Tool({
					clz: 'copy-site', 
					title: '拷贝站点', 
					callerName: 'copySite',
					params: {ip: ''}
				}, cbFn);
			},
			//设置管辖站点
			affiliate (cbFn) {
				Caller('getAffiliateSites', {}, (result) => {
					this.affiliateSites = _.reduce(result, (acc, site, idx) => {
						if (site.selected)
							acc.push(site.id);
						return acc;
					}, []);
					this.showDialog({
						clz: 'affiliate-site',
						title: '管辖车站配置',
						unit: {checkboxList: _.map(result, (site, idx) => _.merge(site, {key: site.id, text: site.name}))}
					});
					this.okFn = () => {
						Caller('setAffiliateSites', {ids: this.affiliateSites}, () => {
							this.dialog.show = false;
							cbFn();
						});
					};
				});
			}
		},
		components: {
			grid,
			dialog
		}
	}
</script>
<style lang="less">
	.sys-info{
		input{
			text-indent: 10px;
		}
		height: 140px;
		.line-name, .site-name{
			width: 230px;
		    text-align: left;
		    height: 22px;
		    background: rgba(0, 0, 0, 0.3);
		    border: none;
		    color: #787D82;
		    box-shadow: 0 0 6px #1f5e89;
		    font-size: 12px;
		}
		.icon{
			margin: 10px 100px 0px 90px;
			div{width: 72px; text-align: center; color: #fff; font-family: "微软雅黑";}
			.pic{
				margin-bottom: 15px;
				height: 72px;
				background: url(../../assets/images/pic/ico-line.png) no-repeat;
			}
		}
		.text{
			width: 335px;
			margin-top: 20px;
			&>div{margin-bottom: 10px;}
			.label{
				padding: .2em .6em .3em;
				font-size: 12px;
			}
			.set-siteName{
				display: inline-block;
				vertical-align: middle;
				margin-left: 5px;
				width: 16px; 
				height: 16px;
				background: url(../../assets/images/pic/site-set.png) no-repeat;
				&:hover{
					background-image: url(../../assets/images/pic/site-set-hover.png);
				}
			}
		}
	}
	.sys-line{
		.col-name, .col-type, .col-ip, .col-desc{
			width: 18%;
		}
		.col-selected{
			width: 7%;
		}
		.tick{
			width: 11px;
    		height: 9px;
    		display: inline-block;
    		background: url(../../assets/images/pic/tick.png);
		}
		.btn-affiliate{
			width: 108px;
			float: right;
			background-image: url(../../assets/images/pic/affiliate-sites.png);
		}
		.btn-copy{
			width: 125px;
			background-image: url(../../assets/images/pic/btn-copy.png);
		}
	}
	.create-site, .set-site{
		.pro-id{
			display: block;
		}
	}
	.copy-site{
		.content{
			.label{width: 100px;}
		}
	}
	.set-site{
		.content{
			.label{width: 70px;}
		}
	}
	.affiliate-site{
		width: 350px;
		.content{
			overflow: hidden;
			.pro-checkbox{
				margin: 0 0 0 28px;
				width: 140px;
				float: left;
				text-align: left;
			}
		}
	}
</style>