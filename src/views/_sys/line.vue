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
				<a class="set-siteName" @click="setSiteName" v-if="!siteName"></a>
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
			let _self = this;
			return {
				lineName: localStorage.lineName,
				siteName: localStorage.siteName,
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
			setSiteName () {
				alert('setSiteName');
			},
			okFn () {},
			getDialog (cfg) {
				for (let key in this.dialog) {
					this.dialog[key] = cfg[key];
				}
				this.dialog.show = true;
			},
			refresh (cbFn) {
				cbFn();
			},
			changeSite (params, clz, title, callerName, cbFn) {
				params.dropdownArr = ['type'];
				params.dropdownList = {
					type: (() => {
						const arr = [];
						for (let key in Const.SiteTypeNameHT) {
							arr.push({name: Const.SiteTypeNameHT[key], value: key});
						}
						return arr;
					})()
				};
				this.getDialog({
					clz: clz,
					title: title,
					unit: params
				});
				this.okFn = () => {
					let msg = Utils.validator(params, this.dialog.clz);
					if (msg)
						return;
					delete params.dropdownArr;
					delete params.dropdownList;
					Caller(callerName, params, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			},
			create (cbFn) {
				const unit = {
					id: '',
					no: '',
					name: '',
					type: '',
					ip: '',
					desc: ''
				};
				this.changeSite(unit, 'create-site', '新建站点', 'createSite', cbFn);
			},
			edit (cbFn, item) {
				Caller('getSite', {id: item.id}, (result) => {
					delete result.lineId;
					delete result.selected;
					this.changeSite(result, 'create-site', '修改站点', 'editSite', cbFn);
				});
			},
			deleted (cbFn, selected) {
				const ids = _.isArray(selected) ? selected : [selected.id];
				this.getDialog({
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
			copy (cbFn) {
				const unit = {ip: ''};
				this.changeSite(unit, 'copy-site', '拷贝站点', 'copySite', cbFn);
			},
			affiliate (cbFn) {
				alert('affiliate');
				cbFn();
			}
		},
		components: {
			grid,
			dialog
		},
		ready () {

		}
	}
</script>
<style lang="less">
	#body{
		margin-top: 30px;
	}
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
	.create-site{
		.pro-id{
			display: block;
		}
	}
	.copy-site{
		.content{
			.label{width: 100px;}
		}
	}
</style>