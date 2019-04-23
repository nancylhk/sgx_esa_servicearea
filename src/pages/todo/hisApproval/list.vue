<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="商品名称">
					<el-input v-model="postName" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>商品名称</th>
						<th>任务ID</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in productionList">
						<td>{{index+1}}</td>
						<td>{{info.productName}}</td>
						<td>{{info.taskID}}</td>
						<td>{{info.status}}</td>
						<td>
							<a @click ="viewEvent(info.productID)">查看</a>
						</td>
					</tr>
				</tbody>
			</table>

			<p v-show="total == 0" class="noDataTip">没有找到相关数据！</p>
			<footer v-show="total > 0">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</footer>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'sectionList',
		data() {
			return {
				total: -1,
				currentPage: 1,
				pageSize: 10,
				postName:'',
				productionList:'',

			}
		},
		mounted() {
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			viewEvent(ID) {
				this.$emit('changeComp', 'sectionView', '查看');
				this.$store.dispatch('setViewId', ID);
			},
			searchEvent() {
				this.getList();
				this.getListCount();
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getHistoryWorkList, {
					params: {
						accessToken: this.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
					}
				},function(response){
					if(response.status == 200) {
						self.productionList = response.data.productionList;
					}
				},function(response){
	                //失败回调
	            })
			},
			getListCount(){
				//查询条数
				let self = this;
				self.$http.get(self.api.getHistoryWorkListCount, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					if(response.status == 200) {
						self.total = parseInt(response.data);
					}
				}, function(response) {})
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getList();
			},
		},

	}
</script>

<style>
	.app-main {
		.el-button--text {
			border: none;
			color: #0099cc;
		}
	}
</style>