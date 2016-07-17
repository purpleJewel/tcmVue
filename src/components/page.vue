<template>
<div class="pagination">
	<div class="total">
		<span>从{{pageNo * pageSize + 1}}到{{Math.min(((pageNo + 1) * pageSize), total)}}</span>
		<span>共{{total}}条</span>
	</div>
	<div class="page-items">
		<a :class="{'previous btn': true, 'able': pageNo > 0}" @click="change(-1)">《</a>
		<a :class="{'page-item btn': true, 'active': item == pageNo + 1}" v-for="item of items" @click="jump(item)" track-by="$index">{{item}}</a>
		<a :class="{'next btn': true, 'able': pageNo < nums - 1}" @click="change(1)">》</a>
		<input type="text" v-model="jumpNo">
		<a class="go btn" @click="jump(jumpNo)">Go</a>
	</div>
</div>
</template>
<script>

	export default {
		props: {
			pageNo: Number,
			pageSize: Number,
			total: Number
		},
		data () {
			return {
				jumpNo: ''
			};
		},
		computed: {
			nums () {
				return Math.ceil(this.total / this.pageSize);
			},
			items () {
				if (this.nums <= 5)
					return _.repeat('0', this.nums).split('').map((item, idx) => {return idx + 1;});
				else {
					if (this.pageNo < 3)
						return [1, 2, 3, 4, '...', this.nums];
					else if (this.pageNo > this.nums - 4) 
						return [1, '...',  this.nums - 3, this.nums - 2, this.nums - 1, this.nums];
					else
						return [1, '...', this.pageNo, this.pageNo + 1, this.pageNo + 2, '...', this.nums];
				}
			}
		},
		methods: {
			jump (no) {
				if (_.isNaN(Number(no)) || Number(no) < 0 || no > this.nums) return;
				this.pageNo = no - 1;
			},
			change (no) {
				const number = this.pageNo + no;
				this.pageNo = Math.max(0, Math.min(this.nums - 1, number));
			}
		}
	}
</script>
<style lang="sass">
	.pagination{

		.page-items{
			&>a{
				width: 20px; 
				height: 20px; 
				margin-right: 10px;
			}
			.active{
				background: #faa;
			}
			.able{
				background: #aaf;
			}
		}
	}
</style>