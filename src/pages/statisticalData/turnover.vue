<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>营业额报表</span>
		</h5>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<!--<el-form-item label="服务区">
					<el-select v-model="restAreaId" clearable>
						<el-option v-for="(item,index) in restAreaList" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>-->
				<el-form-item label="报表类型">
					<el-select v-model="queryType" clearable>
						<el-option label="年报" value="1"></el-option>
						<el-option label="月报" value="2"></el-option>
						<el-option label="日报" value="3"></el-option>
						<el-option label="自定义" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择年" v-show="queryType == '1'">
					<el-date-picker v-model="year" type="year" value-format="yyyy" placeholder="请选择年">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="选择月" v-show="queryType == '2'">
					<el-date-picker v-model="month" type="month" value-format="yyyy-MM" placeholder="请选择月">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="选择日" v-show="queryType == '3'">
					<el-date-picker v-model="day" type="date" value-format="yyyy-MM-dd" placeholder="请选择日">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="时间" v-show="queryType == '4'">
					<el-date-picker v-model="timeRange" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd hh:mm:ss" size="mini">
					</el-date-picker>
				</el-form-item>
				<el-form-item class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="exportReport" class="exportReport">生成报表</el-button>
					<!--<a href="'/report/exportTurnoverReport?accessToken=' +$store.state.user.token+ '&restAreaId='+restAreaId+ '&beginTime='+beginTime+ '&endTime='+endDate"> 生成报表</a>-->
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main report-tab" id="app-main">
			<table>
				<thead>
					<tr>
						<th>服务区</th>
						<th>销售店铺</th>
						<th>销售点</th>
						<th>销售额(元)</th>
						<th>单区合计(元)</th>
						<th>店面合计(元)</th>
						<th>合计金额(元)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in turnoverReportList">
						<td :rowspan="info.restAreaspan" :class="{hidden: info.restAreadis}">{{info.restAreaName}}</td>
						<td :rowspan="info.shopspan" :class="{hidden: info.shopdis}">{{info.shopName}}</td>
						<td :rowspan="info.placespan" :class="{hidden: info.placedis,tdGray:index%2==1}">{{info.placeName}}</td>
						<td :rowspan="info.saleAmountspan" :class="{hidden: info.saleAmountdis,tdGray:index%2==1}">{{info.saleAmount}}</td>
						<td :rowspan="info.singleTotalspan" :class="{hidden: info.singleTotaldis,tdGray:index%2==1}">{{info.singleTotal}}</td>
						<td :rowspan="info.storeTotalspan" :class="{hidden: info.storeTotaldis}">{{info.storeTotal}}</td>
						<td :rowspan="info.totalAmountspan" :class="{hidden: info.totalAmountdis}">{{info.totalAmount}}</td>
					</tr>
				</tbody>
			</table>
			<p v-show="total == 0" class="noDataTip">没有找到相关数据,请选择查询条件！</p>
			<div v-show="total > 0" class="dataSummary">
				<span>总营业额:{{saleTotalInfo.totalSalesVolume}} 元</span>
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
				restAreaId: '',
				queryType: '1',
				restAreaList: [],
				year: new Date().getFullYear().toString(),
				month: '',
				day: '',
				timeRange: [],
				beginTime: '',
				beginDate: '',
				endDate: '',
				turnoverReportList: [],
				saleTotalInfo: {
					totalSalesVolume: 0,
				},
			}
		},
		mounted() {
			console.log(new Date().getFullYear());
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height - 200 + 'px') : (height + 'px');
		},
		created() {
			var self = this;
			/*//经营方式
			if(self.$store.state.app.commonVariable.businessTypes) {
				self.businessTypes = self.$store.state.app.commonVariable.businessTypes;
			} else {
				self.$http.get(self.api.getBusinessType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.businessTypes = response.data.businessTypes;
					self.$store.dispatch('setCommonVariable', {
						businessTypes: self.businessTypes
					});
				}, function(response) {})
			}*/
		},
		watch: {
			timeRange: {
				handler: function(newVal, oldVa) {
					let self = this;
					if(newVal==null || newVal==''|| newVal==undefined){
						self.beginDate='';
						self.endDate='';
						
					}else{
						self.beginDate =  newVal[0] ;
						self.endDate = newVal[1];
					}
				},
			},

		},
		methods: {
			searchEvent() {
				this.getList();
				this.getListCount();
				//this.exportReport();
			},
			exportReport() {
				let self = this;
				var a = document.createElement('a');
				var url = "/report/exportTurnoverReport?accessToken="+self.$store.state.user.token+"&restAreaId="+self.restAreaId+"&queryType="+self.queryType+"&beginTime="+self.beginTime+"&endTime="+self.endTime;
				//var url = self.api.exportTurnoverReport;
				a.href = url;
				a.click();
				window.URL.revokeObjectURL(url);
			},
			createObjectURL(object) {
				return(window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
			},
			getBeginTime() {
				var self = this;
				switch(self.queryType) {
					case '1':
						self.beginTime = self.year;
						break;
					case '2':
						self.beginTime = self.month;
						break;
					case '3':
						self.beginTime = self.day;
						break;
					case '4':
						self.beginTime = self.beginDate;
						break;
				}
			},
			getList() {
				let self = this;
				self.getBeginTime();
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(self.api.getTurnoverReport, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
						restAreaId: self.restAreaId,
						queryType: self.queryType,
						beginTime: self.beginTime,
						endTime: self.endDate
					}
				}, function(response) {
					if(response.status == 200) {
						self.turnoverReportList = self.combineCell(response.data);
					}
				}, function(response) {})
			},
			//查询条数
			getListCount() {
				let self = this;
				self.getBeginTime();
				self.$http.get(self.api.getTurnoverReportTotalInfo, {
					params: {
						accessToken: self.$store.state.user.token,
						restAreaId: self.restAreaId,
						queryType: self.queryType,
						beginTime: self.beginTime,
						endTime: self.endDate
					}
				}, function(response) {
					if(response.status == 200) {
						self.total = parseInt(response.data.total);
						self.saleTotalInfo = response.data;
					}
				}, function(response) {})
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getList();
			},
			combineCell(list) {
				var param = {
					"restArea": "",
					"shop": "",
					"place": "",
					"saleAmount": "",
					"singleTotal": "",
					"storeTotal": "",
					"totalAmount": ""
				}
				for(var field in param) {
					var k = 0;
					while(k < list.length) {
						list[k][field + 'span'] = 1;
						list[k][field + 'dis'] = false;
						for(var i = k + 1; i <= list.length - 1; i++) {
							if(list[k][field + 'Id'] == list[i][field + 'Id'] && list[k][field + 'Id'] != '') {
								list[k][field + 'span']++;
								list[k][field + 'dis'] = false;
								list[i][field + 'span'] = 1;
								list[i][field + 'dis'] = true;
							} else {
								break;
							}
						}
						k = i;
					}
				}
				return list;
			},
		},

	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.report-tab {
		table tr {
			border: none;
			td {
				text-align: center;
				color: #999;
				border: solid 1px #ddd;
			}
			&:nth-child(even) {
				/*background: #f5f6fa;*/
			}
		}
	}
	.tdGray {
		background: #f5f6fa;
	}	
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
	.hidden {
		display: none;
	}
</style>