<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">成本填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-search ml10 mt5">
			<el-form :inline="true"  :model="addInfo" :rules="rules" ref="addInfo"  class="demo-form-inline coop">
				<el-form-item label="选择月份" prop='tradeDate'>
					<el-date-picker
					v-model="addInfo.tradeDate"
					type="date"
					:picker-options="pickerOptions"
					value-format="yyyy-MM-dd"
					placeholder="选择月份">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="支出类型" prop='paymentTypeID'>
					<el-select v-model="addInfo.paymentTypeID" clearable>
						<el-option v-for="(item,index) in businessTypesOption" 
						:key="item.typeCode" 
						:label="item.typeName" 
						:value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>			
				<el-form-item label="支出金额" prop='paymentAmount'>
					<input v-model="addInfo.paymentAmount" class="queryIpt" />
				</el-form-item>
                <el-form-item label="支出明细" prop='comment'>
					<el-input type="textarea" v-model="addInfo.comment"></el-input>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="addEvent">添加</el-button>
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
						return time.getTime() > Date.now();
					}
				},
				rules:{
					tradeDate:[{ required:true,message:'',trigger: 'blur' }],
					paymentTypeID: [{ required:true,message:'',trigger: 'blur' }],
					paymentAmount:[{ required:true,message:'',trigger: 'blur' }],
					comment:[{ required:true,message:'',trigger: 'blur' }],
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
						self.$message.error('带星号的为必填项')
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