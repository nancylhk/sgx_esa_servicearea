<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">成本填报</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-search ml10 mt5">
			<el-form  :inline="true" :model="addInfo" :rules="rules" ref="addInfo"  class="demo-form-inline coop" label-width="140px" >		
				<el-form-item label="商户名称" prop='shopName'>
					<input v-model.number="addInfo.shopName" class="queryIpt" />
				</el-form-item>
                <el-form-item label="合作形式" prop='cooperationTypeID'>
					<input v-model.number="addInfo.cooperationTypeID" class="queryIpt" />
				</el-form-item>
                <el-form-item label="年增长率或年增长额" prop='annualGrowth'>
					<input v-model.number="addInfo.annualGrowth" class="queryIpt" />
				</el-form-item>
                <el-form-item label="第一年租金或平均租金" prop='averageRent'>
					<input v-model.number="addInfo.averageRent" class="queryIpt" />
				</el-form-item>
                <el-form-item label="合同期总租金" prop='totalRent'>
					<input v-model.number="addInfo.totalRent" class="queryIpt" />
				</el-form-item>
                <el-form-item label="保底额" prop='guaranteeAmount'>
					<input v-model="addInfo.guaranteeAmount" class="queryIpt" />
				</el-form-item>
                <el-form-item label="提成比例或金额" prop="rentRate1">
					<input v-model.number="addInfo.rentRate1" class="queryIpt" />
				</el-form-item>
                <el-form-item label="提成比例或金额2" prop="rentRate2">
					<input v-model.number="addInfo.rentRate2" class="queryIpt" />
				</el-form-item>
                <el-form-item label="提成比例或金额3" prop="rentRate3">
					<input v-model="addInfo.rentRate3" class="queryIpt" />
				</el-form-item>
                <el-form-item label="合作年限" prop='contractYear'>
					<input v-model.number="addInfo.contractYear" class="queryIpt" />
				</el-form-item>
                <el-form-item label="合同合作期" prop="contractPeriod">
					<input v-model.number="addInfo.contractPeriod" class="queryIpt" />
				</el-form-item>
                <el-form-item label="上半年履约评分得分" prop="firstHalfYearPoint">
					<input v-model="addInfo.firstHalfYearPoint" class="queryIpt" />
				</el-form-item>
                <el-form-item label="下半年履约评分得分" prop="secondHalfYearPoint">
					<input v-model="addInfo.secondHalfYearPoint" class="queryIpt" />
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
						<th>商户名称</th>
						<th>合作形式</th>
						<th>年增长率</th>
                        <th>第一年租金或平均租金</th>
						<th>合同期总租金</th>
                        <th>保底额</th>
                        <th>提成比例或金额</th>
                        <th>合作年限</th>
						<th>合同合作期</th>
						<th>上半年履约评价得分</th>
                        <th>下半年履约评价得分</th>
                        <th>填报时间</th>
						<th>操作</th>
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
						<td>{{info.contractYear}}</td>
                        <td>{{info.contractPeriod}}</td>
                        <td>{{info.firstHalfYearPoint}}</td>
						<td>{{info.secondHalfYearPoint}}</td>
                        <td>{{info.filledTime}}</td>
						<td>
							<a @click ="disableEvent(info.cooperationID)">删除</a>
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
					shopName: "",
                    cooperationTypeID:"",
                    annualGrowth:"",
                    averageRent:"",
                    totalRent:"",
                    guaranteeAmount:"",
                    rentRate1:"",
                    rentRate2:"",
                    rentRate3:"",
                    contractYear:"",
                    contractPeriod :"",
                    firstHalfYearPoint:"",
                    secondHalfYearPoint:""
				},
				rules:{
                    shopName: [{ required: true, message: '', trigger: 'blur' }],
                    cooperationTypeID:[{ required: true, message: '', trigger: 'blur' }],
                    contractYear:[{ required: true, message: '', trigger: 'blur' }],
                    contractPeriod :[{ required: true, message: '', trigger: 'blur' }],
                    firstHalfYearPoint:[{ required: true, message: '', trigger: 'blur' }],
                    secondHalfYearPoint:[{ required: true, message: '', trigger: 'blur' }],
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
			// this.getList();
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
                        let params = new FormData()
                        params.append('accessToken', self.$store.state.user.token);
                        params.append('info', JSON.stringify(self.addInfo));
                        self.$http.post(self.api.addCooperationInfo, params, {
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
					self.$http.get(self.api.disableOutcomeInfo, {
						params: {
							accessToken: self.$store.state.user.token,
							outcomeId: ID,
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
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getCooperationInfo, {
					params: {
						accessToken: this.$store.state.user.token,
						taskID:'',					
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
    .coop .el-form-item__error{
        display: none;
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