<template>
<div id="body" transition="fade">
	<div class="store-content">
		<div class="store-tree" v-if="OCC">
			<div class="title">单位列表</div>
			<checkbox-tree
				class="root"
				:tree-data="treeData"
				@active-node="getParams"
			></checkbox-tree>
		</div>
		<div class="store-list" :class="{'not-occ': !OCC}">
			<div class="title">存储计划</div>
			<ul class="box-list">
				<li class="box" v-for="item of items" @click="clickFn(item)">
					<div class="pic">
						<div class="list">{{showTitle[0]}} : {{item.monitor.name}}</div>
						<div class="list">{{showTitle[1]}} : {{item.monitor.style}}</div>
						<div class="list">{{showTitle[2]}} : {{item.decoder.name}}</div>
						<div class="list">{{showTitle[3]}} : {{item.decoder.style}}</div>
					</div>
					<div class="text">{{item.name}}</div>
					<div class="delete" @click="deleteFn(item)"></div>	
				</li>
				<li class="add" v-if="add" @click="clickFn(item)">
					<div class="pic"></div>
					<div class="text">{{addName}}</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>
<script>

	import checkboxTree from '../../components/tree/tree.vue';

	const Caller = TCM.Global.deviceCaller;

	export default {
		data () {
			return {
				treeData: null,
				addName: '添加存储计划',
				add: true,
				OCC: window.OCC,
				showTitle: ['监视器', '(厂家 型号)', '解码器', '(厂家 型号)'],
				items: null
			};
		},
		methods: {
			getParams (model) {
				if (model.id == window.getConst().siteId)
					this.add = true;
				else
					this.add = false;
				Caller('getVideoList', {siteId: model.id}, (result) => {
					this.items = result;
				});
			}
		},
		components: {
			checkboxTree
		},
		ready () {
			const _self = this;
			if (window.OCC) {
				Caller('getLineTree', {}, (result) => {
					_self.treeData = result
				});
			} else {
				Caller('getVideoList', {}, (result) => {
					_self.items = result;
				});
			}
		}
	}
</script>
<style lang="less">
	.store-content{
		position: relative;
	}
	.store-tree{
		position: absolute;
		width: 250px;
		top: 0;
		left: 0;
	}
	.store-list{
		margin-left: 260px;
		&.not-occ{
			margin-left: 0;
		}
	}
</style>