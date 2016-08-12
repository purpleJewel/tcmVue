<template>
<div id="body" transition="fade">
	<div class="video-content">
		<div class="video-tree" v-if="allow">
			<div class="title">单位列表</div>
			<checkbox-tree
				class="root"
				:tree-data="treeData"
				@active-node="getParams"
			></checkbox-tree>
		</div>
		<div class="video-list" :class="{'not-allow': !allow, 'handle': !add}">
			<div class="title">电视墙</div>
			<ul class="box-list">
				<li class="box" v-for="item of items" @click="clickFn(item)">
					<div class="pic">
						<div class="list">{{showTitle[0]}}：{{item.monitor.name}}</div>
						<div class="list">{{showTitle[1]}}：{{item.monitor.style}}</div>
						<div class="list">{{showTitle[2]}}：{{item.decoder.name}}</div>
						<div class="list">{{showTitle[3]}}：{{item.decoder.style}}</div>
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
		<dialog 
			:show.sync="dialog.show" 
			:clz="dialog.clz"
			:title="dialog.title"
			:unit.sync="dialog.unit"
			@check-dropdown='checkDropdown'
			@ok-fn="okFn">
			<div slot="content">{{{dialog.content}}}</div>
		</dialog>
	</div>
</div>
</template>
<script>

	import checkboxTree from '../../components/tree/tree.vue';
	import dialog from '../../components/dialog.vue';
	import Utils from '../../libs/utils.js';

	const Caller = TCM.Global.deviceCaller;

	export default {
		data () {
			return {
				treeData: null,
				addName: '添加电视墙',
				add: true,
				allow: window.OCC || window.PTSD,
				showTitle: ['监视器', '(厂家 型号)', '解码器', '(厂家 型号)'],
				items: null,
				params: {},
				portHT: {},
				dialog: {
					show: false,
					clz: '',
					title: '',
					content: '',
					unit: null
				}
			};
		},
		methods: {
			refreshList () {
				Caller('getVideoList', this.params, (result) => {
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
			okFn () {},
			showDialog (cfg) {
				for (let key in this.dialog) {
					this.dialog[key] = cfg[key];
				}
				this.dialog.show = true;
			},
			clickFn (item) {
				if (!this.add)
					return;
				const _self = this;
				Caller('getVideo', item ? {id: item.id}: {}, (result) => {
					let unit = {};
					if (item)
						unit.id = result.id;
					unit.monitor = result.monitor;
					unit.decoder = result.decoder;
					unit.port = result.port;
					unit.dropdownArr = ['monitor', 'decoder', 'port'];
					for (let decoder of result.decoderList) {
						_self.portHT[decoder.value] = _.map(decoder.ports, (port, idx) => {
							return {name: port, value: port};
						});
					}
					unit.dropdownList = {
						monitor: result.monitorList,
						decoder: result.decoderList,
						port: _.isNumber(unit.port) ? _self.portHT[unit.decoder]: [] 
					};
					_self.showDialog({
						clz: item ? 'edit-video': 'add-video',
						title: item ? '编辑电视墙': '添加电视墙',
						content: `
						<li class="property type">
							<label class="label">关联设备类型 :</label>
							<span>解码器</span>
						</li>`,
						unit: unit
					});
					_self.okFn = () => {
						let msg = Utils.validator(unit, this.dialog.clz);
						if (msg)
							return;
						delete unit.dropdownArr;
						delete unit.dropdownList;
						Caller(item ? 'editVideo': 'addVideo', unit, (result) => {
							_self.refreshList();
							_self.dialog.show = false;
						});
					};
				});
			},
			checkDropdown (key, value) {
				if (key == 'decoder') {
					let unit = this.dialog.unit;
					if (value == unit.decoder)
						return;
					unit.port = '';
					unit.dropdownList.port = this.portHT[value];
				}
			},
			deleteFn (item) {
				const _self = this;
				Caller('deleteVideo', {id: item.id}, (result) => {
					_self.refreshList();
				});
			}
		},
		components: {
			checkboxTree,
			dialog
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
	.video-content{
		position: relative;
	}
	.video-tree{
		position: absolute;
		width: 250px;
		top: 0;
		left: 0;
		.t-body {
		    min-height: 866px;
		    max-height: 866px;
		}
	}
	.video-list{
		margin-left: 260px;
		&.not-allow{
			margin-left: 0;
		}
		&.handle{
			li{
				cursor: default;
			}
		}
	}
	.edit-video, .add-video{
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