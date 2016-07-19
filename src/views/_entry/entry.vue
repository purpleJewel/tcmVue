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
	<nv-alert :content="alert.txt" :show="alert.show" @show="show"></nv-alert>
</div>
<div class="footer"><span class="footer-bar"></span></div>
</template>
<script>
	import nvAlert from '../../components/nvAlert.vue';
	
	export default {
		data () {
			return {
				account: '',
				password: '',
				alert: {
					show: false,
					txt: ''
				}
			};
		},
		methods: {
			login () {
				let _self = this;
				let account = _self.account.trim();
				let password = _self.password.trim();
				if (!(account && password)) {
					_self.alert.show = true;
					_self.alert.txt = '账号/密码不能为空';
					return;
				}
				TCM.Global.common('login', {userName: account, password: password}, (result) => {
					_self.$route.router.go({name: "line"});
					if (localStorage.length === 0) {
						for (let key in result) {
							localStorage.setItem(key, result[key]);
						}
					}
					globalBus.emit('getSession', result);
				});
			},
			show (data) {
				let _self = this;
				_self.alert.show = data;
			}
		},
		components: {
			nvAlert
		}
	}
</script>
<style lang="sass">

</style>