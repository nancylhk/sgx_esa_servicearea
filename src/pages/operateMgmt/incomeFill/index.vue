<template>
    <div class="app-container fillTaskBox">
        <el-row :gutter="25">
            <el-col :span="8" v-for="(item,index) in dataList" :key="item.taskID" class="col-container">
                <el-card  :body-style="{ padding: '0px' }" >
                    <div slot="header" class="clearfix">
                        <span>
                            <!-- <i class="el-icon-warning-outline" style="color:#f00;margin-right:5px;font-size:16px;" v-if="item.isFilledIn='1'"></i>
                            <i class="el-icon-circle-check" style="color:#4cb45b;margin-right:5px;font-size:16px;" v-else></i> -->
                            {{item.taskTypeName}}
                        </span>
                    </div>
                    <div class="item">
                        <div class="timeBox">
                            <p>
                                <span class="leftpan">最近填报时间：</span><span>{{item.fillTime}}</span>
                            </p>
                            <p>
                                <span class="leftpan">填报截止日期：</span><span class="unfinish">{{item.endTime}}</span>
                            </p>
                        </div> 
                        <div class="iconBox">
                            <img src="../../../assets/images/finish.png" class="iconImg" v-if="item.isFilledIn=='1'"/>
                            <img src="../../../assets/images/nofinish.png" class="iconImg" v-if="item.isFilledIn=='0'"/>
                        </div> 
                        <div style="height:1px;background:#eee;margin-top:20px"></div>                
                    </div>
                    <div class="btns">
                        <el-button  v-if="item.isFilledIn=='0'" @click="fill(item.fillLink,item.taskTypeID,item.taskID)"><img src='../../../assets/images/edit.png' class="doIcon"/>填报</el-button>
                        <el-button  @click="viewInfo(item.preview,item.taskTypeID,item.taskID)"><img src='../../../assets/images/view.png' class="doIcon"/>查看</el-button>
                        <el-button  v-if="item.isFilledIn=='0'"  @click="report(item.taskID)" class="leftMarg"><img src='../../../assets/images/upInfo.png' class="doIcon littleIcon"/>上报</el-button>
                    </div>
                </el-card>
            </el-col>         
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataList:[]
        }
    },
    mounted() {
        this.getList()
    },
    methods:{
        fill(fillLink,taskTypeID,typeId) {
            this.$router.push({
                path:fillLink,
                query:{
                    barId:'03',
                    taskTypeID:taskTypeID,
                    typeId:typeId
                }
            })
        },
        viewInfo(fillLink,taskTypeID,typeId) {
            this.$router.push({
                path:fillLink,
                query:{
                    barId:'03',
                    taskTypeID:taskTypeID,
                    typeId:typeId
                }
            })
        },
        report(id) {
            let self = this; 
            this.$confirm('确认上报数据吗，此操作不可逆？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(() => { 
                this.$http.get(this.api.taskSubmit, {
                    params: {
                        accessToken: this.$store.state.user.token, 
                        taskId:id                					
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消',
                    duration: 2000
                });
            });
        },
        getList() {
            let self = this;  
            let info = {};
            info.category = 1; 
            this.$http.get(this.api.getIncomeTask, {
                params: {
                    accessToken: this.$store.state.user.token, 
                    info:info               					
                }
            },function(response){
                if(response.status == 200) {
                    if(response.data.length>0) {
                        self.dataList = response.data;
                    }
                   
                }
            },function(response){
                //失败回调
            })
        }
    }
}
</script>

<style lang="scss">


</style>
