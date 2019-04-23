<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>车流量统计查询</span>
		</h5>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择月">
					<el-date-picker v-model="month" type="month" value-format="yyyy-MM" placeholder="请选择月">
					</el-date-picker>
				</el-form-item>
				<el-form-item class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="exportReport" class="exportReport">生成报表</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main report-tab" id="app-main">
			<table >
				<thead>
					<tr>
						<th :colspan="2">日期</th>
						<th v-for="(info,index) in everydaylist">{{info.id}}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td :rowspan="3" width="75">交通量</td>
						<td width="50">{{areaInfo.NE}}入</td>
						<td v-for="(info,index) in everydaylist">{{info.NE}}</td>
					</tr>
					<tr>
						<td >{{areaInfo.SW}}入</td>
						<td v-for="(info,index) in everydaylist">{{info.SW}}</td>
					</tr>
					<tr>
						<td >合计</td>
						<td v-for="(info,index) in everydaylist">{{info.total}}</td>
					</tr>
					<tr>
						<td :rowspan="3">日均交通量</td>
						<td >{{areaInfo.NE}}入</td>
						<td :colspan="everydayLength">{{averagePerDay.NE}}</td>
					</tr>
					<tr>
						<td >{{areaInfo.SW}}入</td>
						<td :colspan="everydayLength">{{averagePerDay.SW}}</td>
					</tr>
					<tr>
						<td >合计</td>
						<td :colspan="everydayLength">{{averagePerDay.total}}</td>
					</tr>
					<tr>
						<td :rowspan="5">旬均交通量</td>
						<td ></td>
						<td v-for="(info,index) in everytendayList" :colspan="info.everytendays">
							<span v-show = "info.date ==1">上旬</span>
							<span v-show = "info.date ==2">中旬</span>
							<span v-show = "info.date ==3">下旬</span>
						</td>
					</tr>
					<tr>
						<td >{{areaInfo.SW}}入</td>
						<td v-for="(info,index) in everytendayList" :colspan="info.everytendays">{{info.SW}}</td>
					</tr>
					<tr>
						<td >{{areaInfo.NE}}入</td>
						<td v-for="(info,index) in everytendayList" :colspan="info.everytendays">{{info.NE}}</td>
					</tr>
					<tr>
						<td >合计</td>
						<td v-for="(info,index) in everytendayList" :colspan="info.everytendays">{{info.total}}</td>
					</tr>
					<tr>
						<td >日均</td>
						<td v-for="(info,index) in everytendayList" :colspan="info.everytendays">{{info.averagePerDay}}</td>
					</tr>
				</tbody>
			</table>
			<p v-show="trafficData.length == 0" class="noDataTip">没有找到相关数据,请选择查询条件！</p>
			<div class="dataSummary">
				<span>合计:{{trafficTotal}}</span>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { getNowFormatDate } from '../../utils';
	export default {
		name: 'sectionList',
		data() {
			return {
				month: getNowFormatDate(),
				trafficData: [],
				trafficTotal: 0,
				everydaylist:[],
				averagePerDay:{},
				everytendayList:[],
				everydayLength:0,
				areaInfo:{}

			}
		},
		mounted() {
			this.getList();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height - 200 + 'px') : (height + 'px');
		},
		watch: {
			
		},
		methods: {
			searchEvent() {
				this.getList();
			},
			exportReport() {
				//window.location.href="detail.html?id="+id+"&key="+key;
				let self = this;
				var a = document.createElement('a');
				var url = "/vehicle/exportMonthlyTrafficCount?accessToken="+self.$store.state.user.token+"&date="+self.month;
				a.href = url;
				a.click();
				window.URL.revokeObjectURL(url);
			},
			getList() {
				let self = this;
				this.$http.get(self.api.getMonthlyTrafficCount, {
					params: {
						accessToken: self.$store.state.user.token,
						restAreaId: '',
						date:self.month
					}
				}, function(response) {
					if(response.status == 200) {
						self.trafficData = response.data;
						//self.tabHeadData = self.trafficData.everydayInfo[0].date;
						self.areaInfo = self.trafficData.area;
						self.everydaylist = self.trafficData.everydayInfo;
						self.everydayLength = self.trafficData.everydayInfo.length;
						self.averagePerDay = self.trafficData.averagePerDay;
						self.everytendayList = self.trafficData.everytendayInfo;
						self.trafficTotal = parseInt(self.everytendayList[0].total) + parseInt(self.everytendayList[1].total) +parseInt(self.everytendayList[2].total);
					}
				}, function(response) {})
			}
		},

	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.report-tab{
		border:none;
		.el-button--text {
			border: none;
			color: #0099cc;
		}
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