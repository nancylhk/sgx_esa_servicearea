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
                <el-row>
                    <el-col :span="13">
                        <el-row>
                            <el-col :span="6">
                                <ul>
                                    <li><div class="leftest">管理岗位</div><div class="value">人数</div></li>
                                    <!-- <li v-for="item in managePost">
                                        <div class="leftest">{{item.postName}}</div><div>{{item.num}}</div>
                                    </li> -->
                                    <li v-for="item in managePost.slice(0,8)">
                                        <div class="leftest">{{item.postName}}</div><div  class="value">{{item.num}}</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6">
                                <ul>
                                    <li><div class="leftest">生产岗位</div><div class="value">人数</div></li>
                                    <li v-for="item in producePost.slice(0,8)">
                                        <div class="leftest">{{item.postName}}</div><div  class="value">{{item.num}}</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6">
                                <ul>
                                    <li><div class="leftest">生产岗位</div><div class="value">人数</div></li>
                                    <li v-for="item in producePost.slice(8,16)">
                                        <div class="leftest">{{item.postName}}</div><div  class="value">{{item.num}}</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="6">
                                <ul>
                                    <li><div class="leftest">生产岗位</div><div class="value">人数</div></li>
                                    <li v-for="item in producePost.slice(16,24)">
                                        <div class="leftest">{{item.postName}}</div><div  class="value">{{item.num}}</div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <ul>
                                    <li>
                                        <div class="leftest manageTotal">管理岗位合计</div><div class="value manageTotal">2</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="9">
                                <ul>
                                    <li>
                                        <div class="tabRow">生产岗位合计</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="9">
                                <ul>
                                   <li>
                                        <div  class="tabRow">12</div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="15">
                                <ul>
                                    <li>
                                        <div class="tabRow">服务区（人员归属路公司、或劳务派遣）员工数</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="9">
                                <ul>
                                    <li>
                                        <div class="tabRow">30</div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <ul>
                                    <li>
                                        <div class="tabRow">服务区工作人员工总数</div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="11">
                        <el-row>
                            <el-col :span="8">
                                <ul>
                                    <li><div class="leftest">承租单位用工</div><div class="value">人数</div></li>
                                    <li v-for="item in renterUnitPost.slice(0,4)">
                                        <div class="leftest">{{item.postName}}</div><div  class="value">{{item.num}}</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="8">
                                <ul>
                                    <li><div class="leftest">承租单位用工</div><div class="value">人数</div></li>
                                    <li v-for="item in renterUnitPost.slice(4,8)">
                                        <div class="leftest">{{item.postName}}</div><div  class="value">{{item.num}}</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="8">
                                <ul>
                                    <li><div class="leftest">承租单位用工</div><div class="value">人数</div></li>
                                    <li v-for="item in renterUnitPost.slice(8,12)">
                                        <div class="leftest">{{item.postName}}</div><div  class="value">{{item.num}}</div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <ul>
                                    <li>
                                        <div class="tabRow">外包单位员工数</div>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="12">
                                <ul>
                                    <li>
                                        <div class="tabRow">39</div>
                                    </li>
                                </ul>
                            </el-col>                        
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <ul>
                                    <li>
                                        <div class="tabRow chartBox">
                                            <pieComp class="product-rate" 
                                            ref="commodityRangeChart" 
                                            :_id="'commodityRange'" 
                                            :_chartData="chartData" 
                                            :_colorList="colorList">
                                            </pieComp>
                                        </div>
                                    </li>
                                </ul>
                            </el-col>                        
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <ul>
                                    <li>
                                        <div class="tabRow">69</div>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                
                <div class="upLoadBox">
                    <el-button class="upload" type="primary">上&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</el-button>
                </div>			
            </div>
        </div>
    </div>
</template>
<script>
import pieComp from '../../../../components/charts/PieComp.vue'
export default {
    data() {
        return {
            managePost:[{postName:'管理岗位',num:1},{postName:'管理岗位',num:2},{postName:'管理岗位',num:3},
                {postName:'管理岗位',num:4},{postName:'管理岗位',num:5},{postName:'管理岗位',num:6},{postName:'管理岗位',num:7},
                {postName:'管理岗位',num:8},
                {postName:'管理岗位',num:9},
            ],
            producePost:[{postName:'生产岗位',num:1},{postName:'生产岗位',num:2},{postName:'生产岗位',num:3},
                {postName:'生产岗位',num:4},{postName:'生产岗位',num:5},{postName:'生产岗位',num:6},{postName:'生产岗位',num:7},
                {postName:'生产岗位',num:8},
                {postName:'生产岗位',num:9},
                {postName:'生产岗位',num:4},{postName:'生产岗位',num:5},{postName:'生产岗位',num:6},{postName:'生产岗位',num:7},
                {postName:'生产岗位',num:8},
                {postName:'生产岗位',num:9},
                {postName:'生产岗位',num:4},{postName:'生产岗位',num:5},{postName:'生产岗位',num:6},{postName:'生产岗位',num:7},
                {postName:'生产岗位',num:8},
                {postName:'生产岗位',num:9}, {postName:'生产岗位',num:8},
                {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            ],
            renterUnitPost: [{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            {postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},{postName:'生产岗位',num:9},
            ],
            chartData:[{value:'2',name:'1'},{value:'28',name:'2'},{value:'39',name:'3'}],
            colorList: ['#b898ee', '#ffd447', '#7bdad4', '#47bde3'],
        }
    },
    components:{
        pieComp
    },
    mounted() {
        // this.getManagePost()
        // this.getProducePost()
        // this.getRenterUnitPost()
    },
    methods:{
        back() {
            this.$router.back(-1)
        },
        getManagePost() {
            let self = this;
            self.$http.get(self.api.getManagePost, {
                params: {
                    accessToken: self.$store.state.user.token,
                }
            }, function(response) {
                if(response.status == 200) {
                    self.managePost = response.data.postLists;
                }
            }, function(response) {
                //失败回调
            })
        },
        getProducePost() {
            let self = this;
            self.$http.get(self.api.getProducePost, {
                params: {
                    accessToken: self.$store.state.user.token,
                }
            }, function(response) {
                if(response.status == 200) {
                    self.producePost = response.data.postLists;
                }
            }, function(response) {
                //失败回调
            })
        },
        getRenterUnitPost() {
            let self = this;
            self.$http.get(self.api.getRenterUnitPost, {
                params: {
                    accessToken: self.$store.state.user.token,
                }
            }, function(response) {
                if(response.status == 200) {
                    self.renterUnitPost = response.data.postLists;
                }
            }, function(response) {
                //失败回调
            })
        }
    }
}
</script>
<style>
.leftest,.value,.tabRow{
    display: inline-block;
    width: 50%;
    text-align: center;
    /* padding: 12px 4px; */
    line-height: 40px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
}
.next-arrow{
    display: inline-block;
    width:16px;
    height: 16px;
    background: url(../../../../assets/images/next.png) no-repeat;
    vertical-align: middle;
    margin:0 5px;
}
.manageTotal{
    /* min-width: 80px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.product-rate {
    width: 90%;
    height: 90%;
    margin-left: 5%;
}
.tabRow{
    width: 100%;
}
.chartBox{
    height: 205px;
}
</style>
