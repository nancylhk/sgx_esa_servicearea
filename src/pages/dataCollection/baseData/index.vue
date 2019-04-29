<template>
    <div class="app-container fillBox">
        <el-row :gutter="25">
            <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区基本信息表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">填报截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">                       
                        <div class="fillBtn">上报</div>                       
                        <router-link :to="{path:'/dataCollection/baseInfoView',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
           <el-col :span="8">
                <el-card  :body-style="{ padding: '0px' }">
                    <div class="item">
                        <h1 class="title">服务区人员结构表</h1>
                        <div class="timeBox">
                            <p><span class="leftpan">是否上报</span><span>2019-04-21</span></p>
                            <p><span class="leftpan">填报截止时间</span><span>2019-04-21</span></p>
                        </div>
                        <div class="iconBox">
                            <img src="../../../assets/images/table.png" class="tableIcon"/>
                        </div>
                    </div>
                    <div class="handleBtns">
                        <div class="fillBtn">重新上报</div>                       
                        <router-link :to="{path:'/dataCollection/memberInfoView',query: {barId:'13'}}">
                            <div class="viewBtn">预览</div>
                        </router-link>
                    </div>
                </el-card>
            </el-col>                    
        </el-row>
    </div>
</template>
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
