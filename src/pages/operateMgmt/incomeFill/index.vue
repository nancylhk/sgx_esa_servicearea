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
                        <router-link :to="{path:item.fillLink,query: {barId:'03',taskTypeID:item.taskTypeID,typeId:item.taskID}}">
                            <div class="fillBtn">填报</div>
                        </router-link>
                        <router-link :to="{path:item.preview,query: {barId:'03',taskTypeID:item.taskTypeID,typeId:item.taskID}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>  -->
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
.fillTaskBox{
    padding: 20px 40px 20px 20px;
    .el-card__header{
        padding: 8px 8px;
        color: #000;
        background: #dce7f9;
        font-size: 14px;
    }
    .listTitle{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        padding: 8px 15px;
        font-size: 14px;
        background: #dce7f9
    }
    .box-card{
        margin-bottom: 20px;
    }
    .item{
        padding: 20px 20px 20px;
        position: relative;
    }
    .iconBox{
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .iconImg{
        width: 90px;
        height: 90px;
    }
    .ring-income{
         width: 100px;
        height: 100px;
    }
    .timeBox{      
        margin-top: 10px;    
        p{
            margin-top: 12px;
            font-size: 12px;
            color: #666;
        }
    }
    .addIcon{
        width: 70px;
        height: auto;
        margin: 40px auto 0;
    }
    .leftpan,.fillBtn,.viewBtn{
        display: inline-block;
        vertical-align: top;
    }
    .rightpan{

    }
    .leftpan{
        width: 100px;
        font-size: 12px;
    }
    .finish{
        color: #47bde3;
        font-weight: bold
    }
    .unfinish{
        color: #ffd447;
        font-weight: bold
    }
    .el-checkbox-group{
        width: 90%;
        margin: 0 auto
    }
    .el-checkbox{
        width: 50%;
        padding-left: 30px;
        margin-right: 0;
        box-sizing: border-box;
        line-height: 24px;
    }
    .handleBtns{
        background: #f7f9fa;
        padding: 8px 0;
       
    }
    .el-dialog__footer{
        text-align: center;
        .el-button--primary,.el-button--default{
            background-color: #14a8da;
            box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
            color:#fff;
            padding: 6px 28px;
        }
        .el-button--default{
            background: #ccc;
        }
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
        // background-color: #fff;
        // border-color: #ccc;
    }
    .el-checkbox__inner::after{
        // border: 1px solid #0099cc
    }
    .el-checkbox__input.is-checked + .el-checkbox__label{
        color: #666;
    }
    .fillBtn,.viewBtn{
        width: 49%;
        padding: 6px 0;
        text-align: center;
        color: #666;
        cursor: pointer;
    }
    .fillBtn{
        border-right: 1px solid #ccc;
    }
    .el-card.is-always-shadow{
        border:none;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
        margin-bottom: 25px;
    }
    .btns{
        padding: 0 0 10px;
        text-align: right;
    }
    .el-button{
        background: #fff;
        border:none;
        color:#666;
        padding: 6px 20px;
    }
    .doIcon{
        width: 15px;
        height: 17px;
        margin-right: 3px;
        position: relative;
        top: -1px;
    }
    .el-icon-view{
        font-size: 16px;
        color: #47bde3;
        position: relative;
        top: 2px;
    }
}

</style>
