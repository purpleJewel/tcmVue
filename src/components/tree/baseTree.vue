<template>
<li>
    <div class="t-node" :class="[paddingList[model.tier], levelList[model.tier]]" v-if="model.name" :class="{bold: isFolder}" @click="toggle">
    	<span class="t-ico" v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    	<checkbox
    		v-if="checkbox"	
    	></checkbox>
    	<span class="t-name">{{model.name}}</span>
    	<span class="t-num" v-if="model.num">{{model.num}}</span>
    </div>
    <ul v-show="open" v-if="isFolder" transition="collapse">
		<item
			:class="{'node' : model.children.length, 'leaf': !model.children.length}"
			v-for="model in model.children"
			:model="model">
		</item>
		<li class="add-node" @click="addChild" v-if="model.name" :class="[paddingList[model.tier], levelList[model.tier]]">+</li>
    </ul>
</li>
</template>
<script>

	import checkbox from '../checkbox.vue';

	export default {
		name: 'item',
		props: {
			model: Object
		},
		data () {
			return {
				paddingList: ['p1', 'p2', 'p3'],
				levelList: ['l1', 'l2', 'l3'],
				checkbox: false,
				open: false
			}
		},
		computed: {
			isFolder () {
				return this.model.children && this.model.children.length;
			}
		},
		methods: {
			toggle () {
				if (this.isFolder) {
					this.open = !this.open
				}
			},
			addChild () {
				this.$dispatch('add-child', this.model);
			}
		},
		components: {
			checkbox
		},
		transitions: {
			collapse: {
				beforeEnter: (el) => {
					if (el.style.maxHeight) return;
					el.style.display = "block";
					let height = el.offsetHeight;
					el.style.display = 'none';
					el.style.maxHeight = height + 'px';
				},
				afterEnter: (el) => {
					el.style.maxHeight = '';
				},
				beforeLeave: (el) => {
					el.style.maxHeight = el.offsetHeight + 'px';
					return el.offsetHeight;
				}
			}
		}
	}
</script>
<style lang="less">
	.collapse-transition {
		transition: all .5s ease;
		overflow: hidden;
	}
	.collapse-enter, .collapse-leave {
		max-height: 0!important;
	}
	.node, .leaf, .add-node{
	  cursor: pointer;
	}
	.add-node, .t-node{
		line-height: 1.8em;
	}
	.t-node{
		border: 1px solid transparent;
		&:hover{
			background: rgba(97, 212, 255, 0.5);
			border: 1px solid #00BDFE;
		}
		.bold {
		  font-weight: bold;
		}
		.checkbox-a .checkbox{
			margin: 4px;
		}
	}
	.p1{
		padding-left: 15px;
	}
	.p2{
		padding-left: 30px;
	}
	.p3{
		padding-left: 45px;
	}
	.l1{
		background: #1e2e3d;
	}
	.l2{
		background: #aaf;
	}
	.l3{
		padding-left: 45px;
	}
</style>