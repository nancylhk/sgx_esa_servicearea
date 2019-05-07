<template>
    <div class="app-container fillBox">
        <el-row :gutter="25">
            <el-col :span="8" v-for="item in dataList" :key="item.taskId">
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
                        <router-link :to="{path:item.fillLink,query: {barId:'03',taskTypeID:item.taskTypeID}}">
                            <div class="fillBtn">填报</div>
                        </router-link>
                        <router-link :to="{path:item.preview,query: {barId:'03',taskTypeID:item.taskTypeID,typeId:item.typeId}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <!-- <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">自营收入表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">最近填报时间</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">
                        <router-link :to="{path:'/operateMgmt/selfIncomeFill',query: {barId:'03'}}">
                            <div class="fillBtn">填报</div>
                        </router-link>
                        <router-link :to="{path:'/operateMgmt/selfIncomeView',query: {barId:'03'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
           <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">商户收入表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">最近填报时间</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">
                        <router-link :to="{path:'/operateMgmt/businessIncomeFill',query: {barId:'03'}}">
                            <div class="fillBtn">填报</div>
                        </router-link>
                        <router-link :to="{path:'/operateMgmt/businessIncomeView',query: {barId:'03'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">租金收入表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">最近填报时间</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">
                        <router-link :to="{path:'/operateMgmt/rentIncomeFill',query: {barId:'03'}}">
                            <div class="fillBtn">填报</div>
                        </router-link>
                        <router-link :to="{path:'/operateMgmt/rentIncomeView',query: {barId:'03'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">能源收入表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">最近填报时间</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">
                         <router-link :to="{path:'/operateMgmt/energySalesFill',query: {barId:'03'}}">
                            <div class="fillBtn">填报</div>
                         </router-link>
                         <router-link :to="{path:'/operateMgmt/energySalesView',query: {barId:'03'}}">
                            <div class="viewBtn">预览</div>
                         </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px'}">
                    <div class="item">
                        <h1 class="title">服务区节假日营业情况表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">最近填报时间</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">
                        <router-link :to="{path:'/operateMgmt/holidaySalesFill',query: {barId:'03'}}">
                            <div class="fillBtn">填报</div>
                        </router-link>
                        <router-link :to="{path:'/operateMgmt/holidaySalesView',query: {barId:'03'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col> -->
        </el-row>
    </div>
</template>
<script>
// var routerList = [
//     {fill:'/operateMgmt/selfIncomeFill',view:'/operateMgmt/selfIncomeView'},
//     {fill:'/operateMgmt/businessIncomeFill',view:'/operateMgmt/businessIncomeView'},
//     {fill:'/operateMgmt/rentIncomeFill',view:'/operateMgmt/rentIncomeView'},
//     {fill:'/operateMgmt/energySalesFill',view:'/operateMgmt/energySalesView'},
//     {fill:'/operateMgmt/holidaySalesFill',view:'/operateMgmt/holidaySalesView'},
// ]
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
.fillBox{
    padding: 20px 40px 20px 20px;
    .box-card{
        margin-bottom: 20px;
    }
    .title{
        font-size: 20px;
        font-weight: 600;
    }
    .item{
        padding: 20px;
    }
    .timeBox{      
        width: 63%; 
        margin-top: 10px;       
        p{
            line-height: 20px;
            margin-top: 22px;
            font-size: 14px;
            color: #666;
        }
    }
    .iconBox,.timeBox,.leftpan,.fillBtn,.viewBtn{
        display: inline-block;
        vertical-align: top;
    }
    .iconBox{       
        width: 30%;
        margin-top: 10px;   
    }
    .leftpan{
        width: 100px;
    }
    .tableIcon{
        width: 100px;
        height: 100px;
    }
    .handleBtns{
        background: #f7f9fa;
        padding: 8px 0;
        border-top: 1px solid #f0f0f0;
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
}

</style>
