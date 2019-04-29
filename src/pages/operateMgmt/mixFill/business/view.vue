<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">成本填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-main mt20" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>商户名称</th>
						<th>合作形式</th>
						<th>年增长率</th>
						<th>第1年租金或平均租金</th>
						<th>合同期总租金</th>
						<th>保底额</th>
                        <th>提成比例或金额</th>
						<th>提成比例或金额2</th>
						<th>提成比例或金额3</th>
						<th>合作年限</th>
                        <th>合同合作期</th>
						<th>上半年履约评价得分</th>
						<th>下半年履约评价得分</th>	
						<th>填报时间</th>				
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList">
						<td>{{index+1}}</td>
						<td>{{info.shopName}}</td>
						<td>{{info.cooperationTypeID}}</td>
                        <td>{{info.annualGrowth}}</td>
						<td>{{info.averageRent}}</td>
                        <td>{{info.totalRent}}</td>
						<td>{{info.guaranteeAmount}}</td>
                        <td>{{info.rentRate1}}</td>
						<td>{{info.rentRate2}}</td>
                        <td>{{info.rentRate3}}</td>
						<td>{{info.contractYear}}</td>
                        <td>{{info.contractPeriod}}</td>
						<td>{{info.firstHalfYearPoint}}</td>
                        <td>{{info.secondHalfYearPoint}}</td>
                        <td>{{info.filledTime}}</td>
					</tr>
				</tbody>
			</table>

			<p v-show="tableDataList.length == 0" class="noDataTip">没有找到相关数据！</p>
		</div>
		<div class="upLoadBox" v-if="barId==13">
			<el-button class="upload" type="primary" @click="report">上&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</el-button>
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
				this.$http.get(this.api.getCooperationInfoPreview, {
					params: {
						accessToken: this.$store.state.user.token,
                        taskTypeID:this.$route.query.taskTypeID
                    }
				},function(response){
					console.log(response)
					if(response.status == 200) {
						self.tableDataList = response.data.shopCooperations;
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