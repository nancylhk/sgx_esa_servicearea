<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" :model="queryCondition" class="demo-form-inline">
				<el-form-item label="岗位名称">
					<el-input v-model="queryCondition.postName" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item label="待遇水平">
						<input v-model="queryCondition.salaryLowerLimit" class="queryIpt" />
						<span style="color: #d8dce5;">~</span>
						<input v-model="queryCondition.salaryUpperLimit" class="queryIpt"/>
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
						<th>岗位名称</th>
						<th>待遇水平</th>
						<th>在职人数</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in jobList">
						<td>{{index+1}}</td>
						<td>{{info.postName}}</td>
						<td>{{info.salaryLowerLimit}}~{{info.salaryUpperLimit}}</td>
						<td>{{info.count}}</td>
						<td>
							<a @click ="viewEvent(info.postId)">查看</a>
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
				queryCondition: {
					salaryLowerLimit: '',
					salaryUpperLimit: '',
					postName:''
				},
				centerDialogVisible: false,
				whichIsShow: '',
				jobList:'',

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
				this.$http.get(this.api.getJobList, {
					params: {
						accessToken: this.$store.state.user.token,
						currentPage: this.currentPage,
						pageSize: this.pageSize,
						queryCondition:this.queryCondition
					}
				},function(response){
					if(response.status == 200) {
						self.jobList = response.data.postLists;
					}
				},function(response){
	                //失败回调
	            })
			},
			getListCount(){
				//查询条数
				let self = this;
				self.$http.get(self.api.getJobListCount, {
					params: {
						accessToken: self.$store.state.user.token,
						queryCondition:this.queryCondition
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