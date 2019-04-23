<template>
	<div style="padding: 15px 15px 0 15px">
		<el-row :gutter="15">
			<el-col :span="20">
				<el-row :gutter="15">
					<el-col :span="6">
						<div class="indicators-item">
							<div class="indicators-circle circle1">
							</div>
							<p class="indicators-tit">营业额(万)</p>
							<div class="indicators-cont">
								<span class="indicators-date">昨日&nbsp;&nbsp;|&nbsp;&nbsp;今日</span>
								<p class="indicators-num"><span>{{businessNumber.yesterday}}</span> <em class="indicators-line">|</em><span>{{businessNumber.today}}</span> </p>
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="indicators-item">
							<div class="indicators-circle circle2"></div>
							<p class="indicators-tit">人流量</p>
							<div class="indicators-cont">
								<span class="indicators-date">昨日&nbsp;&nbsp;|&nbsp;&nbsp;今日</span>
								<p class="indicators-num"><span>{{personNumber.yesterday}}</span> <em class="indicators-line">|</em><span>{{personNumber.today}}</span> </p>
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="indicators-item">
							<div class="indicators-circle circle3"></div>
							<p class="indicators-tit">车流量</p>
							<div class="indicators-cont">
								<span class="indicators-date">昨日&nbsp;&nbsp;|&nbsp;&nbsp;今日</span>
								<p class="indicators-num"><span>{{carNumber.yesterday}}</span> <em class="indicators-line">|</em><span>{{carNumber.today}}</span> </p>
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="indicators-item">
							<div class="indicators-circle circle4"></div>
							<p class="indicators-tit">数量</p>
							<div class="indicators-cont">
								<span class="indicators-date">商超&nbsp;&nbsp;|&nbsp;&nbsp; 餐厅</span>
								<p class="indicators-num"><span>{{marketNumber}}</span> <em class="indicators-line">|</em><span>{{restaurantNumber}}</span> </p>
							</div>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="15" style="margin-top:15px;">
					<el-col :span="24">
						<lineComp class="chart-container" ref="incomeTrendChart" :_id="'incomeTrend'" :_titleText="'服务区收入趋势图(万)'" :_chartData="incomeTrendData">
						</lineComp>
					</el-col>

				</el-row>
				<el-row :gutter="15" style="margin-top:15px;">
					<el-col :span="6">
						<section class="section-sty">
							<h5 class="lh32">产品营业额占比</h5>
							<pieComp class="product-rate" ref="commodityRangeChart" :_id="'commodityRange'" :_chartData="commodityRange" :_colorList="colorList">
							</pieComp>
						</section>
					</el-col>
					<el-col :span="12">
						<section class="section-sty">
							<h5 class="lh32">年度完成情况</h5>
							<div class="year-situation-item">
								<p class="year-situation-tit">年度支出</p>
								<ringComp class="ring-income" ref="yearOutcomeChart" :_id="'yearOutcome'" :_chartData="yearPercent.outcome" :_color="'#47bde3'">
								</ringComp>
								<p class="year-situation-sum"><em class="total-circle"></em><span>总 {{yearData.outcomeTarget}}</span></p>
								<p class="year-situation-sum"><em class="blue-circle"></em><span>已{{yearData.outcome}}</span></p>
							</div>
							<div class="year-situation-item ml5p">
								<p class="year-situation-tit">年度收入</p>
								<ringComp class="ring-income" ref="yeariIncomeChart" :_id="'yearIncome'" :_chartData="yearPercent.income" :_color="'#43d154'">
								</ringComp>
								<p class="year-situation-sum"><em class="total-circle"></em><span>总&nbsp;{{yearData.incomeTarget}}</span></p>
								<p class="year-situation-sum"><em class="green-circle"></em><span>已&nbsp;{{yearData.income}}</span></p>
							</div>
							<div class="year-situation-item ml5p">
								<p class="year-situation-tit">年度盈利</p>
								<ringComp class="ring-income" ref="yearOutcomeChart" :_id="'yearProfit'" :_chartData="yearPercent.profit" :_color="'#ffd447'">
								</ringComp>
								<p class="year-situation-sum"><em class="total-circle"></em><span>总&nbsp;{{yearData.profitTarget}}</span></p>
								<p class="year-situation-sum"><em class="yellow-circle"></em><span>已&nbsp;{{yearData.profit}}</span></p>
							</div>
						</section>
					</el-col>
					<el-col :span="6">
						<section class="section-sty">
							<h5 class="lh32">畅销商品TOP5
								<span class="right sellSort">
									<!--<a :class="{ 'gray': sellRank == 'num'}" @click="sellRank = 'num'">销量</a>|-->
									<a :class="{ 'gray': sellRank == 'money'}" @click="sellRank = 'money'">销售额</a>
								</span>
							</h5>
							<div class="pd10-3">
								<section v-for="(item,index) in bestSellsByNum" class="mt15" v-show="sellRank == 'num'">
									<p class="best-sell-tit">{{index+1}} {{item.commodityName}} {{item.income}} {{item.specificationName}}</p>
									<el-progress :show-text="false" :stroke-width="6" :percentage="item.rate"></el-progress>
								</section>
								<section v-for="(item,index) in bestSellsByMoney" class="mt15"  v-show="sellRank == 'money'">
									<p class="best-sell-tit">{{index+1}} {{item.commodityName}} {{item.income}} {{item.specificationName}}</p>
									<el-progress :show-text="false" :stroke-width="6" :percentage="item.rate"></el-progress>
								</section>
							</div>
						</section>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="4">
				<Sidebar />
			</el-col>
		</el-row>
	</div>
	
</template>

<script>
	import { mapGetters } from 'vuex';
	import Sidebar from '../common/Sidebar';
	import lineComp from '../../components/charts/LineComp.vue';
	import ringComp from '../../components/charts/RingComp.vue';
	import pieComp from '../../components/charts/PieComp.vue'
	export default {
		data() {
			return {
				businessNumber: '',
				personNumber: '',
				newMsgNum: '',
				carNumber: '',
				marketNumber: '',
				restaurantNumber: '',
				incomeTrendData: [],
				commodityRange: [], //{"name":"商超","value":10},{"name":"餐厅","value":10},{"name":"加油站","value":10},{"name":"汽修","value":10}
				yearData: {},
				bestSellsByNum: '',
				bestSellsByMoney:'',
				colorList: ['#b898ee', '#ffd447', '#7bdad4', '#47bde3'],
				sellRank:'money',
				yearPercent: {
					outcome:0,
					income:0,
					profit:0
				},
				todoCount:''
			}
		},
		computed: {
			...mapGetters([
				'sidebar',
			])
		},
		components: {
			Sidebar,
			lineComp,
			ringComp,
			pieComp
		},
		created() {
			let self = this;
			//营业额
			this.$http.get(this.api.getTodayBusinessNumber, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.businessNumber = response.data;
				}
			},function(response){
                //失败回调
            })

			//人流量
			this.$http.get(this.api.getCurrentPersonNumber, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.personNumber = response.data;
				}
			},function(response){
                //失败回调
            })
			
			//车流量
			this.$http.get(this.api.getCurrentCarNumber, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.carNumber = response.data;
				}
			},function(response){
                //失败回调
            })

			//商超数量
			this.$http.get(this.api.getMarketNumber, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.marketNumber = response.data;
				}
			},function(response){
                //失败回调
            })
			
			//餐厅数量
			this.$http.get(this.api.getRestaurantNumber, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.restaurantNumber = response.data;
				}
			},function(response){
                //失败回调
            })
			
			//收入趋势
			this.$http.get(this.api.getIncomeTrend,
			{
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.incomeTrendData = response.data;
				}
			},function(response){
                //失败回调
            })
			
			//产品营业占比
			this.$http.get(this.api.getCommodityRange, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.commodityRange = response.data;
				}
			},function(response){
                //失败回调
            })

			//年度目标
			this.$http.get(this.api.getYearTarget,
			{
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.yearData = response.data;
					self.yearPercent.outcome = self.yearData.outcome <= 0 ? 0 : parseInt(self.yearData.outcome / self.yearData.outcomeTarget * 100);
					self.yearPercent.income = self.yearData.income <= 0 ? 0 : parseInt(self.yearData.income / self.yearData.incomeTarget * 100);
					self.yearPercent.profit = self.yearData.profit <= 0 ? 0 : parseInt(self.yearData.profit / self.yearData.profitTarget * 100);
				}
			},function(response){
                //失败回调
            })
						
			//畅销产品-销售额
			this.$http.get(this.api.getTopSaleMoneyCommodityInfo,
			{
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.bestSellsByMoney = response.data;
				}
			},function(response){
                //失败回调
            })
			
			//畅销产品-数量
			this.$http.get(this.api.getTopSaleNumCommodityInfo,
			{
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.bestSellsByNum = response.datas;
				}
			},function(response){
                //失败回调
            })
		},
		methods: {
			resize: function() {
				this.$refs.incomeTrendChart.chartItem.resize();
			}
        },
        mounted () {
            const that = this
            window.onresize = () => {
            	that.resize();
            }
        }

	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.indicators-item {
		height: 110px;
		background: #fff;
		border-radius: 3px;
		box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
	}
	.pd10-3{
		padding: 10px 3px;
	}
	.chart-container {
		width: 100%;
		height: 360px;
		box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
	}
	
	.indicators-circle {
		width: 30%;
		height: 100%;
		float: left;
		display: inline-block;
		background-repeat: no-repeat;
		background-position: center;
		vertical-align: top;
	}
	
	.indicators-tit {
		line-height: 35px;
		font-size: 16px;
		color: #666;
		position: relative;
		left: 15px;
		top: 7px;
	}
	
	.indicators-cont {
		display: inline-block;
		float: right;
		position: relative;
		right: 20px;
		top: 5px;
		.indicators-date {
			display: inline-block;
			width: 100%;
			height: 30px;
			text-align: right;
			font-size: 14px;
			color: #999;
		}
		.indicators-num {
			font-size: 20px;
			text-align: right;
			span {
				font-weight: bold;
			}
		}
		.indicators-line {
			font-size: 16px;
			color: #eee;
			padding: 0 5px;
			position: relative;
			bottom: 3px;
		}
	}
	
	.circle1 {
		background-color: #6bc8be;
		background-image: url(../../assets/images/turnover.png);
	}
	
	.circle2 {
		background-color: #b198dc;
		background-image: url(../../assets/images/human-traffic.png);
	}
	
	.circle3 {
		background-color: #47bde3;
		background-image: url(../../assets/images/car-traffic.png);
	}
	
	.circle4 {
		background-color: #ffc300;
		background-image: url(../../assets/images/store.png);
	}
	
	.section-sty {
		width: 100%;
		height: 380px;
		box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
		background: #fff;
		padding: 10px 20px;
	}
	.sellSort{
		a{
			color:#999;
			padding:0 2px;
			cursor: pointer;
		}
		.gray{
			color: #0099CC;
		}
	}
	.year-situation-item {
		display: inline-block;
		width: 28%;
		height: 80%;
		margin-top: 35px;
		margin-left: 2%;
	}
	
	.ml5p {
		margin-left: 5%;
	}
	
	.product-rate {
		width: 90%;
		height: 90%;
		margin-left: 5%;
	}
	
	.year-situation-tit {
		text-align: center;
		color: #666;
		line-height: 28px;
	}
	
	.year-situation-sum {
		margin-left: 23%;
		color: #999;
		line-height: 24px;
		em {
			display: inline-block;
			width: 10px;
			height: 10px;
			border-radius: 5px;
		}
		span {
			margin-left: 10px;
		}
		.total-circle {
			background: #eee;
		}
		.blue-circle {
			background: #47bde3;
		}
		.green-circle {
			background: #43d154;
		}
		.yellow-circle {
			background: #ffd447;
		}
	}
	
	.ring-income {
		width: 100%;
		height: 70%;
	}
	
	.el-progress-bar__outer {
		background-color: #f7f7f7;
	}
	
	.el-progress-bar__inner {
		background-color: #47bde3;
	}
	
	.best-sell-tit {
		color: #666;
		line-height: 35px;
	}
</style>