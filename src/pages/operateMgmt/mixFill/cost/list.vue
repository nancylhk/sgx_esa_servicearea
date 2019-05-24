<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">成本填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-search  mt5 add-top-container">
			<el-form :inline="true" label-width="80px"  :model="addInfo" :rules="rules" ref="addInfo"  class="demo-form-inline coop" :inline-message="true">
				<el-row>
					<el-col :span="10">
						<el-form-item label="交易日期" prop='tradeDate'>
							<el-date-picker
							v-model="addInfo.tradeDate"
							type="date"
							:picker-options="pickerOptions"
							value-format="yyyy-MM-dd"
							placeholder="交易日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="支出类型" prop='paymentTypeID'>
							<el-select v-model="addInfo.paymentTypeID" clearable>
								<el-option v-for="(item,index) in businessTypesOption" 
								:key="item.typeCode" 
								:label="item.typeName" 
								:value="item.typeCode">
								</el-option>
							</el-select>
						</el-form-item>	
					</el-col>
					
				</el-row>
				<el-row>
					<el-col :span="10">		
						<el-form-item label="支出金额" prop='paymentAmount'>
							<input v-model="addInfo.paymentAmount" class="queryIpt" />
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="支出明细" prop='comment'>
							<el-input type="textarea" v-model="addInfo.comment"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item  class="center fright">
					<el-button type="success" @click="addEvent">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main mt20" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>交易月份</th>
						<th>支出类型</th>
						<th>支出金额</th>
						<th>填报日期</th>
						<th>成本明细</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList">
						<td>{{index+1}}</td>
						<td>{{info.tradeDate}}</td>
						<td>{{info.paymentTypeId}}</td>
						<td>{{info.paymentAmount}}</td>
						<td>{{info.filledTime}}</td>
						<td>{{info.comment}}</td>
						<td>
							<a @click ="disableEvent(info.paymentId)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>

			<p v-show="tableDataList.length == 0" class="noDataTip">没有找到相关数据！</p>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import validateRules from '../../../../utils/validate';
	export default {
		data() {
			return {
				addInfo:{
					tradeDate:'',
					paymentTypeID: '',
					paymentAmount:'',
					comment:'',
					taskId:this.$route.query.taskId
				},
				pickerOptions: {
					disabledDate(time) {
						// 上个月的第一天和最后一天
						var nowdays = new Date();
						var year = nowdays.getFullYear();
						var month = nowdays.getMonth();
						var nowdate = nowdays.getDate();
						if(month==0)
						{
							month=12;
							year=year-1;
						}
						if (month < 10) {
							month = "0" + month;
						}
						var firstDay = year + "-" + month + "-" + "01";//上个月的第一天	
						var myDate = new Date(year, month, 0);
						var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
						
						let curDate = (new Date()).getTime();
            			let onemonth = myDate.getDate() * 24 * 3600 * 1000;//上一个月的毫秒数
						let thisMonthAgo = nowdate * 24 * 3600 * 1000;//这个月初到现在经过的毫秒数
						let maxTime = curDate - thisMonthAgo;
						let minTime = curDate - thisMonthAgo - onemonth;
						return time.getTime() > maxTime || time.getTime() < minTime;
					}
				},
				rules:{
					tradeDate:[{ required:true,message:'请选择交易日期',trigger: 'change' }],
					paymentTypeID: [{ required:true,message:'请选择支付类型',trigger: 'change' }],
					paymentAmount:[{ required:true,validator: validateRules.isNumber,trigger: 'blur'}],
					comment:[{ required:true,message:'请填写支出明细',trigger: 'blur' }],
				},
				tableDataList:'',
				businessTypesOption:[],

			}
		},
		computed:{
			nowPath() {
				return this.$route.name
			}
		},
		created() {
			var nowdays = new Date();
			var year = nowdays.getFullYear();
			var month = nowdays.getMonth();
			var nowdate = nowdays.getDate();
			if(month==0)
			{
				month=12;
				year=year-1;
			}
			if (month < 10) {
				month = "0" + month;
			}
			var firstDayOfPreMonth = year + "-" + month + "-" + "01";//上个月的第一天
			this.addInfo.tradeDate =firstDayOfPreMonth;
		},
		mounted() {
			this.getList();
			this.getPaymentType()
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			goBack() {
				this.$router.back(-1)
			},
			getPaymentType() {
				let self = this;
				this.$http.get(this.api.getPaymentType, {
					params: {
						accessToken: this.$store.state.user.token,
						taskID:this.$route.query.taskId,					
					}
				},function(response){
					if(response.status == 200) {
						self.businessTypesOption = response.data.paymentTypes;
					}
				},function(response){
	                //失败回调
	            })
			},
			addEvent() {			
				let self = this;
				this.$refs.addInfo.validate((valid) => {
					if (valid) {
						self.addInfo.paymentAmount = parseInt(self.addInfo.paymentAmount);				
						self.$http.get(self.api.addPaymentInfo, {
							params:{
								accessToken:self.$store.state.user.token,
								info:self.addInfo,
								
							}
						}, function(response) {
							if(response.data) {
								self.$message({
									type: 'success',
									message: '新增成功',
									duration: 2000
								});
								self.getList()
								self.$refs.addInfo.resetFields();
							} else {
								self.$message({
									type: 'error',
									message: '新增失败',
									duration: 2000
								});
							}
						}, function(response) {
							//失败回调
						})
					} else {
						// self.$message.error('带星号的为必填项')
						return false;
					}
				});
				
			},
			disableEvent(ID) {
				let self = this;
				this.$confirm('确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					self.$http.get(self.api.deletePaymentInfoByPaymentId, {
						params:{
							accessToken:self.$store.state.user.token,
							paymentId:ID
						}
					}, function(response) {
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							});
							self.getList()
						} else {
							self.$message({
								type: 'error',
								message: '删除失败',
								duration: 2000
							});
						}
					}, function(response) {
						//失败回调
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
						duration: 2000
					});
				});
			},
			getList() {
				let self = this;
				this.$http.get(this.api.getPaymentInfo, {
					params: {
						accessToken: this.$store.state.user.token,
						taskID:this.$route.query.taskId,					
					}
				},function(response){
					if(response.status == 200) {
						self.tableDataList = response.data
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