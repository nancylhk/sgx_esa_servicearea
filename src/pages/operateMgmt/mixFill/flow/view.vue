<template>
    <div>
        <div class="app-container">
            <h5 class="app-crumb">
                <em class="app-crumb-line"></em>
                <span @click="goBack()" class="cp">成本填报</span>
                <span><em class="next-arrow"></em>{{nowPath}}</span>
            </h5>
            <div class="app-main mt20" id="app-main">
                <table class="specialTab">
                    <thead>
                        <tr>
                            <th>月份/车型</th>
                            <th>车型</th>
                            <th>一型</th>
                            <th>二型</th>
                            <th>三型</th>
                            <th>四型</th>
                            <th>五型</th>
                            <th>六型</th>
                            <th>合计</th>
                            <th>日均断面流量</th>
                            <th>断面客货比</th>
                            <th>其中断面7座(含)以下小型客车占比</th>
                            <th>入区(不分车型)</th>
                            <th>入区率</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="info in flowList">
                            <tr>
                                <td rowspan="2">{{info.month}}</td>
                                <td>{{info.vehicle.vehicleType=='1'?'客车':'货车'}}</td>
                                <td>{{info.vehicle.typeFlow1}}</td>
                                <td>{{info.vehicle.typeFlow2}}</td>
                                <td>{{info.vehicle.typeFlow3}}</td>
                                <td>{{info.vehicle.typeFlow4}}</td>
                                <td>{{info.vehicle.typeFlow5}}</td>
                                <td>{{info.vehicle.typeFlow6}}</td>
                                <td>{{info.vehicle.total}}</td>
                                <td rowspan="2">{{info.dayFlow}}</td>
                                <td rowspan="2">{{info.vehicleTruckRate}}</td>
                                <td rowspan="2">{{info.lessThanSeven}}</td>
                                <td rowspan="2">{{info.enterFlow}}</td>
                                <td>{{info.enterRate}}</td>
                            </tr>
                            <tr>
                                <td>{{info.truck.vehicleType=='1'?'客车':'货车'}}</td>
                                <td>{{info.truck.typeFlow1}}</td>
                                <td>{{info.truck.typeFlow2}}</td>
                                <td>{{info.truck.typeFlow3}}</td>
                                <td>{{info.truck.typeFlow4}}</td>
                                <td>{{info.truck.typeFlow5}}</td>
                                <td>{{info.truck.typeFlow6}}</td>
                                <td>{{info.truck.total}}</td>
                                <td>入区数据为估计</td>
                            </tr>
                        </template>
                    </tbody>
                </table>			
            </div>
        </div>
        <div class="upLoadBox" v-if="barId==13">
			<el-button class="upload" type="primary" @click="report">上&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</el-button>
		</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
           flowList:[],
           barId:this.$route.query.barId
        }
    },
    computed:{
        nowPath() {
            return this.$route.name
        }
    },
    mounted() {
        this.getList()
    },
    methods:{
        goBack() {
            this.$router.back(-1)
        },
        report() {    
            let self = this; 
            let taskID = this.$route.query.typeId;    
            this.$http.get(this.api.getTaskProgress, {
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
        },		
        getList() {
            let self = this;				
            this.$http.get(this.api.getSectionVehicleFlowInfoPreview, {
                params: {
                    accessToken: this.$store.state.user.token,
                    taskTypeID:this.$route.query.taskTypeID
                }
            },function(response){
                if(response.status == 200) {
                    self.flowList = response.data.sectionFlowViews;
                }
            },function(response){
                //失败回调
            })
            
        },
    }
}
</script>
<style lang='scss'>
.specialTab{
    td{
        border: 1px dashed #f0f0f0;
    }
}
</style>
