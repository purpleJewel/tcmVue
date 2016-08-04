<template>
<div id="body" transition="fade">
	<div class="zone-list">
		<div class="list-tree">
			<div class="title">
				<span>分区列表</span>
				<span title="新建分区" :class="{'btn add': true, 'allow': level0 || level1}" v-if="current" @click="createZone"></span>
				<span title="修改分区" :class="{'btn edit': true, 'allow': level1}" v-if="current" @click="editZone"></span>
				<span title="删除分区" :class="{'btn delete': true, 'allow': level1}" v-if="current" @click="deleteZone"></span>
			</div>
			<tree-view
				:tree-data="treeData"
				@active-node="getGridParams"
				v-ref:tree
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
			v-ref:dialog
			@ok-fn="okFn">
			<div slot="content">{{dialog.content}}</div>
		</dialog>
	</div>
</div>
</template>
<script>

	import treeView from '../../components/tree/tree.vue';
	import checkboxTree from '../../components/checkboxTree/checkboxTree.vue';
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
					zoneId: null,
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
					clz: 'zone-list',
					title: '设备列表',
					paginative: true,
					getData (params, cbFn) {
						Caller('getCamerasList', _.merge({}, _self.gridParams, params), (result) => {
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
			level0 () {
				return this.selected.tier == 0;
			},
			level1 () {
				return this.selected.tier == 1;
			},
			level2 () {
				return this.selected.tier == 2
			},
			//获取grid配置数据，并判断权限
			hasCheckbox () { 
				return this.current;
			},
			tools () { 
				const _self = this;
				let toolList = ['refresh'];
				if (this.current && this.level1)
					toolList = ['refresh', 'add', 'deleted'];
				if (this.current && (this.level0 || this.level2))
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
			setGridParams (site, zone, device) {
				this.gridParams.siteId = site;
				this.gridParams.zoneId = zone;
				this.gridParams.deviceTypeId = device;
			},
			getGridParams (model) {
				this.selected = model;
				let params = this.gridParams;
				if (model.tier === 0){
					this.setGridParams(model.id, null, null);
					this.grid.title = model.name + '摄像机列表';
				} else if (model.tier === 1) {
					this.findItem(model, 0);
					this.setGridParams(this.item.id, model.id, null);
					this.grid.title = this.item.name + '/' + model.name + '列表';
				} else {
					this.findItem(model, 0);
					const siteId = this.item.id;
					const name = this.item.name;
					this.findItem(model, 1);
					this.setGridParams(siteId, this.item.id, model.id);
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
			findNode (node, fn) {
				if (node.children.length) {
					for (let child of node.children) {
						this.findNode(child, fn);
					}
				} else {
					fn(node);
					return;
				}
			},
			getNode (child, _child) {
				if (child.id == _child.id) {
					child.num = _child.num;
					if (_child.children)
						this.setNode(child, _child.children);
				} else 
					return;
			},
			setNode (node, arr) {
				for (let child of node.children) {
					for (let _child of arr) {
						this.getNode(child, _child);
					}
				}
			},
			refreshTreeNode (arr) {
				let node = this.selected;
				if (this.level1) 
					node = this.selected.getParent();
				if (this.level2)
					node = this.selected.getParent().getParent();
				let numHT = {};
				for (let i of arr) {
					let count = 0;
					for (let k of i.children) {
						count += k.num;
					}
					i.num = count;
				}
				this.setNode(node, arr);
			},
			//default dialog okFn
			okFn () {},
			showDialog (cfg) {
				for (let key in this.dialog) {
					this.dialog[key] = cfg[key];
				}
				this.dialog.show = true;
			},
			add (cbFn) {
				const _self = this;
				Caller('getCameras', this.gridParams, (result) => {
					_self.showDialog({
						clz: 'add-camera',
						title: '添加摄像机',
						content: '添加到：' + _self.grid.title.slice(0, -2),
						unit: {
							tree: {
								treeData: result
							}
						}
					});
					_self.okFn = () => {
						let root = _self.$refs.dialog.getSelectArr();
						let selectArr = [];
						_self.findNode(root, (node) => {
							if (node.selected)
								selectArr.push(node.id);
						});
						Caller('addCameras', {ids: selectArr}, (result) => {
							_self.refreshTreeNode(result);
							_self.dialog.show = false;
							cbFn();
						});
					}
				});
			},
			deleted (cbFn, selected) {
				const ids = _.isArray(selected) ? selected : [selected.id];
				this.showDialog({
					clz: 'delete-camera',
					title: '删除摄像机',
					content: '是否删除选中摄像机？'
				});
				this.okFn = () => {
					Caller('deleteCameras', {ids: ids}, (result) => {
						this.refreshTreeNode(result);
						this.dialog.show = false;
						cbFn();
					});
				};
			},
			createZone () {
				if (this.level2)
					return;
				let model = this.selected;
				if (this.level1)
					model = this.selected.getParent();
				let unit = {name: ''};
				this.showDialog({
					clz: 'create-zone',
					title: '新建分区',
					unit: unit
				});
				const _self = this;
				this.okFn = () => {
					Caller('createZone', unit, (result) => {
						_self.$refs.tree.addChild(model, result);
						this.dialog.show = false;
					});
				};
			},
			editZone () {
				if (this.level0 || this.level2)
					return;
				const _self = this;
				Caller('getZone', {id: this.selected.id}, (result) => {
					_self.showDialog({
						clz: 'edit-zone',
						title: '修改分区',
						unit: result
					});
					_self.okFn = () => {
						Caller('editZone', result, () => {
							this.dialog.show = false;
							_self.selected.name = result.name;
						});
					};
				});
			},
			deleteZone () {
				if (this.level0 || this.level2)
					return;
				this.showDialog({
					clz: 'delete-zone',
					title: '删除分区',
					content: '是否删除此分区及分区下所有摄像机？'
				});
				const _self = this;
				this.okFn = () => {
					Caller('deleteZone', {id: this.selected.id}, () => {
						let parent = _self.selected.getParent();
						parent.removeChild(_self.selected);
						parent.active = true;
						_self.$refs.tree.activeItem(parent);
						this.dialog.show = false;
					});
				};
			}
		},
		components: {
			treeView,
			grid,
			dialog,
			checkboxTree
		},
		ready () {
			const _self = this;
			Caller('getZoneTree', {}, (result) => {			
				_self.treeData = result;
			});
		}
	}
</script>
<style lang="less">
	.zone-list{
		position: relative;
		.title{
			border-bottom: 1px solid #1f2c39;
			.add{
				margin-left: 80px;
			}
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
		.add-device, .edit-device{
			.pro-type{
				display: none;
			}
			.label{
				width: 90px;
			}
		}
		.btn-add{
			width: 70px;
			height: 35px;
			background-image: url(../../assets/images/pic/btn-add.png);
			&:hover{
				background-image: url(../../assets/images/pic/btn-add-hover.png);
			}
		}
		.add, .edit, .delete{
			width: 18px;
			height: 18px;
			vertical-align: top;
			margin-top: 3px;
			margin-right: 2px;
		}
		.add{
			background-image: url(../../assets/images/pic/add-zone.png);
			&.allow{
				background-image: url(../../assets/images/pic/add-zone-allow.png);
				&:hover{
					background-image: url(../../assets/images/pic/add-zone-hover.png);
				}
			}
		}
		.edit{
			background-image: url(../../assets/images/pic/edit-zone.png);
			&.allow{
				background-image: url(../../assets/images/pic/edit-zone-allow.png);
				&:hover{
					background-image: url(../../assets/images/pic/edit-zone-hover.png);
				}
			}
		}
		.delete{
			background-image: url(../../assets/images/pic/delete-zone.png);
			&.allow{
				background-image: url(../../assets/images/pic/delete-zone-allow.png);
				&:hover{
					background-image: url(../../assets/images/pic/delete-zone-hover.png);
				}
			}
		}
		.create-zone, .edit-zone{
			.label{
				width: 70px;
			}
		}
		.add-camera{
			width: 500px;
			.content{
				min-height: 200px;
				max-height: 400px;
				padding: 20px;
				text-align: left;
			}
			.pro-tree{
				margin-top: 10px;
				max-height: 300px;
			}
		}
	}
</style>