<template>
    <div></div>
</template>
<script>
    require('../assets/scss/iconfont/iconfont.css');
    require('../assets/scss/CV.scss');


    export default {
        ready (){
            setTimeout(() => {
                this.$route.router.go({ name: 'line'});
            },500);
        }
    }
</script>
<style lang="sass">
    
</style>

