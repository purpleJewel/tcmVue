<template>
<div id="body" transition="fade">
	<div class="sys-info">
		<div class="lt icon">
			<div class="pic"></div>
			<div>线路信息</div>
		</div>
		<div class="lt text">
			<div>
				<span class="label">线路名称：</span>
				<input type="text" class="line-name" disabled="true" value="{{lineName}}">
			</div>
			<div>
				<span class="label">当前单位：</span>
				<input type="text" class="site-name" disabled="true" value="{{siteName}}">
				<a class="set-siteName" @click="setSiteName" v-if="!siteName"></a>
			</div>
		</div>
	</div>
	<div id="sysline-grid"></div>
</div>
</template>
<script>
	export default {
		data () {
			return {
				lineName: localStorage.lineName,
				siteName: localStorage.siteName
			};
		},
		methods: {
			setSiteName () {
				alert('setSiteName');
			}
		},
		ready () {
			
		}
	}
</script>
<style lang="sass">
	#body{
		margin-top: 30px;
		input{
			text-indent: 10px;
		}
	}
	.sys-info{
		height: 140px;
		.line-name, .site-name{
			width: 230px;
		    text-align: left;
		    height: 22px;
		    background: rgba(0, 0, 0, 0.3);
		    border: none;
		    color: #787D82;
		    box-shadow: 0 0 6px #1f5e89;
		    font-size: 12px;
		}
		.icon{
			margin: 10px 100px 0px 90px;
			div{width: 72px; text-align: center; color: #fff; font-family: "微软雅黑";}
			.pic{
				margin-bottom: 15px;
				height: 72px;
				background: url(../../assets/images/pic/ico-line.png) no-repeat;
			}
		}
		.text{
			width: 335px;
			margin-top: 20px;
			&>div{margin-bottom: 10px;}
			.label{
				padding: .2em .6em .3em;
				font-size: 12px;
			}
			.set-siteName{
				display: inline-block;
				vertical-align: middle;
				margin-left: 5px;
				width: 16px; 
				height: 16px;
				background: url(../../assets/images/pic/site-set.png) no-repeat;
				&:hover{
					background-image: url(../../assets/images/pic/site-set-hover.png);
				}
			}
		}
	}
</style>