<template>
<li>
    <div class="t-node" v-if="model.name" :class="{bold: isFolder}" @click="toggle" :style="{paddingLeft: model.padding + 'px'}">
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
		<li class="add-node" @click="addChild" v-if="model.name" :style="{paddingLeft: model.padding + 'px'}">+</li>
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
</style>