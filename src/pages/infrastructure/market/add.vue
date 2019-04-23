<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="名称：" prop="shopName">
					<el-input v-model="addInfo.shopName"></el-input>
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
				<el-form-item label="商铺类型" prop="shopType">
					<el-select v-model="addInfo.shopType" @change ="getShopBusinessRange">
						<el-option v-for="(item,index) in shopTypeList" :key="item.shopTypeCode" :label="item.shopTypeName" :value="item.shopTypeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="营业范围：" prop="businessRange">
					<el-select v-model="addInfo.businessRange" multiple >
					    <el-option v-for="(item,index) in businessRanges" :key="item.businessRangeCode" :label="item.businessRangeName" :value="item.businessRangeCode">
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
			/* 校验名称*/
			var marketNameIsNoExist = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请输入名称'));
				}
				const reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){4,25}$/;
				if(!reg.test(value)) {
					callback(new Error('名称长度必须为5-26个字符之间，可包含中文、英文、数字'));
				} else {
					this.$http.get(this.api.getMarketNameIsNoExist, {
						params: {
							accessToken: this.$store.state.user.token,
							marketName: value
						}
					}, function(response) {
						if(response.data) {
							callback();
						} else {
							callback(new Error('该名称已经存在'));
						}
					}, function(response) {}, false)
				}
			};
			return {
				addInfo: {
					shopName: '',
					distribution: '',
					measure: '',
					businessType: '',
					pricingType: '',
					businessRange: [],
					shopType:''
				},
				
				businessTypes: [],
				distributions: [],
				pricingTypes: [],
				businessRanges: [],
				shopTypeList:[],
				rules: {
					shopName: [{
						required: true,
						validator: marketNameIsNoExist,
						trigger: 'blur'
					}, ],
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
					shopType: [{
						trigger: 'change',
						required: true,
						message: '请选择商铺类型',
					}],
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
						message: "请选择营业范围",
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
			//店铺类型
			self.$http.get(self.api.getShopType, {
				params: {
					accessToken: self.$store.state.user.token,
				}
			}, function(response) {
				self.shopTypeList = response.data.shopTypes;
			}, function(response) {})
		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addMarketInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								info: self.addInfo
							}
						}, function(response) {
							if(response.data) {
								self.$message({
									type: 'success',
									message: '新增成功',
									duration: 2000
								});
								self.$emit('changeComp', 'sectionList');
							} else {
								self.$message({
									type: 'warning',
									message: '新增失败',
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
			},
			getShopBusinessRange(){
				let self = this;
				self.addInfo.businessRange = [];
				self.businessRanges = [];
				
				self.$http.get(self.api.getShopBusinessRange, {
					params: {
						accessToken: self.$store.state.user.token,
						shopType:self.addInfo.shopType 
					}
				}, function(response) {
					self.businessRanges = response.data;
					/*self.$store.dispatch('setCommonVariable', {
						marketBusinessRanges: self.businessRanges
					});*/
				}, function(response) {})
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>