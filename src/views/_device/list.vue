<template>
<div id="body" transition="fade">
	<div class="device-list">
		<div class="list-tree">
			<div class="title">线路设备列表</div>
			<tree-view
				:tree-data="treeData"
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
	</div>
</div>
</template>
<script>

	import treeView from '../../components/tree/tree.vue';
	import grid from '../../components/grid/grid.vue';

	let Caller = TCM.Global.deviceCaller;
	export default {
		data () {
			const _self = this;
			return {
				treeData: {},
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
						Caller('getDevieList', _.merge({}, params), (result) => {
							result.headers.widths = _.map(result.headers.widths, (width) => {
								return Math.floor(width * 0.80);
							});
							_self.gridData.headers = result.headers;
							cbFn(result);
						});
					}
				}
			};
		},
		computed: {
			gridParams () {

			},
			headers () {
				return this.gridData.headers;
			},
			//获取grid配置数据，并判断权限
			hasCheckbox () { 
				return true;
			},
			tools () { 
				const _self = this;
				let toolList = ['refresh', 'create', 'deleted'];
				return _.reduce(toolList, (obj, item) => {
					obj[item] = _self[item];
					return obj;
				}, {});
			},
			actions () { 
				const _self = this;
				return [
					['edit', '编辑', _self.edit],
					['deleted', '删除', _self.deleted]
				];
			}
		},
		methods: {
			getGridParams (model) {
				this.treeData
			},
			handleFn (cbFn) {
				this.gridCbfn = cbFn;
			},
			refresh () {

			},
			edit () {

			},
			create () {

			},
			deleted () {

			}
		},
		components: {
			treeView,
			grid
		},
		ready () {
			const _self = this;
			Caller('getDeviceTree', {}, (result) => {
				_self.treeData = result;
				_self.gridCbfn();
			});
		}
	}
</script>
<style lang="less">
	.device-list{
		position: relative;
		.title{
			border-bottom: 1px solid #2c4259;
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
		.t-body{
			background: #334558;
			border-radius: 0 0 5px 5px;
			min-height: 865px;
			max-height: 866px;
			overflow-y: auto;
			&::-webkit-scrollbar {
    			width: 12px;
   				background-color: #ccc;
   				border-radius: 5px;
   			}
   			&::-webkit-scrollbar-thumb{
				background-color: #fff;
   				border-radius: 5px;
   			}
		}
	}
</style>