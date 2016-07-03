<template>
	<nav>
		{{message}}
	</nav>
</template>
<script>
	export default {
		data () {
			return {message: "hello world!"}
		}
	}
</script>
<style lang="sass">
	nav{
		color: #faa;
	}
</style>