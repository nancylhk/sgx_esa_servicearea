<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">收入填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-main mt20" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>销售月份</th>
						<th>节日</th>
						<th>放假第几天</th>
						<th>车流量</th>
						<th>汽柴销售量</th>
						<th>餐饮小吃销售量</th>
                        <th>超市、特色商店销售量</th>
						<th>填报日期</th>
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList">
						<td>{{index+1}}</td>
						<td>{{info.tradeDate}}</td>
						<td>{{info.festivalName}}</td>
                        <td>{{info.whatDays}}</td>
						<td></td>
                        <td>{{info.energyVolume}}</td>
						<td>{{info.restaurantSales}}</td>
                        <td>{{info.marketSales}}</td>
						<td>{{info.fillTime}}</td>
					</tr>
                    <!-- <tr>
                        <td colspan="3">合计</td>
                        <td v-for="total in tableDataList.monthlyTotal">{{total}}</td>
                    </tr>
                    <tr>
                        <td colspan="3">综合</td>
                        <td colspan="12">{{tableDataList.total}}</td>
                    </tr> -->
				</tbody>
			</table>

			<p v-show="tableDataList.length == 0" class="noDataTip">没有找到相关数据！</p>
		</div>
		<div class="upLoadBox" v-if="barId==13">
			<el-button class="upload" type="primary" @click="report()">上&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</el-button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				tableDataList:'',
				barId:this.$route.query.barId

			}
		},
		computed:{
			nowPath() {
				return this.$route.name
			}
		},
		created() {
			
		},
		mounted() {
			this.getList();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			goBack() {
				this.$router.back(-1)
			},
			report() {    
				let self = this; 
				let taskID = this.$route.query.typeId;    
				this.$http.get(this.api.getTaskProgress, {
					params: {
						accessToken: this.$store.state.user.token, 
						taskID:taskID                					
					}
				},function(response){
					if(response.status == 200) {
						if(response.data){
							self.$message.success('上报成功')
						}else{
							self.$message.error('上报失败')
						}
					}
				},function(response){
					//失败回调
				})
			},		
			getList() {
				let self = this;
				this.$http.get(this.api.getFestivalSaleInfoPreview, {
					params: {
						accessToken: this.$store.state.user.token,		
						info:{
							incomeType:1,
						}	//income表的typeId			
					}
				},function(response){
					if(response.status == 200) {
						self.tableDataList = response.data;
					}
				},function(response){
	                //失败回调
	            })
				
			},
		},

	}
</script>

<style lang='scss'>
	.app-main {
		.el-button--text {
			border: none;
			color: #0099cc;
		}
	}
	.next-arrow {
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(../../../../assets/images/next.png) no-repeat;
		vertical-align: middle;
		margin: 0 5px;
	}
</style>