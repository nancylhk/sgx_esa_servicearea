<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="名称：" prop="toiletName">
					<el-input v-model="addInfo.toiletName"></el-input>
				</el-form-item>
				<el-form-item label="面积：" prop="measure">
					<el-input v-model="addInfo.measure"></el-input><span class="unit">㎡</span>
				</el-form-item>
				<el-form-item label="所在区域：" prop="distribution">
					<el-select v-model="addInfo.distribution">
						<el-option v-for="(item,index) in distributions" :key="item.distributionCode" :label="item.distributionName" :value="item.distributionCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别：" prop="gender">
					<el-select v-model="addInfo.gender">
						<el-option label="男" value="0"></el-option>
						<el-option label="女" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="蹲位数：" prop="squattingNum">
					<el-input v-model="addInfo.squattingNum"></el-input>
				</el-form-item>
				<el-form-item label="无障碍卫生间：" prop="disabledNum">
					<el-input v-model="addInfo.disabledNum"></el-input>
				</el-form-item>
				<el-form-item label="便池数：" prop="urinalNum">
					<el-input v-model="addInfo.urinalNum"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div class="mt40 ml40">
			<el-button type="primary" @click="submitForm('addInfo')">确定</el-button>
			<el-button @click="resetForm('addInfo')">取消</el-button>
		</div>
	</div>

</template>
<script>
	import validateRules from '../../../utils/validate';
	export default {
		name: 'sectionUpdate',
		data() {
			return {
				addInfo: {},
				distributions:[],
				rules: {
					toiletName: [{
						required: true,
						validator: validateRules.isItemName,
						trigger: 'blur'
					}],
					distribution: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
					}],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					measure: [
					{ required: true, message: '请输入面积', trigger: 'blur' },
					{
						validator: validateRules.isNumber,
						trigger: 'blur',
						required: true,
					}],
					squattingNum: [
					{ required: true, message: '请输入蹲位数', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					}],
					disabledNum: [
					{ required: true, message: '请输入无障碍卫生间数', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					}],
					urinalNum: [
					{ required: true, message: '请输入便池数', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					}],
				}
			};
		},
		created() {
			var self = this;
			//分布形式
			if(self.$store.state.app.commonVariable.distributions) {
				self.distributions = self.$store.state.app.commonVariable.distributions;
			} else {
				self.$http.get(self.api.getDistribution, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.distributions = response.data.distributions;
					self.$store.dispatch('setCommonVariable', {
						distributions: self.distributions
					});
				}, function(response) {})
			}
		},
		mounted(){
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getToiletInfoForUpdate,{
					params: {
						accessToken: self.$store.state.user.token,
						toiletID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.addInfo = response.data;
					}
				},function(response){})
			},
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.updateToiletInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								toiletID: self.$store.state.app.viewId,
								info: self.addInfo
							}
						},function(response){
							if(response.data) {
								self.$message({
									type: 'success',
									message: '修改成功',
									duration: 2000
								});
								self.$emit('changeComp', 'sectionList');
							}else{
								self.$message({
									type: 'warning',
									message: '修改失败',
									duration: 2000
								});
							}
						},function(response){})
					}
				});

			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$emit('changeComp', 'sectionList');
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	
</style>