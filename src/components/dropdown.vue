<template>
<div class="dropdown">
	<button class="dropdown-toggle" type="button" @click="open" data-key="{{key}}">
		<span class="{{value}}"></span>
		<span class="pic-"></span>
	</button>
	<ul class="dropdown-menu" v-show="showMenu">
		<li class="list" v-for="value of items" @click="check(value)">{{value | filter}}</li>
	</ul>
</div>
</template>
<script>
	
	export default {
		props: ['key', 'value', 'items'],
		data () {
			return {
				showMenu: false
			};
		},
		methods: {
			open () {
				this.showMenu = !this.showMenu;
			},
			check (value) {
				this.value = value;
				this.showMenu = false;
				this.$dispatch('check-one', value);
			}
		}
	}
</script>
<style lang="less">
	.dropdown{
		display: inline-block;
	}
</style>