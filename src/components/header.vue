<template>
	<nav class="navbar">
		<div class="container-fluid">
			<div class="nav navbar-header">
				<a href="#"><span class="nav-logo"></span></a>
			</div>
			<nav-menu></nav-menu>
			<ul class="navbar-right">
				<li class="newSite">{{siteName}}</li>	
				<li class="current-user">
					<span class="sp"></span>
					<span class="user-pic"></span>
					<span>{{userName}}</span>
				</li>	
				<li class="logout">
					<span class="sp"></span>
					<a class="btn" @click="logout">退出</a>
				</li>	
			</ul>
		</div>
	</nav>
	<div class="bg"></div>
</template>
<script>
	import navMenu from './menu.vue';

	export default {
		data () {
			return {
				userName: localStorage.userName,
				siteName: localStorage.siteName
			};
		},
		methods: {
			logout () {
				// alert('logout!');
				for (let key in localStorage) {
					localStorage.removeItem(key);
				}
				TCM.Global.common('logout', {}, () => {
					this.$route.router.go({ name: 'entry'});
				});
			}
		},
		components: {
			navMenu
		},
		ready () {
			var self = this;
			globalBus.on('getSession', function(data){
				self.userName = data.userName;
				self.siteName = data.siteName;
			});
		}
	}
</script>
<style lang="sass">
	.navbar{
	    height: 50px; background: #2a333a;
	}
	.container-fluid{min-width: 1050px; padding: 0 20px;
	    .nav{float: left;}
	    .navbar-header{
	        width: 280px; height: 50px; display: inline-block;
	    }
	    .nav-logo{
	        width: 238px; height: 28px; margin: 11px 0; display: inline-block; background: url(../assets/images/logo/logo.png) no-repeat 0 0;
	    }
	    .navbar-right{float: right;
			&>li{float: left; color: #fff;}
			a{color: #fff;}
			.newSite,.current-user,.logout{padding: 15px 0 0 20px; height: 50px;}
			.sp{width: 2px; border-left: 1px solid #22272b; border-right: 1px solid #3a4249; height: 30px; margin-right: 10px;} 
	    }
	}
</style>