<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="名称：" prop="oilsStationName">
					<el-input v-model="addInfo.oilsStationName"></el-input>
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
				<el-form-item label="经营方式：" prop="businessType">
					<el-select v-model="addInfo.businessType">
						<el-option v-for="(item,index) in businessTypes" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="加油机数量：" prop="refuelingMachineNumber">
					<el-input v-model="addInfo.refuelingMachineNumber"></el-input>
				</el-form-item>
				<el-form-item label="油品种类：" prop="oils">
					<el-checkbox-group v-model="addInfo.oils" @change="handleCheckedOilsChange">
				   		<el-checkbox v-for="(item,index) in oils" :label="item.oilCode" :key="item.oilCode">{{item.oilName}}</el-checkbox>
				    </el-checkbox-group>
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
					oilsStationName: '',
					distribution:'',
					measure: '',
					businessType: '',
					refuelingMachineNumber:'',
					oils:[],
				},
				oils: [],
				businessTypes: [],
				distributions: [],
				rules: {
					oilsStationName: [{
						required: true,
						validator: validateRules.isItemName,
						trigger: 'blur'
					}],
					distribution: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
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
					refuelingMachineNumber: [
					{ required: true, message: '请输入加油机数量', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					},
					
					],
					oils: [{
						trigger: 'change',
						required: true,
						message: '请至少选择一个油品种类',
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
			
			//加油品种
			if(self.$store.state.app.commonVariable.oils) {
				self.oils = self.$store.state.app.commonVariable.oils;
			} else {
				self.$http.get(self.api.getOils, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.oils = response.data.oils;
					self.$store.dispatch('setCommonVariable', {
						oils: self.oils
					});
				}, function(response) {})
			}
		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addGasInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								oilsStationInfo: self.addInfo
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
						},function(response){
			                //失败回调
			            })
					}
				});

			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$emit('changeComp', 'sectionList');
			},
		    handleCheckedOilsChange(value) {
		        let checkedCount = value.length;
		       
		    }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>