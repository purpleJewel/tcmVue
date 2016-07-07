<template>
	<nav class="navbar">
		<div class="container-fluid">
			<div class="nav navbar-header">
				<a href="#"><span class="nav-logo"></span></a>
			</div>
			<nav-menu></nav-menu>
			<ul class="navbar-right">
				<li class="newSite">123</li>	
				<li class="current-user">
					<span class="sp"></span>
					<span class="user-pic"></span>
					<span>admin</span>
				</li>	
				<li class="logout">
					<span class="sp"></span>
					<a href="#" @click="logout">退出</a>
				</li>	
			</ul>
		</div>
	</nav>
</template>
<script>
	import navMenu from './menu.vue';
	export default {
		methods: {
			logout () {
				alert('logout!');
			}
		},
		components: {
			navMenu
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