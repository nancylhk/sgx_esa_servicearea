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
                            <span class="itemLeft">建成年份：</span><span class="itemRight">{{baseInfo.buildTime}}</span>
                            <span class="itemLeft">营业年份：</span><span class="itemRight">{{baseInfo.businessTime}}</span>
                        </li>
                        <li class="item">
                            <span class="itemLeft">占地面积（亩）：</span><span class="itemRight">{{baseInfo.coveredMeasure}}</span>
                            <span class="itemLeft">建筑面积（亩）：</span><span class="itemRight">{{baseInfo.builtUpMeasure}}</span>
                            <span class="itemLeft">营业面积（亩）：</span><span class="itemRight">{{baseInfo.businessMeasure}}</span>
                        </li>
                        <li class="item"><span class="itemLeft">投资：</span><span class="itemRight">{{baseInfo.inverstment}}</span></li>
                        <li class="item">
                            <span class="itemLeft">特征 形式：</span><span class="itemRight">{{baseInfo.distributio}}</span>
                            <span class="itemLeft">位置：</span><span class="itemRight">{{baseInfo.isInside}}</span>
                            <span class="itemLeft">与收费站同设：</span><span class="itemRight">{{baseInfo.isWithTollStation}}</span>
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
                            <span class="itemLeft">面积：</span><span class="itemRight">{{InfrastructureInfo.parkingLot[0].measure}}</span>
                            <span class="itemLeft">客车车位：</span><span class="itemRight">{{InfrastructureInfo.parkingLot[0].busParkingNumber}}</span>
                            <span class="itemLeft">货车车位：</span><span class="itemRight">{{InfrastructureInfo.parkingLot[0].truckParkingNumber}}</span>
                            <span class="itemLeft">危险品车位：</span><span class="itemRight">{{InfrastructureInfo.parkingLot[0].dangerCarryingNumber}}</span>
                        </li>
                        <li class="item bd">卫生间</li>
                        <li class="item">
                            <span class="itemLeft">数量：</span><span class="itemRight">{{toiletNum}}</span>
                            <span class="itemLeft">面积：</span><span class="itemRight">{{measure}}</span>
                            <span class="itemLeft">男蹲位：</span><span class="itemRight">{{manToilet.squattingNumber}}</span>
                            <span class="itemLeft">男便池：</span><span class="itemRight">{{manToilet.urinalNumber}}</span>
                            <span class="itemLeft">女蹲位：</span><span class="itemRight">{{womenToilet.squattingNumber}}</span>
                        </li>
                        <li class="item bd">其他设施</li>
                        <li class="item">
                            <template v-for="other in InfrastructureInfo.otherInfrastructure">
                                <span><span class="itemLeft">{{other.INFRASTRUCTURE_NAME}}：</span><span class="itemRight">{{other.INFRASTRUCTURE_NUM}}</span></span>
                            </template>
                            <template v-for="other in InfrastructureInfo.otherInfrastructureOilNum">
                                <span><span class="itemLeft">加油站：</span><span class="itemRight">{{other.oilNum}}</span></span>
                            </template>
                            <template v-for="other in InfrastructureInfo.otherInfrastructureAutoMobileNum">
                                <span><span class="itemLeft">汽修：</span><span class="itemRight">{{other.autoMobileNum}}</span></span>
                            </template>
                        </li>
                    </ul>
                </div>
            </el-card>
            <!-- <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>经营模式</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">                     
                        <li class="item">
                           <template v-for="info in businessInfo">
                                <span class="itemLeft">{{info.businessProject}}：</span><span class="itemRight">{{info.businessType}}</span>
                            </template> 
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
            </el-card>-->
            <!-- <el-card class="box-card">
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
            </el-card> -->
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            baseInfo:'',
            InfrastructureInfo:'',
            businessInfo:'',
            manToilet:'',
            womenToilet:'',
            toiletNum:0,
            measure:0,

        }
    },
    mounted() {
        this.getRestAreaInfo();
        this.getInfrastructure1();
        // this.getRestaAreaBusiness()
    },
    methods:{
        getRestAreaInfo() {
            let self = this;
            self.$http.get(self.api.getRestAreaInfo, {
                params: {
                    accessToken: self.$store.state.user.token,
                }
            }, function(response) {
                if(response.status == 200) {
                    self.baseInfo = response.data;
                }
            }, function(response) {
                //失败回调
            })
        },
        getInfrastructure1() {
            let self = this;
            self.$http.get(self.api.getInfrastructure1, {
                params: {
                    accessToken: self.$store.state.user.token,
                }
            }, function(response) {
                if(response.status == 200) {
                    self.InfrastructureInfo = response.data;
                    if(self.InfrastructureInfo.toilet.length>0){
                        let toiletNum = self.toiletNum;
                        let measure = self.measure;
                        self.InfrastructureInfo.toilet.forEach(e => {
                            toiletNum += parseInt(e.toiletNum);
                            measure += parseInt(e.measure);
                            if(e.typeName == '男'){
                                self.manToilet = e
                            }else{
                                self.womenToilet = e
                            }
                        });
                        self.toiletNum = toiletNum;
                        self.measure = measure
                    }
                    
                }
            }, function(response) {
                //失败回调
            })
        },
        getRestaAreaBusiness() {
            let self = this;
            self.$http.get(self.api.getRestaAreaBusiness, {
                params: {
                    accessToken: self.$store.state.user.token,
                }
            }, function(response) {
                if(response.status == 200) {
                    self.businessInfo = response.data;
                }
            }, function(response) {
                //失败回调
            })
        }
    }
}
</script>

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