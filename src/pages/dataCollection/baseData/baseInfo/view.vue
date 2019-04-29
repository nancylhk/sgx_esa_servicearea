<template>
    <div>
        <div class="app-container">
            <h5 class="app-crumb">
                <em class="app-crumb-line"></em>
                <span @click="back" class="cp">报表数据采集</span>  
                <span><em class="next-arrow"></em>基本情况表-预览</span>            
            </h5>          
            <!-- <h4 class="view-title">服务区基本情况表-预览</h4> -->
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
                            <td>{{baseInfo.buildTime}}</td>
                            <td rowspan="4">停车场</td>
                            <td>停车场面积(平方)</td>
                            <td>{{InfrastructureInfo.parking.measure}}</td>
                            <td>服务区经营形式</td>
                            <td>混合型(以上形式都有)</td>
                            <td>{{otherList[0].infrastructureName}}</td>
                            <td>{{otherList[0].infrastructureNum}}</td>
                        </tr>
                        <tr>
                            <td colspan="2">开通营业年份</td>
                            <td>{{baseInfo.businessTime}}</td>
                            <td>客车停车位(个)</td>
                            <td>{{InfrastructureInfo.parking.busParkingNumber}}</td>
                            <td><em>其中:</em>1.{{businessInfo[0].businessProject}}</td>
                            <td>{{businessInfo[0].businessType}}</td>
                            <td>{{otherList[1].infrastructureName}}</td>
                            <td>{{otherList[1].infrastructureNum}}</td>
                        </tr>
                        <tr>
                            <td colspan="2">占地面积(亩)</td>
                            <td>{{baseInfo.coveredMeasure}}</td>
                            <td>货车停车位</td>
                            <td>{{InfrastructureInfo.parking.truckParkingNumber}}</td>
                            <td>2.{{businessInfo[1].businessProject}}</td>
                            <td>{{businessInfo[1].businessType}}</td>
                            <td>{{otherList[2].infrastructureName}}</td>
                            <td>{{otherList[2].infrastructureNum}}</td>
                        </tr>
                        <tr>
                            <td colspan="2">建筑总面积(平方米)</td>
                            <td>{{baseInfo.builtUpMeasure}}</td>
                            <td>危险品停车位(个)</td>
                            <td>{{InfrastructureInfo.parking.dangerCarryingNumber}}</td>
                            <td>3.{{businessInfo[2].businessProject}}</td>
                            <td>{{businessInfo[2].businessType}}</td>
                            <td>{{otherList[3].infrastructureName}}(个)</td>
                            <td>{{otherList[3].infrastructureNum}}</td>
                        </tr>
                        <tr>
                            <td colspan="2">营业面积(平方米)</td>
                            <td>{{baseInfo.businessMeasure}}</td>
                            <td rowspan="5">公共卫生间</td>
                            <td>数量(个)</td>
                            <td>{{InfrastructureInfo.toilet.num}}</td>
                            <td>4.{{businessInfo[3].businessProject}}</td>
                            <td>{{businessInfo[3].businessType}}</td>
                            <td>{{otherList[4].infrastructureName}}</td>
                            <td>{{otherList[4].infrastructureNum}}</td>
                        </tr>
                        <tr>
                            <td rowspan="3">初始投资和改造(追加)投资(万元)</td>
                            <td>初始投资额</td>
                            <td>{{baseInfo.inverstment}}</td>
                            <td>总面积(平方米)</td>
                            <td>{{InfrastructureInfo.toilet.measure}}</td>
                            <td>5.{{businessInfo[4].businessProject}}</td>
                            <td>{{businessInfo[4].businessType}}</td>
                            <td>{{otherList[5].infrastructureName}}</td>
                            <td>{{otherList[5].infrastructureNum}}</td>
                        </tr>
                        <tr>
                            <td>2015</td>
                            <td>0.00</td>
                            <td>男蹲位数(个)</td>
                            <td>{{InfrastructureInfo.toilet.mealSquattingNumber}}</td>
                            <td>6.{{businessInfo[5].businessProject}}</td>
                            <td>{{businessInfo[5].businessType}}</td>
                            <td>{{otherList[6].infrastructureName}}(个)</td>
                            <td>{{otherList[6].infrastructureNum}}</td>
                        </tr>
                        <tr>
                            <td>2017</td>
                            <td></td>
                            <td>男便池数(个)</td>
                            <td>{{InfrastructureInfo.toilet.mealUrinalNumber}}</td>
                            <td>7.{{businessInfo[6].businessProject}}</td>
                            <td>{{businessInfo[6].businessType}}</td>
                            <td>营业面积(自营)</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td rowspan="3">设置特征</td>
                            <td>形式</td>
                            <td>{{baseInfo.distributio}}</td>
                            <td>女蹲位数(个)</td>
                            <td>{{InfrastructureInfo.toilet.femealSquattingNumber}}</td>
                            <td>8.{{businessInfo[7].businessProject}}</td>
                            <td>{{businessInfo[7].businessType}}</td>
                            <td>营业面积(租赁)</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>位置</td>
                            <td>{{baseInfo.isInside}}</td>
                            <td colspan="2">保洁外包金额(万元)</td>
                            <td></td>
                            <td>9.{{businessInfo[8].businessProject}}</td>
                            <td>{{businessInfo[8].businessType}}</td>
                            <td>营业面积合计(自营+租赁)</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>与收费站同设</td>
                            <td>{{baseInfo.isWithTollStation}}</td>
                            <td colspan="2">保安外包金额(万元)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div class="upLoadBox">
                    <el-button class="upload" type="primary">上&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</el-button>
                </div>			
            </div>
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
            otherList:[]
        }
    },
    mounted() {
        this.getRestAreaInfo();
        this.getInfrastructure1();
        this.getRestaAreaBusiness();
        this.getOtherInfrastructure()
    },
    methods:{
        back() {
            this.$router.back(-1)
        },
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
        },
        // 其他设施
        getOtherInfrastructure() {
            let self = this;
            // self.beginRow = self.pageSize * (self.currentPage-1)+1;
            // self.endRow = self.currentPage * self.pageSize;
            self.$http.get(self.api.getOtherInfrastructure, {
                params: {
                    accessToken: self.$store.state.user.token,
                    beginRow: '',
                    endRow: '',
                    InfrastructureName:'',
                }
            },function(response){
                if(response.status == 200) {
                    self.toiletList = response.data	
                }
            },function(response){ })
        },
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
