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
				chartItem:''
			}
		},
		props: {
			_id: String,
			_titleText: String,
			_chartData: Array,
		},
		watch: {
			_chartData(val) {
				this.drawLine(val, this._id, this._titleText);
			},
			
		},
		mounted() {			
			this.drawLine(this._chartData, this._id, this._titleText);
		},
		methods: {
			drawLine(chartData, id, titleText){
					var xAxisData = (function(xdata) {
					var array;
					for(var kk in xdata) {
						array = xdata[kk].data;
						break;
					}
					var data = [];
					for(var k in array) {
						data.push(k);
					}
					return data;
				})(chartData);
				//获取图例和数据
				var legendData = [];
				var seriesData = [];
				for(var k in chartData) {
					legendData.push(chartData[k].name);
					var ydata = chartData[k].data;
					var target = [];
					for(var key in ydata) {
						target.push(ydata[key]);
					}
					seriesData.push({
						name: chartData[k].name,
						type: 'line',
				        smooth: true,
				        lineStyle: {
				            normal: {
				                width:2
				            }
				        },
				        areaStyle: {
				            normal: {
				                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                    offset: 0,
				                    color: 'rgba(104, 201, 215, 0.8)'
				                }, {
				                    offset: 1,
				                    color: 'rgba(93, 202, 218, 0)'
				                }], false),
				                shadowColor: 'rgba(0, 0, 0, 0.1)',
				                shadowBlur: 10
				            }
				        },
				        itemStyle: {
				            normal: {
				                color: 'rgb(94,199,215)'
				            }
				        },
						data: target
					})
				}
				var chart = echarts.init(document.getElementById(id))
				var option = {
				    backgroundColor: '#fff',
				    title: {
						text: titleText,
						textStyle: {
							color: '#333',
							fontFamily: 'Microsoft YaHei',
							fontWeight: 'normal',
							　　　　fontSize: 12
						},
						top: 6,
						left: 6
					},
				    tooltip: {
				        trigger: 'axis',
				    },
				    grid: {
					    left: '2%',
						right: '3%',
						bottom: '6%',
						containLabel: true
				  	},
				    legend: {
				    	top: 30,
						right: 10,
				        data: legendData,
				        itemHeight: 10,
						itemWidth: 15,
						textStyle: {
							color: '#999',
							fontSize: 10,
						}
				    },
					calculable: true,
				    xAxis: {
				        data: xAxisData,
				        axisLabel: {
				        	interval: 0,
				            textStyle: {
				                color: '#999'
				            }
				        },
				        axisLine: {
				            lineStyle: {
				                color: '#f2f2f2'
				            }
				        },
				        axisTick: {
					        show: false
					    },
				    },
				    yAxis: {
				        axisLine : {
				        	show: false
				        },
				        axisTick: {
					        show: false
					    },
					     axisLabel: {
				            textStyle: {
				                color: '#999'
				            }
				        },
				        splitLine: {
				            show: true,
				            lineStyle: {
				                color: '#f4f4f4'
				            }
				        },
				    },
				  series: seriesData
				}
				chart.setOption(option); 
				this.chartItem = chart;
			},
			
		}
	}
	
</script>