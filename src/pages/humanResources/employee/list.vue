<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="岗位名称">
					<el-input v-model="postName"></el-input>
				</el-form-item>
				<el-form-item label="待遇水平">
					<input v-model="salaryLowerLimit" class="queryIpt" />
					<span style="color: #d8dce5;">~</span>
					<input v-model="salaryUpperLimit" class="queryIpt" />
				</el-form-item>
				<el-form-item class="right">
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
						<th>姓名</th>
						<th>岗位</th>
						<th>薪资</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in personnelList">
						<td>{{index+1}}</td>
						<td>{{info.employeeName}}</td>
						<td>{{info.postName}}</td>
						<td>{{info.salary}}</td>
						<td>
							<a @click="viewEvent(info.employeeId)">查看</a>
							<a v-show="info.status == '1'" @click="showRenewedDialog(info)">续约</a>
							<a v-show="info.status == '1'" @click="changeStatus(info.employeeId)">离职</a>
							<a v-show="info.status == '1'" @click="updateEvent(info.employeeId)">修改</a>
							<a @click="deleteEvent(info.employeeId)">删除</a>
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
		<el-dialog title="续约" :visible.sync="renewedDialogVisible" width="30%" center>
			<p class="dialog-cont"><label>姓名：</label><span>{{employeeInfo.employeeName}}</span></p>
			<p class="dialog-cont"><label>原有效期：</label><span>{{employeeInfo.startDate}}~{{employeeInfo.deadline}}</span></p>
			<p class="dialog-cont"><label>续期时长：</label>
				<el-date-picker v-model="expireTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="mini">
				</el-date-picker>
			</p>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="renewedDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="renewedContract">确 定</el-button>
		  	</span>
		</el-dialog>
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
				salaryLowerLimit: '',
				salaryUpperLimit: '',
				postName: '',
				beginRow: '',
				endRow: '',
				renewedDialogVisible: false,
				personnelList: '',
				employeeInfo: '',
				expireTime: ''

			}
		},
		mounted() {
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height - 200 + 'px') : (height + 'px');
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
			searchEvent() {
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
					self.$http.get(self.api.deleteEmployeeInfo, {
						params: {
							accessToken: self.$store.state.user.token,
							employeeId: ID,
						}
					}, function(response) {
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							});
							self.getList();
							self.getListCount();
						} else {
							self.$message({
								type: 'warning',
								message: '删除失败',
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
			},
			changeStatus(ID) {
				this.$confirm('确认离职？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					var self = this;
					self.$http.get(self.api.updateStatus, {
						params: {
							accessToken: self.$store.state.user.token,
							employeeId: ID,
						}
					}, function(response) {
						if(response.data) {
							self.$message({
								type: 'success',
								message: '离职成功',
								duration: 2000
							});
							self.getList();
						} else {
							self.$message({
								type: 'warning',
								message: '离职失败',
								duration: 2000
							});
						}
					}, function(response) {})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消离职',
						duration: 2000
					});
				});
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getEmployeeList, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
						salaryLowerLimit: self.salaryLowerLimit,
						salaryUpperLimit: self.salaryUpperLimit,
						postName: self.postName,

					}
				}, function(response) {
					if(response.status == 200) {
						self.personnelList = response.data;
					}
				}, function(response) {
					//失败回调
				})
			},
			getListCount() {
				//查询条数
				let self = this;
				self.$http.get(self.api.getEmployeeListCount, {
					params: {
						accessToken: self.$store.state.user.token,
						salaryLowerLimit: self.salaryLowerLimit,
						salaryUpperLimit: self.salaryUpperLimit,
						postName: self.postName,
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
			showRenewedDialog(info) {
				this.renewedDialogVisible = true;
				this.employeeInfo = info;
			},
			renewedContract() {
				let self = this;
				this.$http.get(self.api.updateDeadline, {
					params: {
						deadline: self.expireTime,
						employeeId: self.employeeInfo.employeeId,
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					if(response.status == 200) {
						self.$message({
							type: 'success',
							message: '续期成功',
							duration: 1000
						});
						//self.contractInfo.restAreaExpireTime = self.expireTime;
						self.renewedDialogVisible = false;
					}
				}, function(response) {
					//失败回调
				})
			}
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