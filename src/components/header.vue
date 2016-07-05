<template>
	<nav class="navbar">
		<div class="container-fluid">
			<div class="navbar-header"></div>
			<nav-menu></nav-menu>
			<ul class="navbar-right">
				<li class="newSite"></li>	
				<li class="current-user"></li>	
				<li class="logout">
					<a href="#" @click="logout">退出</a>
				</li>	
			</ul>
		</div>
	</nav>
</template>
<script>
	export default {
		methods: {
			logout : () => {
				alert("logout!");
			}
		},
		components: {
			"navMenu": require("./menu.vue")
		}
	}
</script>
<style lang="sass">
	
</style>