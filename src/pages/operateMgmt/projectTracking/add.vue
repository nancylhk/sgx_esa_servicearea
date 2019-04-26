<template>
    <div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span>项目跟踪</span>
			<span><em class="next-arrow"></em>{{nowPathName}}</span>
		</h5>
        <div class="app-form mt20 ml40">
            <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini" :inline-message="true">
                <div class="mt30">
                    <el-form-item label="项目名称：" prop="toiletName">
                        <el-input v-model="addInfo.toiletName"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类型：" prop="measure">
                        <el-input v-model="addInfo.measure"></el-input><span class="unit">㎡</span>
                    </el-form-item>
                    <el-form-item label="投资金额：" prop="distribution">
                        <el-select v-model="addInfo.distribution">
                            <el-option v-for="(item,index) in distributions" :key="item.distributionCode" :label="item.distributionName" :value="item.distributionCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="控股批复金额" prop="gender">
                        <el-select v-model="addInfo.gender">
                            <el-option v-for="(item,index) in toiletTypeList" :key="item.typeID" :label="item.typeName" :value="item.typeID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始日期：" prop="squattingNum">
                        <el-input v-model="addInfo.squattingNum"></el-input>
                    </el-form-item>
                    <el-form-item label="结束日期：" prop="disabledNum">
                        <el-input v-model="addInfo.disabledNum"></el-input>
                    </el-form-item>
                    <el-form-item label="资金来源类型：" prop="urinalNum">
                        <el-input v-model="addInfo.urinalNum"></el-input>
                    </el-form-item>
                    <el-form-item label="是否完成：" prop="urinalNum">
                        <el-input v-model="addInfo.urinalNum"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述" prop="desc" v-show="textareaShow">
                        <el-input type="textarea" v-model="ruleForm.desc" rows="5"></el-input>                    
                    </el-form-item>
                </div>
            </el-form>
            <div class="mt40 ml40">
                <el-button type="primary" @click="submitForm('addInfo')">确定</el-button>
                <el-button @click="resetForm('addInfo')">取消</el-button>
            </div>
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            addInfo:{},
            rules:{

            },
        }
    },
    computed: {
        nowPathName() {
            return this.$route.name
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
	.next-arrow {
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(../../../assets/images/next.png) no-repeat;
		vertical-align: middle;
		margin: 0 5px;
	}
</style>
