<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>人员资料</span>			
		</h5>
		<div class="baseMsg-container">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>管理岗位</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">
                        <li class="item">
                            <span class="itemLeft">主管、主任、经理：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">副主管、副主任、副经理、助理：</span><span class="itemRight">2010年10月</span>
                        </li>
                        <li class="item">
                            <span class="itemLeft">书记、副书记：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">管理员：</span><span class="itemRight">2010年10月</span>
                        </li>                     
                    </ul>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>生产岗位</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">                      
                        <li class="item">
                            <span class="itemLeft">核算员、会计：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">收银员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">采购仓管：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">厨师长：</span><span class="itemRight">2010年10月</span>
                        </li>                     
                        <li class="item">
                            <span class="itemLeft">厨师：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">餐饮服务员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">商场营业员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">客房服务员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">加油工：</span><span class="itemRight">2010年10月</span>
                        </li>
                        <li class="item">
                            <span class="itemLeft">水电工：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">ETC员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">临时用工：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">其他生产岗位：</span><span class="itemRight">2010年10月</span>
                        </li>
                    </ul>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>承租单位</span>
                </div>
                <div class="">
                    <ul class="baseMsgBox">                     
                        <li class="item">
                            <span class="itemLeft">管理员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">餐饮小吃、超市、特色商店：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">保安人员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">保洁人员：</span><span class="itemRight">2010年10月</span>
                        </li>                       
                        <li class="item">
                            <span class="itemLeft">客服服务员：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">加油站员工：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">充电站员工：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">加气站员工：</span><span class="itemRight">2010年10月</span>
                            <span class="itemLeft">临时用工：</span><span class="itemRight">2010年10月</span>
                        </li>
                        <li class="item">
                            <span class="itemLeft">驾驶员等其他辅助用工：</span><span class="itemRight">2010年10月</span>
                        </li>                     
                    </ul>
                </div>
            </el-card>
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            ManagePost:''
        }
    },
    mounted() {
        this.getManagePost()
    },
    methods:{
        getManagePost() {
            let self = this;
            self.$http.get(self.api.getManagePost, {
                params: {
                    accessToken: self.$store.state.user.token,
                }
            }, function(response) {
                if(response.status == 200) {
                    self.ManagePost = response.data;
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