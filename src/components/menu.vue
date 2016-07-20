<template>
<ul class="nav navbar-nav main">
	<li id="nav-{{item[0]}}" class="{{routeSup == item[0] ? 'active': ''}}" v-for="item of navItems">
		<a v-link="{name: item[2] ? item[2][0][0] : item[0]}" @click="clickLink(item[0], item[2] ? item[2][0][0] : '')">
			<span class="nav-{{item[0]}} "></span>
			<span>{{item[1]}}</span>
		</a>
		<ul class="sub" v-if="item[2] !== undefined">
			<li id="nav-{{item[0]}}-{{sub[0]}}" class="{{routeSub == sub[0] ? 'active' : ''}}" v-for="sub of item[2]">
				<a v-link="{name: sub[0]}" @click="clickLink(item[0], sub[0])" v-text="sub[1]"></a>
			</li>
		</ul>
	</li>
</ul>
</template>																
<script>
	export default {
		data () {
			let routerList = this.$route.path.split('/');
			return {
				routeSup: routerList[1],
				routeSub: routerList[2],
				navItems: [
					['sys', '系统管理', [
						['line', '线路和车站管理'],
						['role', '角色管理'],
						['level', '用户优先级定义'],
						['user', '用户管理'],
						['config', '系统设置']
					]],
					['device', '设备管理', [
						['list', '设备列表'],
						['zone', '摄像机分区'],
						['video', '电视墙']
					]],
					['store', '存储管理']
				]
			}
		},
		methods: {
			clickLink (sup, sub) {
				this.routeSup = sup;
				this.routeSub = sub;
			},
		}	
	}
</script>
<style lang="less">
	.main{border-left: 1px solid #22272b; border-right: 1px solid #3a4249;
        &>li{
            width: 148px; float: left; height: 50px; line-height: 50px; text-align: center; border-right: 1px solid #22272b; border-left: 1px solid #3a4249; position: relative;
            &:hover{
        		.sub{display: block;}
       		}
       		&.active>a{
       			border-bottom: 3px solid #159fb6; height: 50px; background: #15191c;
       		}
        }
        li a {color: #fff; display: block;}
        a span {display: inline-block; vertical-align: top; font-size: 14px; height: 20px;}
        .sub{    
        	min-width: 1000px; display: none; position: fixed; top: 50px; left: 0; background: #4b4a4a; text-align: left;
        	box-shadow: inset 0 2px 5px 0 rgba(42, 51, 58, 0.75);height: 42px;padding: 1px 0;width: 100%;padding-left: 300px;
			&>li{display: inline-block; height: 40px; overflow: hidden; line-height: 20px; text-align: center;}
			& a{width: 120px; height: 40px; font-size: 12px; font-family: "宋体"; padding: 10px 0; display: block;
				&:hover{background: #159fb6 !important; box-shadow: inset 0 1px 1px 0px rgba(42, 51, 58, 0.75);}
			}
			.active a{
				border-bottom: 3px solid #159fb6; background: #21272c;
			}
        }
		.nav-sys,.nav-device,.nav-store{width:24px; height: 24px; margin:12px 10px 0 0;}
		.nav-sys{background: url(../assets/images/pic/nav-sys.png) no-repeat 0 0;}
		.nav-device{background: url(../assets/images/pic/nav-device.png) no-repeat 0 0;}
		.nav-store{background: url(../assets/images/pic/nav-store.png) no-repeat 0 0;}
	}
</style>