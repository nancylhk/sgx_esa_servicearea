<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>销售明细查询</span>
		</h5>
		<div class="app-search">
			<el-form :inline="true" class="demo-form-inline">
				<!--<el-form-item label="服务区">
						<el-select v-model="restAreaId" clearable>
							<el-option v-for="(item,index) in restAreaList" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
							</el-option>
						</el-select>
					</el-form-item>-->
				<el-form-item label="销售店铺">
					<el-select v-model="shopId" clearable>
						<el-option v-for="(item,index) in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="人员编号">
					<el-input v-model="cashierId"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker v-model="timeRange" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd hh:mm:ss" size="mini">
					</el-date-picker>
				</el-form-item>
				<el-form-item class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<!--<el-button type="primary" @click="exportReport" class="exportReport">生成报表</el-button>-->
				</el-form-item>

			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>服务区</th>
						<th>销售店铺</th>
						<th>销售人员</th>
						<th>人员编号</th>
						<th>商品名称</th>
						<th>数量</th>
						<th>销售时间</th>
						<th>销售额</th>
						<th>支付方式</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in saleReportList">
						<td>{{info.restAreaName}}</td>
						<td>{{info.shopName}}</td>
						<td>{{info.cashierName}}</td>
						<td>{{info.cashierId}}</td>
						<td>{{info.productName}}</td>
						<td>{{info.tradeNum}}</td>
						<td>{{info.tradeDate}}</td>
						<td>{{info.price}}</td>
						<td>{{info.posType}}</td>

					</tr>
				</tbody>
			</table>
			<p v-show="total == 0" class="noDataTip">没有找到相关数据,请选择查询条件！</p>
			<div v-show="total > 0" class="dataSummary">
				<span>总销售笔数:{{saleTotalInfo.totalCount}} </span>
				<span>总销售额:{{saleTotalInfo.totalSalesVolume}}</span>
				<span>现金支付总销售额:{{saleTotalInfo.cashTotal}}元</span>
				<span>支付宝支付总销售额:{{saleTotalInfo.zfbTotal}}元</span>
				<span>微信支付总销售额:{{saleTotalInfo.wxTotal}}元</span>
			</div>
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
				beginRow: '',
				endRow: '',
				beginTime: '',
				endTime: '',
				restAreaId: '',
				shopId: '',
				cashierId: '',
				restAreaList: [],
				shopList: [],
				timeRange: [],
				saleReportList: [],
				saleTotalInfo: {
					cashTotal: 0,
					totalCount: 0,
					zfbTotal: 0,
					wxTotal: 0,
					totalSalesVolume: 0,

				}
			}
		},
		mounted() {
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height - 200 + 'px') : (height + 'px');
		},
		created() {
			var self = this;
			//获得服务区下所有商铺
			self.$http.get(self.api.getShopList, {
				params: {
					accessToken: self.$store.state.user.token,
				}
			}, function(response) {
				self.shopList = response.data;

			}, function(response) {})

		},
		watch: {
			timeRange: {
				handler: function(newVal, oldVa) {
					let self = this;
					if(newVal==null || newVal==''|| newVal==undefined){
						self.beginTime='';
						self.endTime='';
						
					}else{
						self.beginTime =  newVal[0] ;
						self.endTime = newVal[1];
					}
					
				},
			}
		},
		methods: {
			searchEvent() {
				this.getList();
				this.getListCount();
			},
			exportReport() {
				let self = this;
				var a = document.createElement('a');
				var url = "/report/exportSaleDetailReport?accessToken=" + self.$store.state.user.token + "&restAreaId=" + self.restAreaId + "&beginTime=" + self.beginTime + "&endTime=" + self.endTime + "&shopId=" + self.shopId + "&cashierId=" + self.cashierId;
				//var url = self.api.exportTurnoverReport;
				a.href = url;
				a.click();
				window.URL.revokeObjectURL(url);
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(self.api.getSaleDetailReport, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
						restAreaId: self.restAreaId,
						shopId: self.shopId,
						cashierId: self.cashierId,
						beginTime: self.beginTime,
						endTime: self.endTime
					}
				}, function(response) {
					if(response.status == 200) {
						self.saleReportList = response.data;
					}
				}, function(response) {})

			},
			//查询条数
			getListCount() {
				let self = this;
				self.$http.get(self.api.getSaleDetailReportTotalInfo, {
					params: {
						accessToken: self.$store.state.user.token,
						restAreaId: self.restAreaId,
						shopId: self.shopId,
						cashierId: self.cashierId,
						beginTime: self.beginTime,
						endTime: self.endTime
					}
				}, function(response) {
					if(response.status == 200) {
						self.total = parseInt(response.data.pageCount);
						self.saleTotalInfo = response.data;
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
/*	.app-main {
		.el-button--text {
			border: none;
			color: #0099cc;
		}
	}
	*/
	.dataSummary {
		float: right;
		margin: 20px;
		span {
			font-weight: bold;
			color: #0099cc;
			padding: 0 10px;
		}
	}
	
	.exportReport {
		background-color: #68c949;
		border-color: #68c949;
	}
</style>