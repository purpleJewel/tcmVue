<template>
	<div class="container">
		<div class="pic_top">
			<div class="pic_char"></div>
		</div>
		<ul>
			<li><span class="pic-user"></span><span class="verLine"></span><input type="text" v-model="account" tabindex="1" placeholder="账号"></li>
			<li><span class="pic-pwd"></span><span class="verLine"></span><input type="password" v-model="password" tabindex="2" placeholder="密码"></li>
		</ul>
		<a class="btn submit Enter" tabindex="3" @click="login"><span>立即登录</span></a>
	</div>
	<div class="footer"><span class="footer-bar"></span></div>
</template>
<script>
	export default {
		data () {
			return {
				account: '',
				password: ''
			};
		},
		methods: {
			login () {
				var account = this.account.trim();
				var password = this.password.trim();
				if (!(account && password)) {return alert("账号/密码不能为空");}
				TCM.Global.common('login', {userName: account, password: password}, (result) => {
					this.$route.router.go({name: "line"});
					if (localStorage.length === 0) {
						for (let key in result) {
							localStorage.setItem(key, result[key]);
						}
					}
					globalBus.emit('getSession', result);
				});
			}
		}
	}
</script>
<style lang="sass">
	
</style>