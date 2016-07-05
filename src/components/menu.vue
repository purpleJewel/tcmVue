<template>
	<ul class="nav navbar-nav main">
		<li id="nav-{{item[0]}}" v-for="item of navItems">
			<a v-link="item[0]">
				<span class="nav-{{item[0]}}"></span>
				<span>{{item[1]}}</span>
			</a>
			<ul class="sub">
				<li id="nav-{{sub[0].replace('\/', '-')}}" v-for="sub of item[2]">
					<a v-link="sub[0]">{{sub[1]}}</a>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
	export default {
		data () {
			return {
				navItems: [
					['sys', '系统管理', [
						['sys/line', '线路和车站管理'],
						['sys/role', '角色管理'],
						['sys/level', '用户优先级定义'],
						['sys/user', '用户管理'],
						['sys/config', '系统设置']
					]],
					['device', '设备管理', [
						['device/list', '设备列表'],
						['device/zone', '摄像机分区'],
						['device/video', '电视墙']
					]],
					['store', '存储管理']
				]
			}
		}	
	}
</script>
<style lang="sass">
	
</style>