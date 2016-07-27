<template>
<div id="body" transition="fade">
	<div class="device-list">
		<div class="tree">
			<div class="title">线路设备列表</div>
			<tree-view
				:tree-data="treeData"
			></tree-view>
		</div>
	</div>
</div>
</template>
<script>

	import treeView from '../../components/tree/tree.vue';

	let Caller = TCM.Global.deviceCaller;
	export default {
		data () {
			return {
				treeData: {}
			};
		},
		components: {
			treeView
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
		.tree{
			width: 250px;
		}
		.t-body{
			background: #334559;
			border-radius: 0 0 5px 5px;
			min-height: 800px;
		}
	}
</style>