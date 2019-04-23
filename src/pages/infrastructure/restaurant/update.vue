<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="名称：" prop="restaurantName">
					<el-input v-model="addInfo.restaurantName"></el-input>
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
				<el-form-item label="定价方式：" prop="pricingType">
					<el-select v-model="addInfo.pricingType">
						<el-option v-for="(item,index) in pricingTypes" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="营业范围：" prop="businessRange">
					<!--<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addInfo.businessRange"></el-input>-->
					<el-select v-model="addInfo.businessRange" multiple>
						<el-option v-for="(item,index) in resturantBusinessRanges" :key="item.rangeCode" :label="item.rangeName" :value="item.rangeCode">
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
		name: 'sectionUpdate',
		data() {
			return {
				addInfo: {},
				businessTypes: [],
				distributions: [],
				pricingTypes: [],
				resturantBusinessRanges: [],
				rules: {
					restaurantName: [{
						required: true,
						validator: validateRules.isItemName,
						trigger: 'blur'
					}],
					distribution: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
					}],
					measure: [{
							required: true,
							message: '请输入面积',
							trigger: 'blur'
						},
						{
							validator: validateRules.isNumber,
							trigger: 'blur',
							required: true,
						}
					],
					businessType: [{
						trigger: 'change',
						required: true,
						message: '请选择经营方式',
					}],
					pricingType: [{
						trigger: 'change',
						required: true,
						message: '请选择定价方式',
					}],
					businessRange: [{
						trigger: 'change',
						required: true,
						message: '请至少选择一个营业范围',
						//message: "请输入营业范围以逗号分割",
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
			//定价方式
			if(self.$store.state.app.commonVariable.pricingTypes) {
				self.pricingTypes = self.$store.state.app.commonVariable.pricingTypes;
			} else {
				self.$http.get(self.api.getPricingType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.pricingTypes = response.data.pricingTypes;
					self.$store.dispatch('setCommonVariable', {
						pricingTypes: self.pricingTypes
					});
				}, function(response) {})
			}

			//经营范围
			if(self.$store.state.app.commonVariable.restaurantBusinessRanges) {
				self.resturantBusinessRanges = self.$store.state.app.commonVariable.restaurantBusinessRanges;
			} else {
				self.$http.get(self.api.getResturantBusinessRange, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.resturantBusinessRanges = response.data.restaurantBusinessRanges;
					self.$store.dispatch('setCommonVariable', {
						restaurantBusinessRanges: self.restaurantBusinessRanges
					});
				}, function(response) {})
			}
		},
		mounted() {
			var self = this;
			self.getViewInfo();
		},
		methods: {
			getViewInfo() {
				var self = this;
				this.$http.get(this.api.getRestaurantForUpdate, {
					params: {
						restaurantID: this.$store.state.app.viewId,
					}
				}, function(response) {
					if(response.status == 200) {
						self.addInfo = response.data;
						/*self.addInfo.distribution = self.addInfo.distribution.distributionCode;
						self.addInfo.pricingType = self.addInfo.pricingType.pricingTypeCode;
						self.addInfo.businessType = self.addInfo.businessType.businessTypeCode;
						self.addInfo.businessRange = [self.addInfo.businessRange.restaurantBusinessRangeCode];*/

					}
				}, function(response) {
					//失败回调
				})
			},
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.updateRestaurantInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								restaurantID: this.$store.state.app.viewId,
								info: self.addInfo
							}
						}, function(response) {
							if(response.data) {
								self.$message({
									type: 'success',
									message: '修改成功',
									duration: 2000
								});
								self.$emit('changeComp', 'sectionList');
							} else {
								self.$message({
									type: 'warning',
									message: '修改失败',
									duration: 2000
								});
							}
						}, function(response) {
							//失败回调
						})
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