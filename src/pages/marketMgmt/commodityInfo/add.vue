<template>
	<div class="app-form mt20 ml40">
		<h5 class="info-tit">基本信息</h5>
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="110px" size="mini">
			<div class="mt30">
				<el-form-item label="条形码：" prop="barCode"  class="inbk" >
					<el-input v-model="addInfo.barCode"></el-input>
				</el-form-item>
				<el-form-item label="商品名称：" prop="productName" class="form-right">
					<el-input v-model="addInfo.productName"></el-input>
				</el-form-item>
				<el-form-item label="生产商：" prop="producer"  class="inbk">
					<el-input v-model="addInfo.producer"></el-input>
				</el-form-item>
				<el-form-item label="产地：" prop="originPlace" class="form-right">
					<el-input v-model="addInfo.originPlace"></el-input>
				</el-form-item>
				<el-form-item label="出售类型：" prop="commodityType"  class="inbk">
					<el-select v-model="addInfo.commodityType">
						<el-option
					      v-for="(item,index) in commodityTypes"
					      :key="item.commodityCode"
					      :label="item.commodityName"
					      :value="item.commodityCode">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="等级：" prop="commodityLevel" class="form-right">
					<el-select v-model="addInfo.commodityLevel">
						<el-option
					      v-for="(item,index) in commodityLevels"
					      :key="item.levelCode"
					      :label="item.levelName"
					      :value="item.levelCode">
					    </el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="规格" required class="re-el-item inbk">
			      <el-form-item prop="specificationNum" class="inbk">
			        <el-input v-model="addInfo.specificationNum"></el-input>
			      </el-form-item>
			      <el-form-item prop="specification" class="inbk">
			        <el-select v-model="addInfo.specification">
						<el-option
					      v-for="(item,index) in specifications"
					      :key="item.specificationCode"
					      :label="item.specificationName"
					      :value="item.specificationCode">
					    </el-option>
					</el-select>
			      </el-form-item>
  				</el-form-item>
  				
				<el-form-item label="保质期" required class="re-el-item form-right">
			      <el-form-item prop="guaranteePeriodNum" class="inbk">
			        <el-input v-model="addInfo.guaranteePeriodNum"></el-input>
			      </el-form-item>
			      <el-form-item prop="guaranteePeriod" class="inbk">
			        <el-select v-model="addInfo.guaranteePeriod">
						<el-option
					      v-for="(item,index) in guaranteePeriods"
					      :key="item.periodCode"
					      :label="item.periodName"
					      :value="item.periodCode">
					    </el-option>
					</el-select>
			      </el-form-item>
  			</el-form-item>
			</div>
			<h5 class="info-tit mt40">出售信息</h5>
			<div class="mt30">
				<el-form-item label="出售价格：" prop="price"   class="inbk">
					<el-input v-model="addInfo.price"></el-input><span class="unit">元</span>
				</el-form-item>
				<el-form-item label="计价单位：" prop="priceUnit" class="form-right">
					<el-select v-model="addInfo.priceUnit">
						<el-option
					      v-for="(item,index) in priceUnits"
					      :key="item.priceUnitID"
					      :label="item.priceUnitName"
					      :value="item.priceUnitID">
					    </el-option>
					</el-select>
				</el-form-item>
				<!--<el-form-item label="库存上限：" prop="stockTopLimit" class="inbk">
					<el-input v-model="addInfo.stockTopLimit"></el-input>
				</el-form-item>
				<el-form-item label="库存下限：" prop="stockBootLimit" class="form-right">
					<el-input v-model="addInfo.stockBootLimit"></el-input>
				</el-form-item>-->
				<el-form-item label="销售店铺：" prop="markets" class="inbk">
					<el-select v-model="addInfo.markets" multiple>
						<el-option
					      v-for="(item,index) in allMarket"
					      :key="item.marketID"
					      :label="item.marketName"
					      :value="item.marketID">
					    </el-option>
					</el-select>
				</el-form-item>
				
				<!--<el-form-item label="是否打印杯贴：" prop="isPrint"  class="form-right">
					<el-select v-model="addInfo.isPrint">
						<el-option label="是" value="0"></el-option>
						<el-option label="否" value="1"></el-option>
					</el-select>
				</el-form-item>-->
				<el-form-item label="备注：" prop="commont" class="form-right">
					<el-input v-model="addInfo.commont"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div class="mt40 ml40">
			<el-button type="primary" @click="submitForm('addInfo')">提交审核</el-button>
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
			var barCodeIsNoExist = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('请输入条形码'));
				}else {
					this.$http.get(this.api.getCommodityIsNoExiste, {
						params: {
							accessToken: this.$store.state.user.token,
							barCode: value
						}
					}, function(response) {
						if(response.data) {
							callback();
						} else {
							callback(new Error('该条形码已经存在'));
						}
					}, function(response) {}, false)
				}
			};
			return {
				addInfo: {
					productName: '',
					barCode: '',
					commodityLevel: '',
					commodityType: '',
					originPlace: '',
					producer: '',
					specification: '',
					specificationNum: '',
					guaranteePeriod: '',
					guaranteePeriodNum:'',
					commont: '',
					price: '',
					priceUnit:'',
					stockTopLimit: '',
					stockBootLimit: '',
					markets: [],
					isPrint: '1',
				},
				allMarket: [],
				commodityLevels:[],
				guaranteePeriods:[],
				specifications:[],
				commodityTypes:[],
				priceUnits:[],
				rules: {
					productName: [{
						required: true,
						validator: validateRules.isItemName,
						trigger: 'blur'
					}],
					barCode:[{
						required: true,
						validator: barCodeIsNoExist,
						trigger: 'blur'
					}],
					originPlace:[{
						required: true,
						message: '请输入产地',
						trigger: 'blur'
					}],
					producer:[{
						required: true,
						message: '请输入生产商',
						trigger: 'blur'
					}],
					commodityType: [{
						trigger: 'change',
						required: true,
						message: '请选择出售类型',
					}],
					commodityLevel: [{
						trigger: 'change',
						required: true,
						message: '请选择等级',
					}],
					price: [
					{ required: true, message: '请输入价格', trigger: 'blur' },
					{
						validator: validateRules.isNumber,
						trigger: 'blur',
						required: true,
					}],
					guaranteePeriod: [{
						trigger: 'change',
						required: true,
						message: '请选择保质期单位',
					}],
					guaranteePeriodNum: [
					{ required: true, message: '请输入保质期', trigger: 'blur' },
					{
						trigger: 'blur',
						required: true,
						validator: validateRules.isInteger,
					}],
					specification: [{
						trigger: 'change',
						required: true,
						message: '请选择规格单位',
					}],
					specificationNum: [
					{ required: true, message: '请输入规格', trigger: 'blur' },{
						trigger: 'blur',
						required: true,
						validator: validateRules.isInteger,
					}],
					stockBootLimit: [
					{ required: true, message: '请输入库存下限', trigger: 'blur' },{
						trigger: 'blur',
						required: true,
						validator: validateRules.isInteger,
					}],
					stockTopLimit: [
					{ required: true, message: '请输入库存上限', trigger: 'blur' },
					{
						trigger: 'blur',
						required: true,
						validator: validateRules.isInteger,
					}],
					markets: [{
						trigger: 'change',
						required: true,
						message: '请至少选择一个销售店铺',
					}],
					priceUnit: [{
						trigger: 'change',
						required: true,
						message: '请选择计价单位',
					}],
					isPrint: [{
						trigger: 'change',
						required: true,
						message: '请选择是否打印杯贴',
					}],
				}
			};
		},
		created() {
			let self = this;
			this.$http.get(this.api.getAllMarket, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				self.allMarket = response.data;
			},function(response){})
			
			//获取商品等级
			if(self.$store.state.app.commonVariable.commodityLevels) {
				self.commodityLevels = self.$store.state.app.commonVariable.commodityLevels;
			} else {
				self.$http.get(self.api.getCommodityLevel, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.commodityLevels = response.data.commodityLevels;
					self.$store.dispatch('setCommonVariable', {
						commodityLevels: self.commodityLevels
					});
				}, function(response) {})
			}
			
			//保质期单位
			if(self.$store.state.app.commonVariable.guaranteePeriods) {
				self.guaranteePeriods = self.$store.state.app.commonVariable.guaranteePeriods;
			} else {
				self.$http.get(self.api.getGuaranteePeriod, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.guaranteePeriods = response.data.guaranteePeriods;
					self.$store.dispatch('setCommonVariable', {
						guaranteePeriods: self.guaranteePeriods
					});
				}, function(response) {})
			}
			
			//规格单位
			if(self.$store.state.app.commonVariable.specifications) {
				self.specifications = self.$store.state.app.commonVariable.specifications;
			} else {
				self.$http.get(self.api.getSpecification, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.specifications = response.data.specifications;
					self.$store.dispatch('setCommonVariable', {
						specifications: self.specifications
					});
				}, function(response) {})
			}
			
			//出售类别
			if(self.$store.state.app.commonVariable.commodityTypes) {
				self.commodityTypes = self.$store.state.app.commonVariable.commodityTypes;
			} else {
				self.$http.get(self.api.getCommodityType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.commodityTypes = response.data.commodityTypes;
					self.$store.dispatch('setCommonVariable', {
						commodityTypes: self.commodityTypes
					});
				}, function(response) {})
			}
			
			//计价单位
			if(self.$store.state.app.commonVariable.priceUnits) {
				self.priceUnits = self.$store.state.app.commonVariable.priceUnits;
			} else {
				self.$http.get(self.api.getPriceUnit, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.priceUnits = response.data;
					self.$store.dispatch('setCommonVariable', {
						priceUnits: self.priceUnits
					});
				}, function(response) {})
			}
		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						
						self.$http.get(self.api.addPublicStorageProduct, {
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
							} else {
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
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-form {
	.re-el-item {
	    margin-bottom: 0px;
		.el-input{
	        position: relative;
	        font-size: 12px;
	        display: inline-block;
	        width: 158px;
	    }
    }
}
</style>