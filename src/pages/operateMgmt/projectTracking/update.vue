<template>
    <div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>项目跟踪</span>
			<span><em class="next-arrow"></em>{{nowPathName}}</span>
		</h5>
        <div class="app-form mt20 ml40">
            <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini" :inline-message="true">
                <div class="mt30">
                    <el-form-item label="项目名称：" prop="projectName">
                        <el-input v-model="addInfo.projectName"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类型" prop="projectTypeID">
					    <el-select v-model="addInfo.projectTypeID"  clearable>
                            <el-option :label="item.projectName" :value="item.projectID" :key="item.projectID" v-for='item in projectList'></el-option>						
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投资金额：" prop="investment">
                        <el-input  v-model.number="addInfo.investment"></el-input>
                    </el-form-item>
                    <el-form-item label="控股批复金额" prop="reviewAmount">
                        <el-input  v-model.number="addInfo.reviewAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="开始日期：" prop="beginTime">
                        <!-- <el-input v-model="addInfo.beginTime"></el-input> -->
                        <el-date-picker value-format='yyyy-MM-dd'  v-model="addInfo.beginTime" type="date" placeholder="选择开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期：" prop="endTime">
                        <el-date-picker  value-format='yyyy-MM-dd'  v-model="addInfo.endTime" type="date" placeholder="选择结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="资金来源类型：" prop="fundsSourceID">
                        <el-select v-model="addInfo.fundsSourceID">
                            <el-option v-for="(item,index) in projectList" :key="item.projectID" :label="item.typeName" :value="item.projectID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否完成：" prop="isFinishi">                      
                        <el-select v-model="addInfo.isFinishi">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完成进度" prop="progress">
                        <el-input v-model.number="addInfo.progress"></el-input><span class="unit">%</span>
                    </el-form-item>
                    <el-form-item label="项目描述" prop="projectContent">
                        <el-input type="textarea" v-model="addInfo.projectContent" rows="5"></el-input>                    
                    </el-form-item>
                </div>
            </el-form>
            <div class="mt40 ml40">
                <el-button type="primary" @click="submitForm('addInfo')">确定</el-button>
                <el-button @click="back">取消</el-button>
            </div>
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            addInfo:{
                projectName:"",
                projectTypeID:"",
                investment:"",
                reviewAmount:"",
                beginTime:"",
                endTime:"",
                fundsSourceID:"1",
                isFinishi:"",
                progress:'',
                projectContent:""
            },
            rules:{
                projectName:[
                    {required: true,message: '请输入项目名称',trigger: 'blur'},
                ],
                projectTypeID:[
                    {required: true,message: '请选择项目类型',trigger: 'blur'},
                ],
                investment:[
                    {required: true,message: '请输入投资金额',trigger: 'blur'},
                ],
                // "reviewAmount":[
                //     {required: true,message: '请输入金额',trigger: 'blur'},
                // ],
                beginTime:[
                    {required: true,message: '请输入开始时间',trigger: 'blur'},
                ],
                // "endTime":[
                //     {required: true,message: '请输入金额',trigger: 'blur'},
                // ],
                fundsSourceID:[
                    {required: true,message: '请选择资金来源',trigger: 'change'},
                ],
                isFinishi:[
                    {required: true,message: '请选择是否完成',trigger: 'blur'},
                ],
                projectContent:[
                    {required: true,message: '请输入项目描述',trigger: 'blur'},
                ],
                progress:[
                     {required: true,message: '请输入进度',trigger: 'blur'},
                    
                ]
            },
            projectList:[],
            
        }
    },
    computed: {
        nowPathName() {
            return this.$route.name
        }
    },
    mounted() {
        this.getProjectType()
        this.getfundsSourceType()//资金来源类型
        this.getInfo()
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
        getfundsSourceType() {        
            var self = this;
            this.$http.get(this.api.getfundsSourceType,{
                params: {
                    accessToken: self.$store.state.user.token
                }
            },function(response){
                if(response.status == 200) {
                   self.projectList = response.data
                }
            },function(response){})
        },
        getInfo() {         
            let self = this;
            self.$http.get(self.api.getMajorProjectInfo, {
                params: {
                    accessToken: self.$store.state.user.token,
                    projectID: self.$route.params.id
                }
            },function(response){
                self.addInfo = response.data
            },function(response){})
        },
        submitForm(formName) {
            let self = this;
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    self.$http.get(self.api.updateMajorProjectInfo, {
                        params: {
                            accessToken: self.$store.state.user.token,
                            info: self.addInfo
                        }
                    },function(response){
                        if(response.data) {
                            self.$message({
                                type: 'success',
                                message: '修改成功',
                                duration: 2000
                            });
                            self.$router.back(-1)
                        } else {
                            self.$message({
                                type: 'warning',
                                message: '修改失败',
                                duration: 2000
                            });
                        }
                    },function(response){})
                }
            });
        },
        back() {
            this.$router.back(-1)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
	.next-arrow {
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(../../../assets/images/next.png) no-repeat;
		vertical-align: middle;
		margin: 0 5px;
	}
    .app-form .el-form-item .el-textarea{
        position: relative;
        font-size: 12px;
        display: inline-block;
        width: 320px;
    }
    .app-form .el-form-item  .el-textarea__inner{
        width: 320px;
    }
</style>
