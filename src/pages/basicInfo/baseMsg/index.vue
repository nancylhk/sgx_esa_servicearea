<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>基础信息</span>			
		</h5>
		<div class="baseMsg-container">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">
                        <li class="item">
                            <span class="itemLeft">建成年份：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">营业年份：</span><span class="itemRight">2010年10月</span>
                        </li>
                        <li class="item">
                            <span class="itemLeft">占地面积（亩）：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">建筑面积（亩）：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">营业面积（亩）：</span><span class="itemRight">2010年10月</span>
                        </li>
                        <li class="item"><span class="itemLeft">投资：</span><span class="itemRight">2010年10月</span></li>
                        <li class="item">
                            <span class="itemLeft">特征 形式：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">位置：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">与收费站同设：</span><span class="itemRight">2010年10月</span>
                        </li>
                    </ul>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>基本设施</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">
                        <li class="item bd">停车场</li>
                        <li class="item">
                            <span class="itemLeft">面积：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">客车车位：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">货车车位：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">危险品车位：</span><span class="itemRight">2010年10月</span>
                        </li>
                        <li class="item bd">卫生间</li>
                        <li class="item">
                            <span class="itemLeft">数量：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">面积：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">男蹲位：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">男便池：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">女蹲位：</span><span class="itemRight">2010年10月</span>
                        </li>
                        <li class="item bd">其他设施</li>
                        <li class="item">
                            <span class="itemLeft">母婴室：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">第三卫生间：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">信息港：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">充电站：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">加气站：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">苏通卡代理点：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">旅游服务：</span><span class="itemRight">2010年10月</span>
                        </li>
                    </ul>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>经营模式</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">                     
                        <li class="item">
                            <span class="itemLeft">餐饮小吃：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">超市特产：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">休闲或特色商品：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">汽车修理：</span><span class="itemRight">2010年10月</span>
                        </li>                       
                        <li class="item">
                            <span class="itemLeft">客房：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">加油：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">加气：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">充电桩：</span><span class="itemRight">2010年10月</span>
                        </li>                     
                    </ul>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>其他</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">                     
                        <li class="item">
                            <span class="itemLeft">本年保洁外包金额：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">本年保安外包金额：</span><span class="itemRight">2010年10月</span>                         
                        </li>                       
                        <li class="item">
                            <span class="itemLeft">营业面积（租赁）：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">营业面积（自营）：</span><span class="itemRight">2010年10月</span>
                        </li>   
                        <li class="item">
                            <span class="itemLeft">营业面积（租赁+自营）：：</span><span class="itemRight">2010年10月</span>                                                  
                        </li>                    
                    </ul>
                </div>
            </el-card>
        </div>
	</div>
</template>
<style rel="stylesheet/scss" lang="scss">
@import "src/style/mixin.scss";
.baseMsg-container{
    .box-card{
        margin-top: 20px;
    }
    .item{
       
        line-height: 30px;
    }
    .itemLeft{
        margin-right: 20px;
    }
    .bd{
        font-weight: bold;
        line-height: 36px;
    }
    .itemRight{
        margin-right: 70px;
    }
    .baseMsgBox{
        @include clearfix;
    }
    
}
</style>