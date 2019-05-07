<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">成本填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-search ml10 mt5">
			<el-form :inline="true" label-width="100px"  :model="addInfo" :rules="rules" ref="addInfo"  class="demo-form-inline coop">
				<el-form-item label="交易日期" prop="tradeDate">
					<el-date-picker
					v-model="addInfo.tradeDate"
					type="date"
					:picker-options="pickerOptions"
					value-format="yyyy-MM-dd"
					placeholder="交易日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="车型" prop='vehicleType'>
					<el-select v-model="addInfo.vehicleType" clearable>
						<el-option label="客车" value="客车"></el-option>
						<el-option label="货车" value="货车"></el-option>
					</el-select>
				</el-form-item>			
				<el-form-item label="一型车流量">
					<input v-model.number="addInfo.typeFlow1" class="queryIpt" />
				</el-form-item>
                <el-form-item label="二型车流量">
					<input v-model.number="addInfo.typeFlow2" class="queryIpt" />
				</el-form-item>
                <el-form-item label="三型车流量">
					<input v-model.number="addInfo.typeFlow3" class="queryIpt" />
				</el-form-item>
                <el-form-item label="四型车流量">
					<input v-model.number="addInfo.typeFlow4" class="queryIpt" />
				</el-form-item>
                <el-form-item label="五型车流量">
					<input v-model.number="addInfo.typeFlow5" class="queryIpt" />
				</el-form-item>
                <el-form-item label="六型车流量">
					<input v-model.number="addInfo.typeFlow6" class="queryIpt" />
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
						<th>车型</th>
						<th>一型</th>
						<th>二型</th>
						<th>三型</th>
						<th>四型</th>
                        <th>五型</th>
						<th>六型</th>
                        <th>填报时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList">
						<td>{{index+1}}</td>
						<td>{{info.tradeDate}}</td>
						<td>{{info.vehicleType=='1'?'客车':info.vehicleType=='2'?'货车':''}}</td>
						<td>{{info.typeFlow1}}</td>
						<td>{{info.typeFlow2}}</td>
                        <td>{{info.typeFlow3}}</td>
						<td>{{info.typeFlow4}}</td>
                        <td>{{info.typeFlow5}}</td>
						<td>{{info.typeFlow6}}</td>
                        <td>{{info.filledTime}}</td>
						<td>
							<a @click ="disableEvent(info.sectionFlowId)">删除</a>
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
					vehicleType: '',
					typeFlow1:'',
                    typeFlow2:'',
                    typeFlow3:'',
                    typeFlow4:'',
                    typeFlow5:'',
					typeFlow6:'',
					taskId:this.$route.query.taskId
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				rules:{
					tradeDate:[{ required:true,message:'',trigger: 'blur' }],
					vehicleType: [{ required:true,message:'',trigger: 'blur' }],
				},
				tableDataList:'',
				businessTypesOption:[],
				businessOption:[]

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
			addEvent() {			
				let self = this;
				this.$refs.addInfo.validate((valid) => {
					if (valid) {
						self.$http.get(self.api.addSectionVehicleFlowInfo, {
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
				this.$confirm('确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					var self = this;
					self.$http.get(self.api.deleteSectionFlowBySectionFlowId, {
						params: {
							accessToken: self.$store.state.user.token,
							sectionFlowId: ID,
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							})
							self.getList() ;
							self.getListCount();
						}else{
							self.$message({
								type: 'warning',
								message: '删除失败',
								duration: 2000
							})
						}
					},function(response){
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
				this.$http.get(this.api.getSectionVehicleFlowInfo, {
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