<template>
    <div>
        <div class="app-container">
            <h5 class="app-crumb">
                <em class="app-crumb-line"></em>
                <span>报表数据采集</span>  
                <span><em class="next-arrow"></em>基础数据</span>            
            </h5>          
            <h4 class="view-title">服务区基本情况表-预览</h4>
            <div class="app-main mt20" id="app-main">
                <table class="specialTab">
                    <thead>
                        <tr>
                            <th colspan="2">项目</th>
                            <th>数量或状况</th>
                            <th colspan="2">项目</th>
                            <th>数量或金额</th>
                            <th colspan="2">经营模式</th>
                            <th colspan="2">其他设施</th>                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2">建成年份</td>
                            <td>2007年7月</td>
                            <td rowspan="4">停车场</td>
                            <td>停车场面积(平方)</td>
                            <td>199999.00</td>
                            <td>服务区经营形式</td>
                            <td>混合型(以上形式都有)</td>
                            <td>母婴室(个)</td>
                            <td>21</td>
                        </tr>
                        <tr>
                            <td colspan="2">开通营业年份</td>
                            <td>2007年9月</td>
                            <td>客车停车位(个)</td>
                            <td>134</td>
                            <td><em>其中:</em>1.餐饮小吃类</td>
                            <td>自营</td>
                            <td>第三(家庭)卫生间</td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td colspan="2">占地面积(亩)</td>
                            <td>92.00</td>
                            <td>货车停车位</td>
                            <td>108</td>
                            <td>2.超市特产类</td>
                            <td>租赁</td>
                            <td>信息港(信息服务点)</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td colspan="2">建筑总面积(平方米)</td>
                            <td>10293.00</td>
                            <td>危险品停车位(个)</td>
                            <td>6</td>
                            <td>3.休闲或特色商品类</td>
                            <td>0</td>
                            <td>充电站(个)</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td colspan="2">营业面积(平方米)</td>
                            <td>2093.00</td>
                            <td rowspan="5">公共卫生间</td>
                            <td>数量(个)</td>
                            <td>2</td>
                            <td>4.汽车修理</td>
                            <td>0</td>
                            <td>加气站</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td rowspan="3">初始投资和改造(追加)投资(万元)</td>
                            <td>初始投资额</td>
                            <td>5286.00</td>
                            <td>总面积(平方米)</td>
                            <td>600.00</td>
                            <td>5.客房</td>
                            <td>0</td>
                            <td>苏通卡代理点(个)</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2015</td>
                            <td>0.00</td>
                            <td>男蹲位数(个)</td>
                            <td>34</td>
                            <td>6.加油</td>
                            <td>高速石油</td>
                            <td>旅游服务(个)</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>2017</td>
                            <td></td>
                            <td>男便池数(个)</td>
                            <td>46</td>
                            <td>7.加气</td>
                            <td>0</td>
                            <td>营业面积(自营)</td>
                            <td>0.00</td>
                        </tr>
                        <tr>
                            <td rowspan="3">设置特征</td>
                            <td>形式</td>
                            <td>双侧</td>
                            <td>女蹲位数(个)</td>
                            <td>32</td>
                            <td>8.充电</td>
                            <td>国家电网</td>
                            <td>营业面积(租赁)</td>
                            <td>0.00</td>
                        </tr>
                        <tr>
                            <td>位置</td>
                            <td>线内</td>
                            <td colspan="2">保洁外包金额(万元)</td>
                            <td>36.61</td>
                            <td>9.其他</td>
                            <td>0</td>
                            <td>营业面积合计(自营+租赁)</td>
                            <td>0.00</td>
                        </tr>
                        <tr>
                            <td>与收费站同设</td>
                            <td>否</td>
                            <td colspan="2">保安外包金额(万元)</td>
                            <td>0.00</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>			
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
           flowList:[]
        }
    }
}
</script>
<style lang='scss'>
.specialTab{
    td{
        border: 1px dashed #f0f0f0;
        padding: 0 8px;
    }
    
}
.next-arrow{
    display: inline-block;
    width:16px;
    height: 16px;
    background: url(../../../../assets/images/next.png) no-repeat;
    vertical-align: middle;
    margin:0 5px;
}
.view-title{
    font-size: 16px;
    margin-top: 20px;
}
</style>
