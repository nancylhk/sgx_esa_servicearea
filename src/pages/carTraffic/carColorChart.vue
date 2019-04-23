<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>车牌颜色统计图</span>
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
			<line2Comp class="chart-container" :_id="'southLine'" :_titleText="position1+'车牌颜色统计'" :_chartData="southLineData">
			</line2Comp>
			<line2Comp class="chart-container mt20" :_id="'northLine'" :_titleText="position2+'车牌颜色统计'" :_chartData="northLineData">
			</line2Comp>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import line2Comp from '../../components/charts/Line2Comp.vue';
	import { getNowFormatDate } from '../../utils';
	export default {
		data() {
			return {
				month: getNowFormatDate(),
				northLineData: [],
				southLineData: [],
				position1:'',
				position2:''
			}
		},
		components: {
			line2Comp,
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
				this.$http.get(self.api.getSouthColorLine, {
					params: {
						accessToken: self.$store.state.user.token,
						restAreaId: '',
						date:self.month
					}
				}, function(response) {
					if(response.status == 200) {
						self.southLineData = response.data;
						self.position1 = response.data[0].position;
					}
				}, function(response) {})
				
				this.$http.get(self.api.getNorthColorLine, {
					params: {
						accessToken: self.$store.state.user.token,
						restAreaId: '',
						date:self.month
					}
				}, function(response) {
					if(response.status == 200) {
						self.northLineData = response.data;
						self.position2 = response.data[0].position;
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
		height: 360px;
		border:solid 1px #ddd;
	}
	
</style>