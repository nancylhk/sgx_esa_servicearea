<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>车流量统计图</span>
		</h5>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择月">
					<el-date-picker v-model="month" type="month" value-format="yyyy-MM" placeholder="请选择月">
					</el-date-picker>
				</el-form-item>
				<el-form-item class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main b-none" id="app-main">
			
			<lineComp class="chart-container" :_id="'carFlow'" :_titleText="'车流量统计图'" :_chartData="trafficData">
			</lineComp>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { getNowFormatDate } from '../../utils';
	import lineComp from '../../components/charts/Line2Comp.vue';
	export default {
		data() {
			return {
				month: getNowFormatDate(),
				trafficData: [],
			}
		},
		components: {
			lineComp,
		},
		mounted() {
			this.getChartData();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height - 200 + 'px') : (height + 'px');
		},
		methods: {
			searchEvent() {
				this.getChartData();
			},
			getChartData() {
				let self = this;
				this.$http.get(self.api.getCarFlowLine, {
					params: {
						accessToken: self.$store.state.user.token,
						restAreaId: '',
						date:self.month
					}
				}, function(response) {
					if(response.status == 200) {
						self.trafficData = response.data;
					}
				}, function(response) {})
			}
		},

	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.b-none {
		border:none;
	}
	.hidden {
		display: none;
	}
	.chart-container {
		width: 100%;
		height: 500px;
		box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
	}
	
</style>