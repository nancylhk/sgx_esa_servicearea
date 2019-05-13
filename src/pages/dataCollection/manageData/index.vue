<template>
    <div class="app-container dataBox">
        <el-row :gutter="25">
            <el-col :span="8" v-for="(item,index) in dataList" :key="index">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">{{item.taskTypeName}}</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>{{item.isFilledIn=='1'?'已上报':'未上报'}}</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>{{item.fillTime}}</span></p>
                            <p><span class="leftpan">截止时间</span><span>{{item.endTime}}</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn" @click="report(item.taskID)">{{item.isFilledIn=='1'?'重新上报':'上报'}}</div>                       
                        <router-link :to="{path:item.preview,query: {barId:'13',taskTypeID:item.taskTypeID}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <!-- <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区自营收入表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/selfIncomeData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
             <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区租金收入表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/rentIncomeData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col> 
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区商户收入表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/businessIncomeData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col> 
             <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区能源销售表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/energySalesData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col> 
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区主要成本统计表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/costData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>  
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区断面流量表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/flowData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col> 
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区节假日营业情况表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/holidaySaleData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col> 
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区商户合作履约</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">最近填报日期</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/togetherData',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>  -->               
        </el-row> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataList:[],
        }
    },
    mounted() {
        this.getList();
        this.getList2();
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
        },
        getList2() {
            let self = this;     
            this.$http.get(this.api.getNonIncomeTask, {
                params: {
                    accessToken: this.$store.state.user.token, 
                    category:2                					
                }
            },function(response){
                if(response.status == 200) {
                    self.dataList = self.dataList.concat(response.data.nonIncomeTasks);
                }
            },function(response){
                //失败回调
            })
        },
        report(taskID) {    
            let self = this;     
            this.$http.get(this.api.taskSubmit, {
                params: {
                    accessToken: this.$store.state.user.token, 
                    taskID:taskID                					
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
        }
    }
}
</script>

<style lang="scss">
.dataBox{
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
            margin-top: 12px;
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
        width: 100%;
        height: auto;
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
