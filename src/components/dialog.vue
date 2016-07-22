<template>
<div class="dialog-mask" v-show="show" transition="fade">
	<div class="nv-dialog-inner {{clz}}">
		<div class="nv-title">{{title}}</div>
		<div class="content">
			<slot name="content"></slot>
			<ul v-if="unit">
				<li class="pro-{{$key}} property" v-if="defaultFilter($key) && !isDropdown($key)" v-for="property of unit">
					<label class="label" for="{{$key}}">{{$key | getDialogTitle property clz}} :</label>
					<input type="text" name="{{$key}}" v-model="property">
				</li>
				<li class="pro-{{$key}} property" v-if="defaultFilter($key) && isDropdown($key)" v-for="property of unit">
					<label class="label" for="{{$key}}">{{$key | getDialogTitle property clz}} :</label>
					<dropdown
						:key="$key"
						:name="getDropName(property, unit.dropdownList[$key])"
						:value="property"
						:list="unit.dropdownList[$key]"
						@check-fn="defaultCheck"
					></dropdown>
				</li>
				<li class="pro-{{property.key}} property" v-if="unit.properties && !property.type" v-for="property of unit.properties">
					<label class="label" for="{{property.key}}">{{property.title}} :</label>
					<input name="{{property.key}}" v-model="property.value">
				</li>
				<li class="pro-{{property.key}} property" v-if="unit.properties && property.type == 'dropdown'" v-for="property of unit.properties">
					<label class="label" for="{{property.key}}">{{property.title}} :</label>
					<dropdown
						:key="property.key"
						:name="getDropName(property.value, property.list)"
						:value="property.value"
						:list="property.list"
						@check-fn="checkFn"
					></dropdown>
				</li>
			</ul>
		</div>
		<div class="foot">
			<a class="ok" @click="ok()"></a>
			<a class="cancel" @click="cancel()"></a>
		</div>
	</div>
</div>
</template>
<script>
	import dropdown from '../components/dropdown.vue';
	/*
	 *   clz,			//class
	 *   title,			//显示title
	 *   content,		//插槽内容
	 *   unit: {		//对象的属性input/dropdown
	 *   	id, 
	 *   	name,
	 *   	dropdownArr,
	 *    	dropdownList: {
	 *   	  type: []
	 *      },
	 *   	properties: [
	 *   		{key, name, value, [type, list]}
	 *   	]
	 *   }
	 */
	export default {
		props: ['clz', 'title', 'unit', 'show'],
		methods: {
			defaultFilter (key) {
				if (key != 'properties' && key != 'dropdownArr' && key != 'dropdownList')
					return true;
				return false;
			},
			isDropdown (key) {
				if (_.indexOf(this.unit.dropdownArr, key) > -1)
					return true;
				return false;
			},
			getDropName (value, list) {
				if (!value) return '';
				const arr = _.filter(list, (item, idx) => value == item.value);
				return arr[0].name;
			},
			defaultCheck (key, value) {
				this.unit[key] = value;
			},
			checkFn (key, value) {
				this.unit.properties.forEach((item, idx) => {
					if (item.key == key) 
						return item.value = value;
				});
			},
			ok () {this.$dispatch('ok-fn');},
			cancel () {this.show = false;}
		},
		components: {
			dropdown
		}
	}
</script>
<style lang="less">
.dialog-mask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 4000;
	background-color: rgba(0, 0, 0, 0);
	text-align: center;
}
.nv-dialog-inner{
	min-width: 350px;
	position: relative;
	display: inline-block;
	border-radius: 7px;
	font-size: 12px;
	line-height: 30px;
	margin-top: 200px;
	vertical-align: middle;
	box-shadow: 0 10px 30px rgba(0, 0, 0, .44);
	transition: all .3s ease;
	.content{
		min-height: 90px;
		background-color: #fff;
		color: #2E3740;
		padding: 30px 0 10px;	
	}
	.property{
		height: 32px;
		margin: 0 20px 15px 10px;
	}
	.label{
		height: 30px;
		width: 50px;
		display: inline-block;
		margin-right: 10px;	
		text-align: right;
	}
	input{
		height: 30px;
		width: 230px;
		background: #d7dce0;
		border: 2px solid transparent;
		border-radius: 5px;
		text-indent: 10px;
		&:hover{
			border: 2px solid #55BDFE;
		}
	}
	.foot{
	    height: 45px;
	    background: #E8EBF0;
	    border-bottom-right-radius: 7px;
	    border-bottom-left-radius: 7px;
	    a{
	    	cursor: pointer;
	    	display: inline-block;
	    	width: 87px;
	    	height: 28px;
	    	margin: 10px 10px 0 0;
	    }
	    .ok{
	    	background: url(../assets/images/pic/btn-confirm.png) no-repeat;
	    	&:hover{
	    		background-image: url(../assets/images/pic/btn-confirm-hover.png);
	    	}
	    }
	    .cancel{
	    	background: url(../assets/images/pic/btn-cancel2.png) no-repeat;
	    	&:hover{
	    		background-image: url(../assets//images/pic/btn-cancel2-hover.png);
	    	}
	    }
	}
}
.pro-id{
	display: none;
}
.fade-enter ,.fade-leave {
	.nv-dialog-inner{
		-webkit-transform: scale(0.9);
		transform: scale(0.9);	
	}
}
</style>