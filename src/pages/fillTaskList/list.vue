<template>
	<div class="app-container">		
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span @click="goBack()" class="cp">填报情况</span>
			<span><em class="next-arrow"></em>{{nowPath}}</span>
		</h5>		
		<div class="app-search  mt5 add-top-container">
			<el-form :inline="true" label-width="80px"  ref="addInfo"  class="demo-form-inline coop" >			
                <el-form-item label="任务名称">
                    <el-select v-model="taskId" clearable >
                        <el-option v-for="(item,index) in tableDataList" 
                        :key="item.taskId" 
                        :label="item.taskTypeName" 
                        :value="item.taskId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否完成" >
                    <el-select v-model="isFilledIn" clearable>
                        <el-option v-for="(item,index) in fillOrNo" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="searchTvenet()">查询</el-button>
                </el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>任务名称</th>
						<th>开始时间</th>
						<th>结束时间</th>
						<th>是否完成</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody class="scrollTabContent">
					<tr v-for="(info,index) in tableDataList">
						<td>{{index+1}}</td>
						<td>{{info.taskTypeName}}</td>
						<td>{{info.beginTime}}</td>
						<td>{{info.endTime}}</td>
						<td>{{info.isFilledIn=='0'?'未完成':'已完成'}}</td>
						<td>
							<router-link  :to="{path:info.fillLink,query: {barId:'03',taskTypeID:info.taskTypeId,taskId:info.taskId}}" v-if="info.isFilledIn=='0'">
                                填报
                            </router-link>
							<span v-if="info.isFilledIn=='1'">已上报</span>
						</td>
					</tr>
				</tbody>
			</table>

			<p v-show="tableDataList.length == 0" class="noDataTip">没有找到相关数据！</p>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {	
				tableDataList:'',
                isFilledIn:'',
                taskId:'',
                fillOrNo:[
                    {value: '0', label: '未完成'},
                    {value: '1', label: '已完成'},
                ]
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
			searchTvenet() {
                this.getList()
            },
			getList() {
				let self = this;
				this.$http.get(this.api.getFilledTaskList, {
					params: {			
						accessToken: this.$store.state.user.token,
                        taskId:self.taskId,
                        isFilledIn:self.isFilledIn				
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
		background: url(../../assets/images/next.png) no-repeat;
		vertical-align: middle;
		margin: 0 5px;
	}
</style>