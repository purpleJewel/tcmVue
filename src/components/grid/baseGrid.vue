<template>
<div class="base-grid">
	<ul class="hdr">
		<li class="col-_check" v-if="hasCheckbox">
			<checkbox @selected="checkFn" :selected="rootSelected" key="root"></checkbox>
		</li>
		<li class="col-_no" v-if="sequence">
			<a data-key="_no">
				<span>{{sequence}}</span>
				<span class="pic-hide"></span>
			</a>
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
				<checkbox @selected="checkFn" :selected="selected(item.id)" :key="item.id"></checkbox>
			</li>
			<li class="col-_no" v-if="sequence">{{pageNo * pageSize + ($index + 1)}}</li>
			<li class="col-{{key}}" v-for="key of columns">{{{key | getGridValue item[key] clz}}}</li>
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
	 * 		sequence,			//显示序号名
	 * 		headers: [],		//对应columns的显示
	 * 		columns: [],		//表格显示列
	 * 		items: [			//表格显示数据
	 * 			{id, name....}
	 * 		],
	 * 		selectArr,			//
	 * 		actions: {			//对于每一列表格元素的所有操作集合
	 * 			add: (item) => {
	 * 				...
	 * 			}
	 * 		}
	 * }
	 */
	export default {
		props: {
			clz: String,
			hasCheckbox: Boolean,
			pageNo: Number,
			pageSize: Number,
			sequence: String,
			headers: Array,
			columns: Array,
			items: Array,
			actions: Object,
			selectArr: Array
		},
		data () {
			return {
				rootSelected: false,
				checkFn: (key, isSelected) => {
					if (key == 'root') {
						if (isSelected)
							this.selectArr = this.items.map((item, idx) => {return item.id;});
						else
							this.selectArr = [];
					} else {
						if (isSelected) 
							this.selectArr.push(key);
						else 
							this.selectArr.splice(_.indexOf(this.selectArr, key), 1);
					}
					this.$dispatch('check-box');
				}
			};
		},
		methods: {
			selected (id) {
				if (_.indexOf(this.selectArr, id) > -1)
					return true;
				return false;
			}
		},
		watch: {
		  selectArr (val, oldVal) {
		    this.rootSelected = false;
		    if (val.length !== 0 && val.length === this.items.length) 
		    	this.rootSelected = true;
		  }
		},
		components: {
			checkbox
		}
	}
</script>
<style lang="less">
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
			.col-_no{
				text-align: right;
			}
			[class^="col-"] {
				border-right: 1px solid #fff;
				height: 30px;
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
		.col-_check{
			min-width: 20px;
		}
		.t-body{
			background: #fff;
			.row:nth-child(even) {
				background: #f2f2f2;
			}
			.row{
				border: 1px solid transparent;
				&:hover{
					background: rgba(97, 212, 255, 0.5);
					color: #fff;
					border: 1px solid #00BDFE;
					.col-actions{
						display: block;
					}
				}
			}
		}
		.col-actions{
			line-height: 30px;
			text-align: center;
			display: none;
			width: 10%;
			padding: 0 10px;
			.btn{
				margin-right: 10px;
				&:hover{
					color: #000;
				}
			}
		}
	}
</style>