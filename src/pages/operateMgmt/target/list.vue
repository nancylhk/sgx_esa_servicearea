<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true"  class="demo-form-inline">
				<el-form-item label="目标年份">
						<el-date-picker v-model="targetDate" type="year" placeholder="选择年" size="mini" value-format="yyyy">
					</el-date-picker>
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
						<th>服务区名称</th>
						<th>目标时间</th>
						<th>收入目标</th>
						<th>支出目标</th>
						<th>利润目标</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in missionList">
						<td>{{index+1}}</td>
						<td>{{info.restAreaName}}</td>
						<td>{{info.targetDate}}年</td>
						<td>{{info.incomeTarget}}元</td>
						<td>{{info.outcomeTarget}}元</td>
						<td>{{info.profitTarget}}元</td>
						<td>
							<a @click ="updateEvent(info.missionId)">修改</a>
							<a @click ="disableEvent(info.missionId)">作废</a>
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
				targetDate: '',
				beginRow:'',
				endRow:'',
				missionList:'',

			}
		},
		mounted() {
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			addEvent(ID) {
				this.$emit('changeComp', 'sectionAdd', '新增');
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
			disableEvent(ID) {
				this.$confirm('确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					var self = this;
					self.$http.get(self.api.disableMission, {
						params: {
							accessToken: self.$store.state.user.token,
							missionId: ID,
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '作废成功',
								duration: 2000
							})
							self.getList() ;
							self.getListCount();
						}else{
							self.$message({
								type: 'error',
								message: '作废失败',
								duration: 2000
							})
						}
					},function(response){})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消作废',
						duration: 2000
					});
				});
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				self.$http.get(self.api.getMissionList, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
						targetDate: self.targetDate,
						
					}
				},function(response){
					if(response.status == 200) {
						self.missionList = response.data;
					}
				},function(response){})
			},
			getListCount(){
				let self = this;
				self.$http.get(self.api.queryMissionCount, {
					params: {
						accessToken: self.$store.state.user.token,
						targetDate: self.targetDate,
					}
				},function(response){
					if(response.status == 200) {
						self.total = parseInt(response.data);
					}
				},function(response){})
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