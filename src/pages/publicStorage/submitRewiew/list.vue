<template>
	<div>
		<div class="app-main" id="app-main">
			<table class="mt20">
				<thead>
					<tr>
						<th>序号</th>
						<th>商品名称</th>
						<th>任务ID</th>
						<th>商品状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in taskList">
						<td>{{index+1}}</td>
						<td>{{info.productName}}</td>
						<td>{{info.taskID}}</td>
						<td>{{info.status}}</td>
						<td>
							<a @click="submitReview(info.taskID)">提交审核单</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p v-show="total == 0" class="noDataTip">没有找到相关数据！</p>
		<footer v-show="total > 0">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
			</el-pagination>
		</footer>

	</div>

</template>
<script>
	export default {
		name: 'sectionList',
		data() {
			return {
				taskList: [],
				total:-1,
				currentPage: 1,
				pageSize: 10,
				beginRow: '',
				endRow: '',
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				var self = this;
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getPersonalTaskList, {
					params: {
						accessToken: this.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
					}
				}, function(response) {
					if(response.status == 200) {
						self.taskList = response.data.productionList;

					}
				}, function(res) {
					//失败回调
				})

			},
			submitReview(ID) {
				var self = this;
				this.$confirm('是否提交审核单？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					self.$http.get(self.api.completeRequest, {
						params: {
							accessToken: self.$store.state.user.token,
							taskID: ID,
							condition: 'submit',
							message: ''
						}
					}, function(response) {
						if(response.data == 1) {
							self.$message({
								type: 'success',
								message: '提交成功',
								duration: 2000
							});
							self.getList();
						} else {
							self.$message({
								type: 'warning',
								message: '提交失败',
								duration: 2000
							});
						}
					}, function(response) {
						//失败回调
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
						duration: 2000
					});
				});
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.info-tit {
		height: 32px;
		line-height: 32px;
		font-weight: bold;
		border-bottom: none;
	}
	
	.info-tab {
		table {
			width: 100%;
			border-collapse: collapse;
			tr {
				line-height: 32px;
				height: 32px;
				border-bottom: #fff solid 1px;
				td {
					text-align: center;
					color: #666;
					width: 1%;
					a {
						cursor: pointer;
						color: #ffffff;
						background: #0099CC;
						padding: 5px 10px;
						border-radius: 5px;
					}
				}
				th {
					text-align: center;
					color: #333;
				}
				a {
					cursor: pointer;
					color: #ffffff;
					background: #0099CC;
					padding: 4px 10px;
				}
			}
			thead tr {
				background: #e6e6e6;
			}
			tbody tr {
				background: #f2f2f2;
			}
		}
	}
</style>