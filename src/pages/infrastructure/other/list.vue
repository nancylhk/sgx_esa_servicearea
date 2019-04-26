<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="名称">
					<el-input v-model="toiletName"></el-input>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="addEvent">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>设施名称</th>
						<th>设施数目</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in toiletList">
						<td>{{index+1}}</td>
						<td>{{info.infrastructureName}}</td>
						<td>{{info.infrastructureNum}}</td>
						<td>
							<a @click ="updateEvent(info.infrastructureId)">修改</a>
							<a @click ="deleteEvent(info.infrastructureId)">删除</a>
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
				beginRow:'',
				endRow:'',
				centerDialogVisible: false,
				toiletList:[],
				toiletName:''
			}
		},
		mounted() {
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			addEvent() {
				this.$emit('changeComp', 'sectionAdd', '新增');
			},
			viewEvent(ID) {
				this.$emit('changeComp', 'sectionView', '查看');
				this.$store.dispatch('setViewId', ID);
			},
			updateEvent(ID) {
				this.$emit('changeComp', 'sectionUpdate', '修改');
				this.$store.dispatch('setViewId', ID);
			},
			searchEvent(){
				this.getList();
				this.getListCount();
			},
			deleteEvent(ID) {
				this.$confirm('确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					var self = this;
					self.$http.get(self.api.deleteOtherInfrastructure, {
						params: {
							accessToken: self.$store.state.user.token,
							InfrastructureID: ID,
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							});
							self.getList() ;
							self.getListCount();
						}else{
							self.$message({
								type: 'warning',
								message: '删除失败',
								duration: 2000
							});
						}
					},function(response){})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
						duration: 2000
					});
				});
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				self.$http.get(self.api.getOtherInfrastructure, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
						InfrastructureName:self.toiletName,
					}
				},function(response){
					if(response.status == 200) {
						self.toiletList = response.data	
					}
				},function(response){ })
			},
			//查询条数
			getListCount(){
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				self.$http.get(self.api.getOtherInfrastructure, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: '',
						endRow: '',
						InfrastructureName:self.toiletName,
					}
				},function(response){
					if(response.status == 200) {
						self.total = response.data.length;	
					}
				},function(response){ })
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getList();
			},
			

		},

	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.app-main {
		.el-button--text {
			border: none;
			color: #0099cc;
		}

	}
</style>