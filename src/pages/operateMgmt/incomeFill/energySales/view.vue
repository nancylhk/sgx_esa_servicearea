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
						<th>品类</th>
						<th>店铺类型</th>
						<th>1月</th>
						<th>2月</th>
						<th>3月</th>
						<th>4月</th>
                        <th>5月</th>
						<th>6月</th>
						<th>7月</th>
						<th>8月</th>
                        <th>9月</th>
						<th>10月</th>
						<th>11月</th>
						<th>12月</th>
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList.EnergySaleInfoPreview">
						<td>{{index+1}}</td>
						<td>{{info.OIL_TYPE}}</td>
						<td>{{info.shopType}}</td>
                        <template v-for="sale in info.sale">
                            <td>{{sale}}</td>
                        </template>
					</tr>
                    <tr v-if="tableDataList.EnergySaleInfoPreview.length>0">
                        <td colspan="3">合计</td>
                        <td v-for="total in tableDataList.EnergySaleInfoByMonth">{{total}}</td>
                    </tr>
                    <tr v-if="tableDataList.EnergySaleInfoPreview.length>0">
                        <td colspan="3">汽、柴合计</td>
                        <td colspan="2">{{tableDataList.oilTotal}}</td>
						<td colspan="3">充电量合计</td>
                        <td colspan="2">{{tableDataList.elcTotal}}</td>
						<td colspan="3">加气量合计</td>
                        <td colspan="2">{{tableDataList.gasTotal}}</td>
                    </tr>
				</tbody>
			</table>

			<p v-show="tableDataList.EnergySaleInfoPreview.length == 0" class="noDataTip">没有找到相关数据！</p>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				tableDataList:  { 
					"EnergySaleInfoPreview":[],
        			"EnergySaleInfoByMonth":[],
        			"oilTotal":"0",
        			"gasTotal":"0",
        			"elcTotal":"0",
        			"total":"0"
				},
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
			getList() {
				let self = this;
				this.$http.get(this.api.getEnergySaleInfoPreview, {
					params: {
						accessToken: this.$store.state.user.token,		
						info:{
							taskTypeId:this.$route.query.taskTypeID,
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