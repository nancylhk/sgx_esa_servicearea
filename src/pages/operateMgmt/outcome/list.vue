<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true"  class="demo-form-inline">
				<el-form-item label="支出金额">
						<input v-model="minMoney" class="queryIpt" />
						<span style="color: #d8dce5;">~</span>
						<input v-model="maxMoney" class="queryIpt"/>
				</el-form-item>
				<el-form-item label="支出类型">
					<el-select v-model="outcomeType" clearable>
						<el-option v-for="(item,index) in payOutTypes" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
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
						<th>支出类型</th>
						<th>支付方式</th>
						<th>支出金额</th>
						<th>支出时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in outcomeList">
						<td>{{index+1}}</td>
						<td>{{info.outcomeItem}}</td>
						<td>{{info.outcomeType}}</td>
						<td>{{info.outcomeAmount}}</td>
						<td>{{info.outcomeTime}}</td>
						<td>
							<a @click ="viewEvent(info.outcomeId)">查看</a>
							<a @click ="disableEvent(info.outcomeId)">删除</a>
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
				total:Number,
				currentPage: 1,
				pageSize: 10,
				minMoney: '',
				maxMoney:'',
				outcomeType: '',
				beginRow:'',
				endRow:'',
				centerDialogVisible: false,
				outcomeList:'',
				payOutTypes:[],

			}
		},
		created() {
			var self = this;
			//支出事项
			if(self.$store.state.app.commonVariable.payOutTypes) {
				self.payOutTypes = self.$store.state.app.commonVariable.payOutTypes;
			} else {
				self.$http.get(self.api.gePayOutType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.payOutTypes = response.data.payOutTypes;
					self.$store.dispatch('setCommonVariable', {
						payOutTypes: self.payOutTypes
					});
				}, function(response) {})
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
					self.$http.get(self.api.disableOutcomeInfo, {
						params: {
							accessToken: self.$store.state.user.token,
							outcomeId: ID,
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							})
							self.getList() ;
							self.getListCount();
						}else{
							self.$message({
								type: 'warning',
								message: '删除失败',
								duration: 2000
							})
						}
					},function(response){
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
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getOutcomeInfoList, {
					params: {
						accessToken: this.$store.state.user.token,
						beginRow: this.beginRow,
						endRow: this.endRow,
						minMoney: self.minMoney,
						maxMoney:self.maxMoney,
						outcomeType: self.outcomeType
					}
				},function(response){
					if(response.status == 200) {
						self.outcomeList = response.data.outcomeLists;
					}
				},function(response){
	                //失败回调
	            })
				
			},
			getListCount(){
				let self = this;
				self.$http.get(self.api.getDefaultOutComeNum, {
					params: {
						accessToken: self.$store.state.user.token,
						minMoney: self.minMoney,
						maxMoney:self.maxMoney,
						outcomeType: self.outcomeType
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