<template>
<div class="v-grid {{clz}}">
	<div class="v-title">{{title}}</div>
	<div class="v-tools">
		<div class="tool tool-{{$key}} {{$key == 'deleted'? isabled : ''}}" data-key="$key" v-for="tool of tools" @click="toolFn(tool)"></div>
		<datepicker
		  :value.sync="value"
		  :disabled-days-of-Week="disabled"
		  :format="format"
		  :show-reset-button="reset">
		</datepicker>
		<div class="search rt" v-if="search">
			<input type="text" id="search" v-model="params.searchKey" @keyup="searchFn" placeholder="搜索" class="form-control">
			<a class="grid-search btn" @click="searchFn"></a>
		</div>
	</div>
	<div class="v-body">
		<base-grid 
			:clz="clz" 
			:has-checkbox="hasCheckbox"
			:sequence="sequence"
			:headers="headers" 
			:columns="columns" 
			:items="items" 
			:actions="actions"
			@check-box="getSelectArr"
		></base-grid>
	</div>
	<div class="v-foot"></div>
</div>
</template>
<script>
	import baseGrid from '../../components/grid/baseGrid.vue';
	import datepicker from '../Datepicker.vue';

	const defaultTools = {
		delete () {

		}
	};

	/**
	 * params: {
	 * 		clz,				//表格class
	 * 		hasCheckbox,		//是否显示checkbox
	 * 		selectArr,			//checkbox选中列id数组
	 * 		sequence,			//显示序号名
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
		props: {
			title: String,
			tools: Object,
			params: Object,
			search: Boolean,
			clz: String,
			hasCheckbox: Boolean,
			sequence: null,
			headers: Array,
			columns: Array,
			items: Array,
			actions: Object,
			getData: Function
		},
		data () {
			return {
				isabled: 'disabled',
				value: '2015-10-08',
				disabled: [],
				format: "yyyy-MM-dd",
				reset: true
			};
		},
		methods: {
			getSelectArr (arr) {
				this.selectArr = arr;
				if (arr.length === 0) 
					this.isabled = 'disabled';
				else
					this.isabled = '';
			},
			toolFn (tool) {
				let _self = this;
				if (_self.isabled == 'disabled')
					return;
				tool(_self.selectArr, () => {_self.getData(_self.params);});
			},
			searchFn (event) {
				let _self = this;
				if (event.type == 'click' || event.type == 'keyup' && event.key == 'Enter')
					_self.getData(_self.params);
			}
		},
		components: {
			baseGrid,
			datepicker
		},
		ready () {
			let _self = this;
			_self.getData(_self.params);
		}
	}
</script>
<style lang="sass">
	.v-grid{
		.v-title{
			border-radius: 5px 5px 0 0;
			background: #2C3E50;
			height: 40px;
			color: #fff;
			font-size: 14px;
			padding: 8px 20px;
			line-height: 24px;
		}
		.v-tools{
			padding: 20px 15px 10px;
			height: 70px;
			background: #fff;
			.tool{
				display: inline-block;
				margin-right: 15px;
				min-width: 20px;
				min-height: 20px;
				border: 1px solid #000;
			}
			.search{
				height: 25px;
				margin-right: 10px;
				position: relative;
				input{
					height: 25px;
				}
				.grid-search{
					position: absolute;
					top: 4px;
					right: 4px;
					width: 16px; 
					height: 16px;
					background: url(../../assets/images/ixpic/ico-search.png) no-repeat;
				}
			}
		}
		.v-body{
			padding: 0 15px;
			background: #fff;
		}
	}
</style>