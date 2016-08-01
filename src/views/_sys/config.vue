<template>
<div id="body" transition="fade">
	<div class="title">系统设置</div>	
	<div class="sys-config">
		<div class="area">
			<h3>数据更改同步配置</h3>
			<div class="bor">
				<div class="item">
					<span class="btn sync" @click="syncFn">立即同步数据</span>
				</div>
				<div class="item">
					<checkbox
						:selected="config.Sync"
						key="Sync"
						text="修改控制中心配置数据时，立即向控制中心TVS和下属各车站／车辆段发送配置数据"
						@selected="changeFn"
					></checkbox>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="control">
				<h3>云台控制设置</h3>
				<div class="bor">
					<div class="item">
						<label class="label" for="ControlReleaseTime">控制释放延时：</label>
						<input type="text" name="ControlReleaseTime" v-model="config.ControlReleaseTime" @change="changeFn('ControlReleaseTime', config.ControlReleaseTime)"> MS
					</div>
					<div class="item">
					<checkbox
						:selected="config.ControlOsdEnable"
						key="ControlOsdEnable"
						text="开启云台控制OSD显示"
						@selected="changeFn"
					></checkbox>
					</div>
				</div>
			</div>
			<div class="timing">
				<h3>系统校时设置</h3>
				<div class="bor">
					<div class="item">
						<label class="label" for="ntpIP">NTP服务器</label>
						<input type="text" name="ntpIP" v-model="TimingSetting.ntpIP" @change="settingFn('ntpIP', TimingSetting.ntpIP)">
						<label class="label-port" for="ntpPort">端口</label>
						<input class="port" type="text" name="ntpPort" v-model="TimingSetting.ntpPort" @change="settingFn('ntpPort', TimingSetting.ntpPort)">
					</div>
					<div class="cutting"></div>
					<div class="item">
						<div class="btn autoTime" @click="timingFn">立即校时</div>
						<checkbox
							:selected="TimingSetting.autoTiming"
							key="autoTiming"
							text="启用自动校时"
							@selected="settingFn"
						></checkbox>
						<label class="day" for="schedule">每天</label>
						<input class="time" type="text" name="schedule" v-model="TimingSetting.schedule" @change="settingFn('schedule', TimingSetting.schedule)">
						<span>时进行同步</span>
					</div>
				</div>
			</div>
			<div class="storage">
				<h3>存储备份设置</h3>
				<div class="bor">
					<div class="item">
						<span class="label">启用存储设备异地备份功能</span>
						<span :class="{'btn': true, 'use': config.StorageBackupSetting}" @click="changeFn('StorageBackupSetting', config.StorageBackupSetting)"></span>
					</div>
				</div>
			</div>
			<div class="server">
				<h3>服务器备份设置</h3>
				<div class="bor">
					<div class="item">
						<span class="label">启用视频服务器异地备份功能</span>
						<span :class="{'btn': true, 'use': ServerBackupSetting.backupTVS}" @click="clickFn('backupTVS', ServerBackupSetting.backupTVS)"></span>
						<span class="label">启用存储服务器异地备份功能</span>
						<span :class="{'btn': true, 'use': ServerBackupSetting.backupSS}" @click="clickFn('backupSS', ServerBackupSetting.backupSS)"></span>
					</div>
				</div>
			</div>
			<div class="config-mask" v-if="mask"></div>
		</div>
	</div>
</div>
</template>
<script>

	import checkbox from '../../components/checkbox.vue';

	const Caller = TCM.Global.sysCaller;
	export default {
		data () {
			return {
				config: {},
				TimingSetting: {},
				ServerBackupSetting: {}
			};
		},
		computed: {
			mask () {
				if (window.OCC)
					return false;
				return true;
			}
		},
		methods: {
			syncFn () {
				Caller('syncConfig', {}, (result) => {

				});
			},
			timingFn () {
				Caller('timing', {}, (result) => {
					
				});
			},
			changeFn (key, value) {
				let params = {};
				if (key == 'StorageBackupSetting') {
					value = !value;
					this.config.StorageBackupSetting = value;
				}
				params[key] = value;
				Caller('setConfig', params, (result) => {
					
				});
			},
			settingFn (key, value) {
				let obj = {};
				obj[key] = value;
				let params = {};
				params.TimingSetting = _.assign(this.TimingSetting, obj);
				Caller('setConfig', params, (result) => {
					
				});
			},
			clickFn (key, value) {
				value = !value;
				this.ServerBackupSetting[key] = value;
				let params = {};
				params.ServerBackupSetting = this.ServerBackupSetting;
				Caller('setConfig', params, (result) => {
					
				});
			}
		},
		components: {
			checkbox
		},
		ready () {
			Caller('getConfig', {}, (result) => {
				this.config = result;
				this.TimingSetting = JSON.parse(result.TimingSetting);
				this.ServerBackupSetting = JSON.parse(result.ServerBackupSetting);
			});
		}
	}
</script>
<style lang="less">
	.sys-config{
		background: #f6f7f9;
		padding: 40px 40px 20px;
		border-radius: 0 0 5px 5px;
		min-height: 900px;
		color: #597a96;
		h3{
			font-size: 14px;
			margin: 0 0 15px 5px;
		}
		.item{
			margin: 20px 60px;
		}
		.bor{
			border: 1px solid #e0e0e0;
			background: #fff;
			margin-bottom: 30px;
			padding-top: 10px;
			.checkbox{
				margin-right: 10px;
			}
		}
		input{
			height: 30px;
			width: 130px;
			background: #d7dce0;
			border: 2px solid transparent;
			border-radius: 5px;
			text-indent: 10px;
			&:hover{
				border: 2px solid #55BDFE;
			}
		}
		.label-port{
			margin-left: 10px;
		}
		.port{
			width: 80px;
		}
		.cutting{
			border-bottom: 1px solid #e9e9e9;
			width: 320px;
			margin: 15px 0 0 58px;
		}
		.sync, .autoTime{
			background: #00beff;
			border-radius: 4px;
			line-height: 30px;
			text-align: center;
			color: #fff;
			margin-bottom: 10px;
			font-weight: bold;
			display: block;
			height: 30px;
			&:hover{
				background: #00b0ff;
			}
		}
		.sync{
			width: 107px;
		}
		.timing{
			.day{
				font-weight: bold;
			}
			.time{
				width: 90px;
			}
		}
		.autoTime{
			width: 90px;
		}
		.storage, .server{
			.label{
				display: inline-block;
				width: 170px;
			}
			.btn{
				width: 63px;
				height: 28px;
				margin-right: 40px;
				vertical-align: middle;
				background-image: url(../../assets/images/pic/outuse.png);
				&:hover{
					background-image: url(../../assets/images/pic/outuse-hover.png);
				}
			}
			.use{
				background-image: url(../../assets/images/pic/inuse.png);
				&:hover{
					background-image: url(../../assets/images/pic/inuse-hover.png);
				}
			}
		}
		.content{
			position: relative;
			.config-mask{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(255, 255, 255, 0.3);
			}
		}
	}
</style>