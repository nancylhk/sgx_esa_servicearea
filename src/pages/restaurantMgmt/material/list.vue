<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" :model="queryCondition" class="demo-form-inline">
				<el-form-item label="经营方式">
					<el-select v-model="queryCondition.type" placeholder="选择类型">
						<el-option label="私营" value="read"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="addEvent">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>名称</th>
						<th>零售价</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in commodityList">
						<td>{{index+1}}</td>
						<td>{{info.commodityName}}</td>
						<td>{{info.price}}</td>
						<td>
							<a @click="viewEvent(info.commodityID)">查看</a>
							<a @click="updateEvent(info.commodityID)">修改</a>
							<a @click="showPriceDialog(info)">价格调整</a>
							<a @click="deleteEvent(info.commodityID)">删除</a>
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
		<el-dialog title="提示" :visible.sync="priceDialogVisible" width="20%" center>
			<p class="dialog-cont"><label>商品名称：</label><span>{{commodityInfo.commodityName}}</span></p>
			<p class="dialog-cont"><label>条形码：</label><span>{{commodityInfo.barCode}}</span></p>
			<p class="dialog-cont"><label>价格：</label><span>{{commodityInfo.price}}</span></p>
			<p class="dialog-cont"><label>价格跳转：</label>
				<input v-model="price" class="queryIpt" />
			</p>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="priceDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="adjustPrice">确 定</el-button>
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
				queryCondition: {
					type: ''
				},
				priceDialogVisible: false,
				commodityList: '',
				commodityInfo: '',
				price: ''

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
			updateEvent(ID) {
				this.$emit('changeComp', 'sectionUpdate', '修改');
				this.$store.dispatch('setViewId', ID);
			},
			showPriceDialog(info) {
				this.priceDialogVisible = true;
				this.commodityInfo = info;
			},
			adjustPrice(price) {
				this.$http.get(this.api.upDateCommodityPrice, {
					params: {
						accessToken: this.$store.state.user.token,
						price: this.price,
						commodityID: this.commodityInfo.commodityID,
					}
				},function(response){
					if(response.data) {
						this.$message({
							type: 'success',
							message: '调整成功',
							duration: 2000
						});
						this.commodityInfo.price = this.price;
						this.priceDialogVisible = false;
					} else {
						this.$message({
							type: 'warning',
							message: '调整失败',
							duration: 2000
						});
					}
				},function(response){
	                //失败回调
	            })
			},
			deleteEvent(ID) {
				this.$confirm('确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					var self = this;
					self.$http.get(self.api.deleteCommodityInfo, {
						params: {
							accessToken: self.$store.state.user.token,
							commodityID: ID,
						}
					},function(response){
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
				this.$http.get(this.api.getCommodityList, {
					params: {
						accessToken: this.$store.state.user.token,
						currentPage: this.currentPage,
						pageSize: this.pageSize
					}
				},function(response){
					if(response.status == 200) {
						self.commodityList = response.data.dataArr;
						self.total = parseInt(response.data.value);
					}
				},function(response){
	                //失败回调
	            })
			},
			getListCount(){
				
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
	.dialog-cont {
		span {
			display: inline-block;
			width: 43%;
			text-align: left;
		}
		label {
			display: inline-block;
			width: 32%;
			text-align: right;
			padding-right: 10px;
		}
		input{
			 height: 26px;
		    -webkit-appearance: none;
		    background-color: #fff;
		    border-radius: 4px;
		    border: 1px solid #d8dce5;
		    box-sizing: border-box;
		    color: #5a5e66;
		    display: inline-block;
		    line-height: 1;
		    outline: 0;
		    padding: 0 15px;
		    width: 43%;
		}
	}
</style>