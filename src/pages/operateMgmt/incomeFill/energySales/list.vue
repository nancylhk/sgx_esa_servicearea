<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">收入填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-search ml10 mt5">
			<el-form :inline="true" :model="addInfo" ref="addInfo"  class="demo-form-inline coop" :rules="rules">
				<el-form-item label="交易日期" prop='tradeDate'>
					<el-date-picker
					v-model="addInfo.tradeDate"
					type="date"
					:picker-options="pickerOptions"
					value-format="yyyy-MM-dd"
					placeholder="交易日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="品名" prop='oilType'>
					<el-select v-model="addInfo.oilType" clearable>
						<el-option v-for="(item,index) in oilTypesOption" 
						:key="item.energyTypeId" 
						:label="item.energyName" 
						:value="item.energyTypeId"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商户类型" prop="shopType">
					<el-select v-model="addInfo.shopType" clearable>
						<el-option v-for="(item,index) in businessTypesOption" 
						:key="item.shopTypeCode" 
						:label="item.shopTypeName" 
						:value="item.shopTypeCode"
						v-if="item.shopTypeParentId=='2'">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="销售量" prop='saleVolume'>
					<input v-model="addInfo.saleVolume" class="queryIpt" />
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="addEvent">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>交易日期</th>
						<th>品名</th>
						<th>商铺类型</th>
						<th>销售量</th>
						<th>填报日期</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList">
						<td>{{index+1}}</td>
						<td>{{info.tradeDate}}</td>
						<td>{{info.oilType}}</td>
						<td>{{info.shopType}}</td>
						<td>{{info.amount}}</td>
						<td>{{info.filledTime}}</td>
						<td>
							<a @click ="disableEvent(info.saleID)"  v-if="!info.filledTime">删除</a>
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
					shopType: '',
					oilType:'',
					saleVolume:'',
					taskId:this.$route.query.typeId,
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				oilTypesOption:[],
				rules:{
					tradeDate:[{ required:true,message:'',trigger: 'blur' }],
					shopType: [{ required:true,message:'',trigger: 'blur' }],
					oilType:[{ required:true,message:'',trigger: 'blur' }],
					saleVolume: [{
							required: true,
							message: '请输入销售额',
							trigger: 'blur'
						},
						{
							validator: validateRules.isNumber,
							trigger: 'blur',
							required: true,
						}
					],
				},
				tableDataList:'',
				businessTypesOption:[]

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
			this.getShopType();
			this.getEnergyType();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			goBack() {
				this.$router.back(-1)
			},
			getEnergyType() {
				let self = this;
				this.$http.get(this.api.getEnergyType, {
					params: {
						accessToken: this.$store.state.user.token,					
					}
				},function(response){
					if(response.status == 200) {
						self.oilTypesOption = response.data;
					}
				},function(response){
	                //失败回调
	            })
				
			},
			getShopType() {
				let self = this;
				this.$http.get(this.api.getShopType, {
					params: {
						accessToken: this.$store.state.user.token,						
					}
				},function(response){
					if(response.status == 200) {
						self.businessTypesOption = response.data.shopTypes;
					}
				},function(response){
	                //失败回调
	            })
				
			},
			addEvent() {			
				let self = this;
				this.$refs.addInfo.validate((valid) => {
					if (valid) {
						let params = new FormData()
						params.append('accessToken', self.$store.state.user.token);
						params.append('info', JSON.stringify(self.addInfo));
						self.$http.post(self.api.addEnergySaleInfo, params, {
							headers: {
								//'Content-type': 'application/x-www-form-urlencoded'
								"Content-Type": "multipart/form-data"
							},
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
						self.$message.error('请正确填写添加项目')
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
					self.$http.get(self.api.delEnergySaleInfo, {
						params: {
							accessToken: self.$store.state.user.token,
							info:{
								saleId: ID
							}
							
						}
					},function(response){
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							})
							self.getList() ;
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
				this.$http.get(this.api.getEnergySaleInfo, {
					params: {
						accessToken: this.$store.state.user.token,			
						info:{
							taskId:this.$route.query.typeId,
						}					
					}
				},function(response){
					if(response.status == 200) {
						self.tableDataList = response.data;
					}
				},function(response){
	                //失败回调
	            })
				
			}
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