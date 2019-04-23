<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="商品名称 ">
					<el-input v-model="productName"></el-input>
				</el-form-item>
				<el-form-item label="所属公用库">
					<el-select v-model="publicStorageID">
						<el-option
					      v-for="(item,index) in storageList"
					      :key="item.id"
					      :label="item.commonName"
					      :value="item.id">
					   </el-option>
					</el-select>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="addEvent">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main mt20" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>商品名称</th>
						<th>条形码</th>
						<th>价格</th>
						<th>所属公用库</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in productList">
						<td>{{index+1}}</td>
						<td>{{info.productName}}</td>
						<td>{{info.barCode}}</td>
						<td>{{info.price}}</td>
						<td>{{info.commonName}}</td>
						<td>{{info.status}}</td>
						<td>
							<a @click="startProcess(info.productID)" v-show="info.statusID == 2||info.statusID == -2">提交审批</a>
							<a @click="updateEvent(info.productID)"  v-show="info.statusID == 2||info.statusID == -2">修改</a>
							<a @click="delCommonStorageProduct(info.productID)" v-show="info.statusID == 2||info.statusID == -2">删除</a>
							<a @click="viewEvent(info.productID)">查看</a>	
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
				storageList:[],
				productList:[],
				publicStorageID:'',
				productName:'',
			}
		},
		created(){
			var self = this;
			//所属单位
			
			self.$http.get(self.api.getAllPublicStorage, {
				params: {
					accessToken: self.$store.state.user.token,
				}
			}, function(response) {
				self.storageList =response.data;
			}, function(response) {})
			
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
			updateEvent(ID) {
				this.$emit('changeComp', 'sectionUpdate', '修改');
				this.$store.dispatch('setViewId', ID);
			},
			viewEvent(ID) {
				this.$emit('changeComp', 'sectionView', '查看');
				this.$store.dispatch('setViewId', ID);
			},
			searchEvent(){
				this.getList();
				this.getListCount();
			},
			startProcess(ID){
				var self = this;
				this.$confirm('是否提交审批？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					self.$http.get(self.api.startCommonStorageProcess, {
						params: {
							accessToken: self.$store.state.user.token,
							productID: ID,
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '提交成功',
								duration: 2000
							});
							self.getList();
						}else{
							self.$message({
								type: 'warning',
								message: '提交失败',
								duration: 2000
							});
						}
					},function(response){
		                //失败回调
		            })

				})
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				self.$http.get(self.api.getMyPublicStorageList, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
						publicStorageID:self.publicStorageID,
						productName:self.productName
					}
				},function(response){
					if(response.status == 200) {
						self.productList = response.data;	
					}
				},function(response){ })
				
			},
			//查询条数
			getListCount(){
				let self = this;
				self.$http.get(self.api.getMyPublicStorageListCount, {
					params: {
						accessToken: self.$store.state.user.token,
						publicStorageID:self.publicStorageID,
						productName:self.productName
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
			delCommonStorageProduct(ID) {
				var self = this;
				this.$confirm('是否删除该公用库商品？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					self.$http.get(self.api.deletePublicStorageProduct, {
						params: {
							accessToken: self.$store.state.user.token,
							productID: ID,
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							});
							self.getList();
						}else{
							self.$message({
								type: 'warning',
								message: '删除失败',
								duration: 2000
							});
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