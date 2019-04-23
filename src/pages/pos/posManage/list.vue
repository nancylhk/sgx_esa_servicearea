<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="店铺名称">
					<el-input v-model="shopName" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="status"  clearable>
						<el-option label="使用" value="1"></el-option>
						<el-option label="未使用" value="0"></el-option>
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
						<th>店铺名称</th>
						<th>POS机编号</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in posList">
						<td>{{index+1}}</td>
						<td>{{info.shopName}}</td>
						<td>{{info.propertyId}}</td>
						<td>{{info.status}}</td>
						<td>
							<a @click ="viewEvent(info.devId)">查看</a>
							<a @click ="updateEvent(info.devId)">修改</a>
							<a @click ="deleteEvent(info.devId)">删除</a>
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
				shopName:'',
				status:'',
				beginRow:'',
				endRow:'',
				posList:[]
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
					self.$http.get(self.api.deletePosdev, {
						params: {
							accessToken: self.$store.state.user.token,
							devId: ID,
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
				self.$http.get(self.api.getDetailtPosdevList, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
						shopName:self.shopName,
						status:self.status,
					}
				},function(response){
					if(response.status == 200) {
						self.posList = response.data.PosDevLists;	
					}
				},function(response){ })
				
			},
			//查询条数
			getListCount(){
				let self = this;
				self.$http.get(self.api.getDefaultPosDevListNum, {
					params: {
						accessToken: self.$store.state.user.token,
						shopName:self.shopName,
						status:self.status,
					}
				},function(response){
					if(response.status == 200) {
						self.total = parseInt(response.data);
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