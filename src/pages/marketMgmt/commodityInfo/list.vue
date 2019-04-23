<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="名称">
					<el-input v-model="commodityName"></el-input>
				</el-form-item>
				<el-form-item label="价格">
						<input v-model="priceLow" class="queryIpt" />
						<span style="color: #d8dce5;">~</span>
						<input v-model="priceTop" class="queryIpt"/>
				</el-form-item>
				<el-form-item label="商铺类型">
					<el-select v-model="shopType" clearable>
						<el-option v-for="(item,index) in shopTypeList" :key="item.shopTypeCode" :label="item.shopTypeName" :value="item.shopTypeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<!--<el-button type="primary" @click="addEvent">新增</el-button>-->
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>名称</th>
						<th>条形码</th>
						<th>出售类型</th>
						<th>零售价</th>
						<th>等级</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in commodityList">
						<td>{{index+1}}</td>
						<td>{{info.commodityName}}</td>
						<td>{{info.barCode}}</td>
						<td>{{info.commodityType}}</td>
						<td>{{info.price}}元</td>
						<td>{{info.commodityLevel}}</td>
						<td>
							<a @click="viewEvent(info.commodityID)">查看</a>
							<!--<a @click="updateEvent(info.commodityID)">修改</a>-->
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
			<p class="dialog-cont"><label>价格：</label><span>{{commodityInfo.price}}元</span></p>
			<p class="dialog-cont"><label>价格调整：</label>
				<input v-model="price" class="queryIpt" /><span class="unit">元</span>
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
				commodityName: '',
				priceLow:'',
				priceTop:'',
				beginRow: '',
				endRow: '',
				priceDialogVisible: false,
				commodityList: '',
				commodityInfo: '',
				price: '',
				shopType:'',
				shopTypeList:[]
			}
		},
		created() {
			var self = this;
			//店铺类型
			if(self.$store.state.app.commonVariable.shopTypes) {
				self.shopTypeList = self.$store.state.app.commonVariable.shopTypes;
			} else {
				self.$http.get(self.api.getShopType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.shopTypeList = response.data.shopTypes;
					self.$store.dispatch('setCommonVariable', {
						shopTypes: self.shopTypeList
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
			updateEvent(ID) {
				this.$emit('changeComp', 'sectionUpdate', '修改');
				this.$store.dispatch('setViewId', ID);
			},
			searchEvent() {
				this.getList();
				this.getListCount();
			},
			showPriceDialog(info) {
				this.priceDialogVisible = true;
				this.commodityInfo = info;
			},
			adjustPrice(price) {
				let self = this;
				const reg =  /^[0-9]+(\.[0-9]{1,2})?$/;
				if(self.price == '') {
					self.$message({
						type: 'error',
						message: '价格不能为空',
						duration: 2000
					});
				}else if(!reg.test(self.price)) {
					self.$message({
						type: 'error',
						message: '请输入整数或小数点后两位',
						duration: 2000
					});
				} else {
					self.$http.get(self.api.upDateCommodityPrice, {
						params: {
							accessToken: self.$store.state.user.token,
							price: self.price,
							commodityID: self.commodityInfo.commodityID,
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '调整成功',
								duration: 2000
							});
							self.commodityInfo.price = self.price;
							self.priceDialogVisible = false;
						} else {
							self.$message({
								type: 'warning',
								message: '调整失败',
								duration: 2000
							});
						}
					},function(response){
		                //失败回调
		            })
				}
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
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getCommodityList, {
					params: {
						accessToken: self.$store.state.user.token,
						commodityName: self.commodityName,
						priceLow: self.priceLow,
						priceTop: self.priceTop,
						beginRow: self.beginRow,
						shopType:self.shopType,
						endRow: self.endRow,
					}
				},function(response){
					if(response.status == 200) {
						self.commodityList = response.data;
					}
				},function(response){
	                //失败回调
	            })
			},
			getListCount(){
				let self = this;
				self.$http.get(self.api.getCommodtiyCount, {
					params: {
						accessToken: self.$store.state.user.token,
						commodityName: self.commodityName,
						shopType:self.shopType,
						priceLow: self.priceLow,
						priceTop: self.priceTop,
					}
				}, function(response) {
					if(response.status == 200) {
						self.total = response.data;
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