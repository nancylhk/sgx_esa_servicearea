<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">收入填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-search ml10 mt5 add-top-container ">
			<el-form :inline="true" label-width="142px" :model="addInfo" ref="addInfo"  class="demo-form-inline coop" :rules="rules" :inline-message="true">
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
						<el-form-item label="放假第几天" prop="whatDays">
							<el-select v-model="addInfo.whatDays" >
								<el-option v-for="(item,index) in dayOptions" 
								:key="index" 
								:label="item" 
								:value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="车流量" prop='vehicleFlow'>
							<input v-model="addInfo.vehicleFlow" class="queryIpt" />
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="节日" prop='festivalID'>
							<el-select v-model="addInfo.festivalID" >
								<el-option v-for="(item,index) in festivalOption" 
								:key="item.festivalCode" 
								:label="item.festivalName" 
								:value="item.festivalCode">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="汽柴销售量" prop='energyVolume'>
							<input v-model="addInfo.energyVolume" class="queryIpt" />
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="汽柴销售额" prop='energySales'>
							<input v-model="addInfo.energySales" class="queryIpt" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="餐饮小吃销售额" prop='restaurantSales'>
							<input v-model="addInfo.restaurantSales" class="queryIpt" />
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="超市、特色商店销售额" prop='marketSales'>
							<input v-model="addInfo.marketSales" class="queryIpt" />
						</el-form-item>
					</el-col>
				</el-row>	
				<el-form-item  class="center fright">
					<el-button type="success" @click="addEvent">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>交易月份</th>
						<th>填报节日</th>
						<th>放假第几天</th>
						<th>车流量</th>
                        <th>汽柴销售量</th>
                        <th>汽柴销售额</th>
                        <th>餐饮小吃销售量</th>
                        <th>超市、特色商店销售额</th>
						<th>填报日期</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList">
						<td>{{index+1}}</td>
						<td>{{info.tradeDate}}</td>
						<td>{{info.festivalName}}</td>
						<td>{{info.whatDays}}</td>
						<td>{{info.vehicleFlow}}</td>
						<td>{{info.energyVolume}}</td>
                        <td>{{info.energySales}}</td>
						<td>{{info.restaurantSales}}</td>
						<td>{{info.marketSales}}</td>
						<td>{{info.fillTime}}</td>
						<td>
							<a @click ="disableEvent(info.saleID)"  >删除</a>
						</td>
					</tr>
				</tbody>
			</table>

			<p v-show="tableDataList.length == 0" class="noDataTip">没有找到相关数据！</p>
		</div>
		
	</div>
</template>

<script>
	import validateRules from '../../../../utils/validate';
	export default {
		data() {
			return {
				addInfo:{
					tradeDate :  "",
                    festivalID : "",
                    energyVolume : "",
                    energySales : "",
                    restaurantSales : "",
                    marketSales : "",
					whatDays: "",
					vehicleFlow:'',
					taskId:this.$route.query.taskId,
				},
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				rules:{
					tradeDate:[{ required:true,message:'请选择交易日期',trigger: 'change' }],
					festivalID:[{ required:true,message:'请选择节日',trigger: 'change' }],
					energyVolume : [{required: true,message: '请输入销售额',trigger: 'blur'},
						{validator: validateRules.isNumber,trigger: 'blur',required: true}
					],
                    energySales : [{required: true,message: '请输入销售额',trigger: 'blur'},
						{validator: validateRules.isNumber,trigger: 'blur',required: true}
					],
                    restaurantSales :[{required: true,message: '请输入销售额',trigger: 'blur'},
						{validator: validateRules.isNumber,trigger: 'blur',required: true}
					],
                    marketSales : [{required: true,message: '请输入销售额',trigger: 'blur'},
						{validator: validateRules.isNumber,trigger: 'blur',required: true}
					],
					whatDays:[{required: true,message: '请选择放假第几天',trigger: 'change'}],
					vehicleFlow:[{required: true,message: '请输入车流量',trigger: 'blur'},
						{validator: validateRules.isInteger,trigger: 'blur',required: true}
					],
				},
				tableDataList:'',
				dayOptions:['放假前三天','放假前两天','放假前一天','放假第一天','放假第二天','放假第三天','放假第四天',
				'放假第五天','放假第六天','放假第七天','放假第八天','放假后一天','放假后两天','放假后三天'],
				festivalOption:[]

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
			this.getFestivals()
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			goBack() {
				this.$router.back(-1)
			},
			getFestivals() {
				let self = this;
				this.$http.get(this.api.getFestivals, {
					params: {
						accessToken: this.$store.state.user.token,						
					}
				},function(response){
					if(response.status == 200) {
						self.festivalOption = response.data;
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
						self.$http.post(self.api.addFestivalSaleInfo, params, {
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
						// self.$message.error('请正确填写添加项目')
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
					self.$http.get(self.api.delFestivalSaleInfo, {
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
								type: 'error',
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
				this.$http.get(this.api.getFestivalSaleInfo, {
					params: {
						accessToken: this.$store.state.user.token,			
						info:{
							taskId:this.$route.query.taskId,
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