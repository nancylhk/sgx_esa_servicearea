<style scoped>

</style>
<template>
	<div :id="_id" class="chart"></div>
</template>

<script>
	import echarts from 'echarts';
	export default {
		data() {
			return {
				chartItem: ''
			}
		},
		props: {
			_id: String,
			_chartData: Array,
			_colorList: Array,
		},
		watch: {
			_chartData(val) {
				this.drawPie(val, this._id, this._colorList);
			},

		},
		mounted() {
			this.drawPie(this._chartData, this._id, this._colorList);
		},
		methods: {
			drawPie(chartData, id, colorList) {
				var chart = echarts.init(document.getElementById(id))
				var legendData = [];
				for(var k in chartData) {
					legendData.push(chartData[k].name);
					var ydata = chartData[k].data;
				}
				var pieData = []
				chart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'horizontal',
						left: 'center',
						bottom: '3%',
						data: legendData,
						itemHeight: 10,
						itemWidth: 15,
						textStyle: {
							color: '#999',
							fontSize: 10,
						}
					},
					series: [{
						name: '',
						type: 'pie',
						radius: ['40%', '60%'],
						center: ['50%', '50%'],
						color: colorList,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '12',
									fontWeight: 'bold',
									color: '#fff'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								borderWidth: 2,
								borderColor: '#fff',
							},
							emphasis: {
								borderWidth: 0,
								shadowBlur: 10,
								shadowOffsetX: 5,
								shadowColor: 'rgba(0, 0, 0, 0.4)'
							}
						},
						data: chartData
					}]
				})
			}
		}
	}
</script>