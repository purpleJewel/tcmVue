<template>
<div id="body" transition="fade">
	<div class="store-content">
		<div class="store-tree" v-if="allow">
			<div class="title">线路录像列表</div>
			<checkbox-tree
				class="root"
				:tree-data="treeData"
				@active-node="getParams"
			></checkbox-tree>
		</div>
		<div class="store-list" :class="{'not-allow': !allow}">
			<div class="title">录像计划</div>
			<ul class="box-list">
				<li class="box" v-for="item of items" @click="clickFn(item)">
					<div class="pic">
						<div class="list">{{showTitle[0]}}：{{item.storage}}</div>
						<div class="list">{{showTitle[1]}}：{{item.circle}}天</div>
						<div class="list">{{showTitle[2]}}：{{item.days | getDaysStr}}</div>
						<div class="list">{{showTitle[3]}}：从{{item.from}}至{{item.to}}</div>
					</div>
					<div class="text">{{item.name}}</div>
					<div class="delete" @click.stop="deleteFn(item)" v-if="add"></div>	
				</li>
				<li class="add" v-if="add" @click="clickFn()">
					<div class="pic"></div>
					<div class="text">{{addName}}</div>
				</li>
			</ul>
		</div>
		<div class="mask" transition="dialog-confirm" v-show="dialog.show">
			<div class="store-dialog">
				<div class="nv-title">{{dialog.title}}</div>
				<div class="header">
					<span class="site">单位：{{dialog.unit.siteName}}</span>
					<label class="label" for="name">名称</label>
					<input type="text" v-model="dialog.unit.name">
				</div>
				<div class="content">
					<ul class="move">
						<li class="list">
							<div class="item head">录像时间计划表</div>
							<div class="item">
								<label class="label">保存周期：</label>
								<dropdown
									key="day"
									name="7天"
									value="7"
									list=""
								></dropdown>
							</div>
						</li>
						<li class="list">
							<div class="item head">已在录像的摄像机</div>
						</li>
					</ul>
				</div>
				<div class="foot">
					<a class="ok" @click="ok()"></a>
					<a class="cancel" @click="cancel()"></a>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>

	import checkboxTree from '../../components/tree/tree.vue';
	import dropdown from '../../components/dropdown.vue';
	import Utils from '../../libs/utils.js';

	const Caller = TCM.Global.deviceCaller;

	export default {
		data () {
			return {
				treeData: null,
				addName: '添加录像计划',
				add: true,
				allow: window.OCC || window.PTSD,
				showTitle: ['存储服务器', '保存周期', '日期计划', '录像时间'],
				items: null,
				dayList: [
					{name: '7天', value: 7},
					{name: '15天', value: 15},
					{name: '30天', value: 30}
				],
				params: {},
				dialog: {
					show: false,
					title: '',
					unit: {}
				}
			};
		},
		methods: {
			refreshList () {
				Caller('getPlanList', this.params, (result) => {
					this.items = result;
				});
			},
			getParams (model) {
				if (model.id == window.getConst().siteId)
					this.add = true;
				else
					this.add = false;
				this.params = {siteId: model.id};
				this.refreshList();
			},
			clickFn (item) {
				this.dialog.show = true;
			},
			deleteFn (item) {
				const _self = this;
				Caller('deleteVideo', {id: item.id}, (result) => {
					_self.refreshList();
				});
			},
			ok () {
				this.dialog.show = false;
			},
			cancel () {
				this.dialog.show = false;
			}
		},
		components: {
			checkboxTree,
			dropdown
		},
		ready () {
			const _self = this;
			if (_self.allow) {
				Caller('getLineTree', {}, (result) => {
					_self.treeData = result
				});
			} else {
				_self.refreshList();
			}
		}
	}
</script>
<style lang="less">
	.store-content{
		position: relative;
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2000;
		}
		.foot{
		    height: 45px;
		    background: #E8EBF0;
		    border-bottom-right-radius: 7px;
		    border-bottom-left-radius: 7px;
		    text-align: center;
		    a{
		    	cursor: pointer;
		    	display: inline-block;
		    	width: 87px;
		    	height: 28px;
		    	margin: 10px 10px 0 0;
		    }
		    .ok{
		    	background: url(../../assets/images/pic/btn-confirm.png) no-repeat;
		    	&:hover{
		    		background-image: url(../../assets/images/pic/btn-confirm-hover.png);
		    	}
		    }
		    .cancel{
		    	background: url(../../assets/images/pic/btn-cancel2.png) no-repeat;
		    	&:hover{
		    		background-image: url(../../assets//images/pic/btn-cancel2-hover.png);
		    	}
		    }
		}
	}
	.store-dialog{
		margin: 150px auto 0;
		width: 800px;
		position: relative;
		box-shadow: 0 10px 30px rgba(0, 0, 0, .44);
		transition: all .3s ease;
		border-radius: 7px;
		background: #fff;
		.header, .content{
			color: #2E3740;
			padding: 30px 20px 0px 50px;
		}
		.header{
			.label{
				width: 35px;
			}
		}
		.content{
			height: 400px;
			padding-top: 10px;
			overflow: hidden;
			position: relative;
		}
		.move{
			transition: all 0.3s ease;
			position: absolute;
		}
		.site{
			display: inline-block;
			width: 350px;
		}
		.list{
			display: inline-block;
			width: 350px;
			margin-right: 10px;
			vertical-align: top;
			.item{
				margin-bottom: 10px;
				height: 30px;
				line-height: 30px;
			}
			.head{
				font-weight: bold;
			}
		}
		.label{
			height: 30px;
			width: 80px;
			display: inline-block;
			margin-right: 10px;	
			text-align: right;
		}
		input{
			height: 30px;
			width: 230px;
			background: #d7dce0;
			border: 2px solid transparent;
			border-radius: 5px;
			text-indent: 10px;
			&:hover{
				border: 2px solid #55BDFE;
			}
		}
	}
	.store-tree{
		position: absolute;
		width: 250px;
		top: 0;
		left: 0;
		.t-body {
		    min-height: 866px;
		    max-height: 866px;
		}
	}
	.store-list{
		margin-left: 260px;
		&.not-allow{
			margin-left: 0;
		}
	}
	.edit-store, .add-store{
		.content{
			&>div{
				text-align: left;
				li{
					margin-bottom: 10px;
				}
				span{
					margin-left: 5px;
				}
			}
			.label{width: 100px;}
		}
	}
</style>