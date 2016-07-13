<template>
<div class="base-grid {{clz}}">
	<ul class="hdr">
		<li class="col-_check" v-if="hasCheckbox">
			<checkbox :check-fn="checkFn" :selected="rootSelected" key="root"></checkbox>
		</li>
		<li class="col-{{col}}" v-for="col of columns">
			<a data-key="{{col}}">
				<span>{{headers[$index]}}</span>
				<span class="pic-hide"></span>
			</a>
		</li>
	</ul>
	<div class="t-body">
		<ul class="row" v-for="item of items" track-by="id">
			<li class="col-_check" v-if="hasCheckbox">
				<checkbox :check-fn="checkFn" :selected="selected" :key="item.id"></checkbox>
			</li>
			<li class="col-{{key}}" v-for="key of columns">{{item[key] | getGridValue key clz}}</li>
			<li class="rt col-actions">
				<a class="btn act-{{$key}}" v-for="fn of actions" @click="fn(item)">{{$key}}</a>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
	import checkbox from '../checkbox.vue';
	/**
	 * params: {
	 * 		clz,				//表格class
	 * 		hasCheckbox,		//是否显示checkbox
	 * 		selectArr,			//checkbox选中列id数组
	 * 		headers: [],		//对应columns的显示
	 * 		columns: [],		//表格显示列
	 * 		items: [			//表格显示数据
	 * 			{id, name....}
	 * 		],
	 * 		actions: {			//对于每一列表格元素的所有操作集合
	 * 			add: (item) => {
	 * 				...
	 * 			}
	 * 		}
	 * }
	 */
	export default {
		props: ['clz', 'hasCheckbox', 'selectArr', 'headers', 'columns', 'items', 'actions'],
		data () {
			let _self = this;
			return {
				rootSelected: false,
				selected: false,
				checkFn: (isSelected, key) => {
					_.isArray(_self.selectArr) ? '' : _self.selectArr = [];
					if (key == 'root') {
						if (isSelected)
							_self.selectArr = _self.items.map((item, idx) => {return item.id;});
						else
							_self.selectArr = [];
						_self.rootSelected = isSelected;
						_self.selected = !isSelected;
						_self.$nextTick(() => {
							_self.selected = isSelected;
						});
						return;
					}
					if (isSelected) {
						_self.selectArr.push(key);
					} else {
						let _index = _self.selectArr.forEach((i, idx) => {if (i == key) return idx;});
						_self.selectArr.splice(_index, 1);
						_self.rootSelected = isSelected;
					}
					if (_self.selectArr.length === _self.items.length)
						_self.rootSelected = isSelected;
					if (_self.selectArr.length === 0)
						_self.selected = isSelected;
				}
			};
		},
		components: {
			checkbox
		}
	}
</script>
<style lang="sass">
	.base-grid{
		color: #666;
		font-family: '宋体';
		font-size: 12px;
		ul.hdr{
			background: #e8e8e8;
			height: 31px;
			a{
				color: #333333;
				font-weight: bold;
			}
		}
		[class^="col-"] {
			display: inline-block;
			text-align: center;
			vertical-align: middle;
			min-width: 56px;
			height: 35px;
			line-height: 35px;
			padding: 0px 8px;
		}
		.t-body{
			background: #fff;
		}
		.col-actions{
			line-height: 30px;
			text-align: center;
			width: 10%;
			padding: 0 10px;
			.btn{
				margin-right: 10px;
			}
		}
	}
</style>