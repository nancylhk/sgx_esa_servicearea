<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="110px" size="mini" >
			<div class="mt30">
				<el-form-item label="商品名称：" prop="commodityName">
					<el-input v-model="addInfo.commodityName"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="条形码：" prop="barCode">
					<el-input v-model="addInfo.barCode" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="规格：" required class="re-el-item">
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
				
				<!--<el-form-item label="库存上限：" prop="stockTopLimit">
					<el-input v-model="addInfo.stockTopLimit"></el-input>
				</el-form-item>
				<el-form-item label="库存下限：" prop="stockBootLimit">
					<el-input v-model="addInfo.stockBootLimit"></el-input>
				</el-form-item>-->
				<el-form-item label="销售店铺：" prop="markets">
					<el-select v-model="addInfo.markets" multiple placeholder="请选择店铺">
						<el-option
					      v-for="(item,index) in allMarket"
					      :key="item.marketID"
					      :label="item.marketName"
					      :value="item.marketID">
					    </el-option>
					</el-select>
				</el-form-item>
				<!--<el-form-item label="是否打印杯贴：" prop="isPrint">
					<el-select v-model="addInfo.isPrint" placeholder="是否打印">
						<el-option label="是" value="1"></el-option>
						<el-option label="否" value="0"></el-option>
					</el-select>
				</el-form-item>-->
				<el-form-item label="备注：" prop="commont">
					<el-input v-model="addInfo.commont"></el-input>
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
				addInfo: {
					
				},
				allMarket: [],
				specifications:[],
				priceUnits:[],
				rules: {
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
					isPrint: [{
						trigger: 'change',
						required: true,
						message: '请选择是否打印杯贴',
					}],
				}
			};
		},
		mounted(){
			var self = this;
			self.getViewInfo();
		},
		created() {
			let self =  this;
			this.$http.get(this.api.getAllMarket, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				self.allMarket = response.data;
			},function(response){})
			
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
			getViewInfo(){
				var self = this;
				this.$http.get(this.api.getCommodityInfoForUpdate,{
					params: {
						accessToken: self.$store.state.user.token,
						commodityID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.addInfo = response.data;
//						var marketTemp = response.data.markets ;
//						self.addInfo.markets = [];
//						for(var i=0;i< marketTemp.length;i++){
//							self.addInfo.markets.push(marketTemp[i].marketID)
//						}
					}
				},function(response){
                	//失败回调
            	})
			},
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.updateCommodityInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								commodityID:this.$store.state.app.viewId,
								info: self.addInfo,
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