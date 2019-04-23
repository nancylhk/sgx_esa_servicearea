<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="名称：" prop="serviceName">
					<el-input v-model="addInfo.serviceName"></el-input>
				</el-form-item>
				<el-form-item label="面积：" prop="measure">
					<el-input v-model="addInfo.measure"></el-input><span class="unit">㎡</span>
				</el-form-item>
				<el-form-item label="电话：" prop="tel">
					<el-input v-model="addInfo.tel"></el-input>
				</el-form-item>
				<el-form-item label="所在区域：" prop="distribution">
					<el-select v-model="addInfo.distribution">
						<el-option
					      v-for="(item,index) in distributions"
					      :key="item.distributionCode"
					      :label="item.distributionName"
					      :value="item.distributionCode">
					   </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="经营方式：" prop="businessType">
					<el-select v-model="addInfo.businessType">
						<el-option v-for="(item,index) in businessTypes" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="营业范围：" prop="range">
					<el-select v-model="addInfo.range" multiple >
						<el-option
					      v-for="(item,index) in businessRanges"
					      :key="item.rangeCode"
					      :label="item.rangeName"
					      :value="item.rangeCode">
					    </el-option>
					</el-select>
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
		name: 'sectionAdd',
		data() {
			return {
				addInfo: {
					serviceName: '',
					measure: '',
					businessType: '',
					range:'',
					distribution:'',
					tel:''
				},
				businessTypes: [],
				businessRanges:[],
				distributions:[],
				rules: {
					serviceName: [{
						required: true,
						validator: validateRules.isItemName,
						trigger: 'blur'
					}],
					measure: [
					{ required: true, message: '请输入面积', trigger: 'blur' },
					{
						validator: validateRules.isNumber,
						trigger: 'blur',
						required: true,
					}],
					businessType: [{
						trigger: 'change',
						required: true,
						message: '请选择经营方式',
					}],
					range: [{
						trigger: 'change',
						required: true,
						message: '请至少选择一个营业范围',
					}],
					distribution: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
					}],
					tel: [{
						validator: validateRules.isPhoneOrMobile,
						trigger: 'blur',
						required: true,
					}],
				}
			};
		},
		created() {
			var self = this;
			//经营方式
			if(self.$store.state.app.commonVariable.businessTypes) {	
				self.businessTypes = self.$store.state.app.commonVariable.businessTypes;
			} else {
				self.$http.get(self.api.getBusinessType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.businessTypes = response.data.businessTypes;
					self.$store.dispatch('setCommonVariable', {
						businessTypes: self.businessTypes
					});
				}, function(response) {})
			}
			
			//分布形式
			if(self.$store.state.app.commonVariable.distributions){
				self.distributions = self.$store.state.app.commonVariable.distributions;
			}else{
				self.$http.get(self.api.getDistribution, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.distributions =response.data.distributions;
					self.$store.dispatch('setCommonVariable',{distributions: self.distributions});
				}, function(response) {})
			}

			//经营范围
			if(self.$store.state.app.commonVariable.automaticBusinessRanges) {
				self.businessRanges = self.$store.state.app.commonVariable.automaticBusinessRanges;
			} else {
				self.$http.get(self.api.getAutomaticBusinessRange, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.businessRanges = response.data.automaticBusinessRanges;
					self.$store.dispatch('setCommonVariable', {
						automaticBusinessRanges: self.businessRanges
					});
				}, function(response) {})
			}
		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addCarRepaireInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								info: self.addInfo
							}
						},function(response){
							if(response.data) {
								self.$message({
									type: 'success',
									message: '新增成功',
									duration: 2000
								});
								self.$emit('changeComp', 'sectionList');
							}else{
								self.$message({
									type: 'warning',
									message: '新增失败',
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