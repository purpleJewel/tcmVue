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
			:paginative="grid.paginative"
			:date-picker="grid.datePicker"
			:search="grid.search"
			:sequence="grid.sequence"
			:headers="headers" 
			:columns="columns" 
			:tools="tools"
			:actions="actions"
			:get-data="grid.getData"
		></grid>
	</div>
</div>
</template>
<script>
	import grid from '../../components/grid/grid.vue';
	import nvConfirm from '../../components/nvConfirm.vue';

	let toolList = [
		{
			refresh (cbFn) {
				alert('refresh');
				cbFn();
			}
		},
		{
			add (cbFn) {
				alert('add');
				cbFn();
			}
		},
		{
			deleted (cbFn, selected) {
				alert('deleted');
				cbFn();
			}
		},
		{
			copy (cbFn) {
				alert('copy');
				cbFn();
			}
		},
		{
			affiliate (cbFn) {
				alert('affiliate');
				cbFn();
			}
		}
	];

	let toolItem = {
		all: _.assign({}, toolList[0], toolList[1], toolList[2], toolList[3], toolList[4]),
		super: _.assign({}, toolList[0], toolList[1], toolList[2], toolList[3]),
		ptsd: _.assign({}, toolList[0], toolList[4]),
		default: toolList[0]
	};

	export default {
		data () {
			let _self = this;
			return {
				lineName: localStorage.lineName,
				siteName: localStorage.siteName,
				grid: {
					clz: 'sys-line',
					title: '线路和车站管理',
					sequence: '编号',
					paginative: false,
					datePicker: false,
					search: false,
					getData (params, cbFn) {
						TCM.Global.sysCaller('getAllSites', _.merge({}, params), cbFn);
					}
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
					return ['标识号','名字', '类型', 'IP地址', '管辖状态', '说明'];
				return ['标识号','名字', '类型', 'IP地址', '说明'];
			},
			columns () { 
				if (window.PTSD) 
					return ['id','name', 'type', 'ip', 'selected', 'desc'];
				return ['id','name', 'type', 'ip', 'desc'];
			},
			tools () { 
				if (window.PTSD && window.Super)
					return toolItem.all;
				if (window.PTSD)
					return toolItem.ptsd;
				if (window.Super || window.OCC) 
					return toolItem.super;
				return toolItem.default;
			},
			actions () { 
				if (window.Super || window.OCC) 
					return {
						edit: (item, cbFn) => {
							console.log(item.id);
							cbFn();
						},
						update: (item, cbFn) => {
							console.log(item);
							cbFn();
						}
					};
				return {};
			}
		},
		methods: {
			setSiteName () {
				alert('setSiteName');
			}
		},
		components: {
			grid,
			nvConfirm
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
</style>