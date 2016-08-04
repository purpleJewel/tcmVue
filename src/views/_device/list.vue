<template>
<div id="body" transition="fade">
	<div class="device-list">
		<div class="list-tree">
			<div class="title">设备列表</div>
			<tree-view
				:tree-data="treeData"
				@active-node="getGridParams"
			></tree-view>
		</div>
		<div class="list-grid">
			<grid 
				:clz="grid.clz" 
				:title="grid.title"
				:has-checkbox="hasCheckbox"
				:paginative="grid.paginative"
				:headers="headers" 
				:tools="tools"
				:actions="actions"
				:get-data="grid.getData"
				:auto-handle="true",
				@handle="handleFn"
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
</div>
</template>
<script>

	import treeView from '../../components/tree/tree.vue';
	import grid from '../../components/grid/grid.vue';
	import dialog from '../../components/dialog.vue';
	import Utils from '../../libs/utils.js';

	let Caller = TCM.Global.deviceCaller;
	export default {
		data () {
			const _self = this;
			return {
				treeData: {},
				selected: null,
				item: null,
				gridParams: {
					siteId: null,
					majorTypeId: null,
					deviceTypeId: null
				},
				gridData: {
					headers: {
						titles: [],
						columns: [],
						widths: []
					}
				},
				grid: {
					clz: 'device-list',
					title: '设备列表',
					paginative: true,
					getData (params, cbFn) {
						Caller('getDevieList', _.merge({}, _self.gridParams, params), (result) => {
							result.headers.widths = _.map(result.headers.widths, (width) => {
								return Math.floor(width * 0.80);
							});
							_self.gridData.headers = result.headers;
							cbFn(result);
						});
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
			headers () {
				return this.gridData.headers;
			},
			current () {
				return this.gridParams.siteId == window.getConst().siteId;
			},
			//获取grid配置数据，并判断权限
			hasCheckbox () { 
				return this.current;
			},
			tools () { 
				const _self = this;
				let toolList = ['refresh', 'create', 'deleted'];
				if (!this.current)
					toolList = ['refresh'];
				else if (this.selected.children.length)
					toolList = ['refresh', 'deleted'];
				return _.reduce(toolList, (obj, item) => {
					obj[item] = _self[item];
					return obj;
				}, {});
			},
			actions () { 
				const _self = this;
				if (this.current)
					return [
						['edit', '编辑', _self.edit],
						['deleted', '删除', _self.deleted]
					];
				return [];
			}
		},
		methods: {
			findItem (node, n) {
				if (node.tier != n) {
					this.findItem(node.getParent(), n);
				} else {
					this.item = {
						id: node.id,
						name: node.name
					};
					return;
				}
			},
			getGridParams (model) {
				this.selected = model;
				let params = this.gridParams;
				if (model.tier === 0){
					params.siteId = model.id;
					params.majorTypeId = null;
					params.deviceTypeId = null;
					this.grid.title = model.name + '设备列表';
				} else if (model.tier === 1) {
					this.findItem(model, 0);
					params.siteId = this.item.id;
					params.majorTypeId = model.id;
					params.deviceTypeId = null;
					this.grid.title = this.item.name + '/' + model.name + '列表';
				} else {
					this.findItem(model, 0);
					params.siteId = this.item.id;
					const name = this.item.name;
					this.findItem(model, 1);
					params.majorTypeId = this.item.id;
					params.deviceTypeId = model.id;
					this.grid.title = name + '/' + this.item.name + '/' + model.name + '列表';
				}
				this.gridCbfn();
			},
			handleFn (cbFn) {
				this.gridCbfn = cbFn;
			},
			refresh (cbFn) {
				cbFn();
			},
			//default dialog okFn
			okFn () {},
			showDialog (cfg) {
				for (let key in this.dialog) {
					this.dialog[key] = cfg[key];
				}
				this.dialog.show = true;
			},
			//dialog配置及设置提交函数
			useDialog4Tool (cfg, cbFn) {
				this.showDialog({
					clz: cfg.clz,
					title: cfg.title,
					unit: cfg.params
				});
				this.okFn = () => {
					let msg = Utils.validator(cfg.params, this.dialog.clz);
					if (msg)
						return;
					Caller(cfg.callerName, cfg.params, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			},
			edit (cbFn, item) {
				Caller('getEditDevice', {id: item.id}, (result) => {
					const title = result.typeName;
					delete result.typeName;
					this.useDialog4Tool({
						clz: 'edit-device',
						title: '修改' + title,
						params: result,
						callerName: 'editDevice'
					}, cbFn);
				});
			},
			create (cbFn) {
				Caller('getCreateDevice', {id: this.selected.id}, (result) => {
					const title = result.typeName;
					delete result.typeName;
					this.useDialog4Tool({
						clz: 'create-device',
						title: '新建' + title,
						params: result,
						callerName: 'createDevice'
					}, cbFn);
				});
			},
			deleted (cbFn, selected) {
				const ids = _.isArray(selected) ? selected : [selected.id];
				this.showDialog({
					clz: 'deleted-device',
					title: '删除设备',
					content: '是否删除选中设备？'
				});
				this.okFn = () => {
					Caller('deleteDevices', {ids: ids}, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			}
		},
		components: {
			treeView,
			grid,
			dialog
		},
		ready () {
			const _self = this;
			Caller('getDeviceTree', {}, (result) => {			
				_self.treeData = result;
			});
		}
	}
</script>
<style lang="less">
	.device-list{
		position: relative;
		.title{
			border-bottom: 1px solid #1f2c39;
		}
		.list-tree{
			width: 250px;
			position: absolute;
			top: 0;
			left: 0;
		}
		.list-grid{
			margin-left: 260px;
		}
		.create-device, .edit-device{
			.pro-type{
				display: none;
			}
			.label{
				width: 90px;
			}
		}
	}
</style>