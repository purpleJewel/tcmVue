<template>
<div class="tree">
	<ul class="t-body">
		<tree-view
			class="root"
	    	:model="getData"
	    	@add-child="addChild"
		></tree-view>
	</ul>
</div>
</template>
<script>
	
	import treeView from './baseTree.vue';

	class TreeNode {
		constructor () {
			this.parent = null;
			this.children = [];
		}

		getParent () {
			return this.parent;
		}

		getChildren () {
			return this.children;
		}

		setParent (_parent) {
			this.parent = _parent;
		}

		setChild (_child) {
			this.children.push(_child);
			_child.setParent(this);
		}
	}

	// function findSiteId(node) {
	// 	if (!node.siteId) {
	// 		findSiteId(node.getParent());
	// 	} else {
	// 		return node.siteId;
	// 	}

	// }

	export default {
		props: {
			treeData: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data () {
			return {
				root: {}
			};
		},
		computed: {
			getData () {
				return this.root.getChildren()[0];
			}
		},
		methods: {
			buildNode (data) {
				let node = new TreeNode();
				for (let key in data) {
					if (key != 'children')
						node[key] = data[key];
				}
				return node;
			},
			buildTree (parent, data) {
				let node = this.buildNode(data);
				node.padding = parent.padding + 15;
				parent.setChild(node);
				if (data.children) {
					for(let child of data.children) {
						this.buildTree(node, child);
					}
				}
			},
			createRoot () {
				let root = new TreeNode(this.status);
				root.padding = 0;
				this.buildTree(root, this.treeData);
				this.root = root;
			},
			addChild (model) {
				let node = new TreeNode();
				node.id = 2000;
				node.name = 'new suffix';
				node.padding = model.padding + 15;
				model.setChild(node);
			}
		},
		components: {
			treeView
		},
		watch: {
			treeData () {
				this.createRoot();
			}
		},
		created () {
			this.createRoot();
		}
	}

</script>
<style lang="less">
	.tree{
		.t-body{
			ul{
				// margin-left: 1em;
				line-height: 1.8em;
			}
		}
	}
</style>