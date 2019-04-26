<template>
    <div>
        <div class="app-container">
            <h5 class="app-crumb">
                <em class="app-crumb-line"></em>
                <span>断面流量表</span>              
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
                        <tr>
                            <td rowspan="2">1月</td>
                            <td>客车</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>21</td>
                            <td rowspan="2">5186</td>
                            <td rowspan="2">5186</td>
                            <td rowspan="2">5186</td>
                            <td rowspan="2">5186</td>
                            <td>5186</td>
                        </tr>
                        <tr>
                            <td>货车</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>45566</td>
                            <td>66666</td>
                        </tr>
                        <!-- <tr v-for="(info,index) in incomeList">
                            <td>{{index+1}}</td>						
                        </tr> -->
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
    }
}
</style>
