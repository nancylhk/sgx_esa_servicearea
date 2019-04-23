<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>区域车流量查询</span>
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
						<th v-for="(info,index) in tabHeadData">{{index+1}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in trafficData">
						<td :rowspan="20" width="75" :class="{hidden: index > 0}">交通量</td>
						<td width="50">{{info.name}}</td>
						<td v-for="(item,index) in info.data">{{item}}</td>
					</tr>
				</tbody>
			</table>
			<p v-show="trafficData.length == 0" class="noDataTip">没有找到相关数据,请选择查询条件！</p>
			<div class="dataSummary">
				<!--<span>合计:{{trafficTotal}}</span>-->
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
				tabHeadData:[],
				restAreaId:''

			}
		},
		mounted() {
			this.getList();
			var height = document.documentElement.clientHeight;
			//document.getElementById("app-main").style.height = (height > 700) ? (height - 200 + 'px') : (height + 'px');
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
				var url = "/vehicle/vehicleFlowrate/Export?accessToken="+self.$store.state.user.token+"&restAreaId="+self.restAreaId+"&date="+self.month;
				
				/*var url = "/vehicle/exportMonthlyTrafficColor?accessToken = "+self.$store.state.user.token+"&date="+self.month;*/
				a.href = url;
				a.setAttribute('download', '')
				document.body.appendChild(a)
				a.click();
				window.URL.revokeObjectURL(url);
			},
			getList() {
				let self = this;
				this.$http.get(self.api.getAreaTraffic, {
					params: {
						accessToken: self.$store.state.user.token,
						restAreaId: '',
						date:self.month
					}
				}, function(response) {
					if(response.status == 200) {
						self.trafficData = response.data;
						self.tabHeadData = response.data[0].data;
					}
				}, function(response) {})
			}
		},

	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.report-tab {
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