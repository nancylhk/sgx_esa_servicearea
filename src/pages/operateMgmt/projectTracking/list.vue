<template>
    <div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>{{nowPath}}</span>
			
		</h5>
		<div class="app-search ml10 mt5">
			<el-form :inline="true"  class="demo-form-inline">
				<el-form-item label="项目名">
						<input v-model="name" class="queryIpt" />						
				</el-form-item>            
				<el-form-item label="项目类型">
					<el-select v-model="type"  clearable>
						<el-option :label="item.projectName" :value="item.projectID" :key="item.projectID" v-for='item in projectList'></el-option>						
					</el-select>
				</el-form-item>
                <el-form-item label="是否完成">
					<el-select v-model="isCompleted"  clearable>
						<el-option label="商超" value="sc"></el-option>
						<el-option label="餐厅" value="ct"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="addEvent">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>项目名称</th>
						<th>项目开始时间</th>
						<th>项目进度</th>
						<th>投资金额</th>
                        <th>是否完成</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in tableData">
						<td>{{index+1}}</td>
						<td>{{info.projectName}}</td>
						<td>{{info.beginTime}}</td>
                        <td>进度</td>
						<td>{{info.investment}}元</td>
						<td>{{info.isFinishi}}</td>
						<td>
							<a @click ="viewEvent(info.sellId)">查看</a>
                            <a @click ="updateEvent(info.sellId)">修改</a>
							<a @click ="deleteEvent(info.sellId)">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
			<p v-show="total == 0" class="noDataTip">没有找到相关数据！</p>
			<footer v-show="total > 0">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</footer>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            name:'',
            type:'',
            isCompleted:'',
            tableData:[],
            currentPage: 1,
            pageSize: 10,
            beginRow:'',
            endRow:'',
            total:-1,
            projectList:[],
            
        }
    },
    computed:{
        nowPath() {
            return this.$route.name
        }
    },
    mounted() {
        this.getList();
        this.getProjectType()
        this.getListCount()
    },
    methods:{
        getProjectType() {        
            var self = this;
            this.$http.get(this.api.getProjectTypeList,{
                params: {
                    accessToken: self.$store.state.user.token
                }
            },function(response){
                if(response.status == 200) {
                   self.projectList = response.data
                }
            },function(response){})
        },
        getList(){
            var self = this;
            self.beginRow = self.pageSize * (self.currentPage-1)+1;
			self.endRow = self.currentPage * self.pageSize;
            let info = {};
            info.projectName = self.name;
            if(self.type == null) {
                info.projectTypeID = '';
            }else{
                info.projectTypeID = self.type;
            }
            
            info.isFinishi = self.isCompleted;
            this.$http.get(this.api.getMajorProjectInfoList,{
                params: {
                    accessToken: self.$store.state.user.token,
                    info:info,
                    beginRow: self.beginRow,
					endRow: self.endRow,
                }
            },function(response){
                if(response.status == 200) {
                    self.tableData = response.data;
                }
            },function(response){})
        },
        getListCount() {
            var self = this;
            let info = {};
            info.projectName = self.name;
            if(self.type == null) {
                info.projectTypeID = '';
            }else{
                info.projectTypeID = self.type;
            }
            info.isFinishi = self.isCompleted;
            this.$http.get(this.api.getMajorProjectInfoList,{
                params: {
                    accessToken: self.$store.state.user.token,
                    info:info,
                }
            },function(response){
                if(response.status == 200) {
                    self.total = response.data.length;
                }
            },function(response){})
        },
        searchEvent() {
            this.getList();
			this.getListCount();
        },
        addEvent() {
            this.$router.push({
                path:"/operateMgmt/projectAdd"
            })
        },
        viewEvent(id) {
            this.$router.push({
                path:`/operateMgmt/projectDetail/${id}`
            })
        },
        updateEvent(id) {
            this.$router.push({
                path:`/operateMgmt/projectUpdate/${id}`
            })
        },
        deleteEvent(id) {
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                var self = this;
                self.$http.get(self.api.deleteOtherInfrastructure, {
                    params: {
                        accessToken: self.$store.state.user.token,
                        InfrastructureID: ID,
                    }
                },function(response){
                    if(response.data) {
                        self.$message({
                            type: 'success',
                            message: '删除成功',
                            duration: 2000
                        });
                        self.getList() ;
                        self.getListCount();
                    }else{
                        self.$message({
                            type: 'warning',
                            message: '删除失败',
                            duration: 2000
                        });
                    }
                },function(response){})

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    duration: 2000
                });
            });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
    }
}
</script>
