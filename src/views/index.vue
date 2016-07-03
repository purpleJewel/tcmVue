<template>
    <!-- 全局header -->
    <nav-header></nav-header>
</template>
<script>
    require('../assets/scss/iconfont/iconfont.css');
    require('../assets/scss/CV.scss');
    require('../assets/scss/github-markdown.css');


    export default {
        /*ready (){
            setTimeout(() => {
                // this.$route.router.go({ name: 'list'});
            },2000);
        }*/
        components:{
            navHeader: require("../components/header.vue")
        }
    }
</script>
<style lang="sass">
    .index{
        
    }
</style>

