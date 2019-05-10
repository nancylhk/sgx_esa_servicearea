<template>
    <div class="app-container fillTaskBox">
        <el-row :gutter="25">
            <!-- <el-col :span="8" v-for="item in dataList" :key="item.taskId">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">{{item.taskTypeName}}</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">最近填报时间</span><span>{{item.fillTime}}</span></p>
                            <p><span class="leftpan">截止时间</span><span>{{item.endTime}}</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">
                        <router-link :to="{path:item.fillLink,query: {barId:'03',taskId:item.taskId}}">
                            <div class="fillBtn">填报</div>
                        </router-link>
                        <router-link :to="{path:item.preview,query: {barId:'03',taskTypeID:item.taskTypeId,typeId:item.typeId}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col> -->
            <el-col :span="8" v-for="(item,index) in dataList" :key="item.planID" class="col-container">
                <el-card  :body-style="{ padding: '0px' }" >
                    <div slot="header" class="clearfix">
                        <span>
                            <i class="el-icon-warning-outline" style="color:#f00;margin-right:5px;font-size:16px;" v-if="item.finishNum=item.totalNum"></i>
                            <i class="el-icon-circle-check" style="color:#4cb45b;margin-right:5px;font-size:16px;" v-else></i>
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
                            <img src="../../../assets/images/nofinish.png" class="iconImg" v-else/>
                        </div> 
                        <div style="height:1px;background:#eee;margin-top:20px"></div>                
                    </div>
                    <div class="btns">
                        <el-button @click="fill(item.fillLink,item.taskTypeID,item.taskID)"><img src='../../../assets/images/edit.png' class="doIcon"/>填报</el-button>
                        <el-button  @click="viewInfo(item.preview,item.taskTypeID,item.taskID)"><img src='../../../assets/images/view.png' class="doIcon"/>查看</el-button>
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
        getList() {
            let self = this;     
            this.$http.get(this.api.getNonIncomeTask, {
                params: {
                    accessToken: this.$store.state.user.token, 
                    category:2                					
                }
            },function(response){
                if(response.status == 200) {
                    self.dataList = response.data;
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
