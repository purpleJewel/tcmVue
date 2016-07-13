<template>
<a class="checkbox-a" data-key="{{key}}" @click="f(checkFn)">
	<span class="checkbox {{selected ? 'selected' : ''}}"></span>
	<span v-text="text"></span>
</a>
</template>
<script>
	export default {
		props: ['checkFn', 'selected', 'key', 'text'],
		methods: {
			f (checkFn) {
				let _self = this;
				_self.selected = !_self.selected;
				if (checkFn)
					checkFn(_self.selected, _self.key);
			}
		}
	}
</script>
<style lang="sass">
	.checkbox-a{
		cursor: pointer;
		display: inline-block;
		.checkbox{
			cursor: pointer;
			width: 16px;
			height: 16px;
			min-height: 16px;
			margin-top: 9px;
			margin-left: 4px;
			display: inline-block;
			background: url(../assets/images/ixpic/cb-uncheck.png) no-repeat;
		}
		.selected{
			background-image: url(../assets/images/ixpic/cb-checked.png);
		}
	}
</style>