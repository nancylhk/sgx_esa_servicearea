<template>
	<div class="app-form mt20 ml40">
		<h5 class="info-tit">基本信息</h5>
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="110px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="菜品名称：" prop="dishName" >
					<el-input v-model="addInfo.dishName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="条形码：" prop="barCode" :disabled="true">
					<el-input v-model="addInfo.barCode" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="出售类型：" prop="dishType">
					<el-select v-model="addInfo.dishType">
						<el-option
					      v-for="(item,index) in commodityTypes"
					      :key="item.commodityCode"
					      :label="item.commodityName"
					      :value="item.commodityCode">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="规格" required class="re-el-item">
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
				<el-form-item label="销售餐厅：" prop="restaurants">
					<el-select v-model="addInfo.restaurants" multiple placeholder="请选择店铺">
						<el-option
					      v-for="(item,index) in allRestaurant"
					      :key="item.restaurantID"
					      :label="item.restaurantName"
					      :value="item.restaurantID">
					    </el-option>
					</el-select>
				</el-form-item>
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
		name: 'sectionAdd',
		data() {
			return {
				addInfo: {
					
				},
				allRestaurant:[],
				commodityLevels:[],
				guaranteePeriods:[],
				specifications:[],
				commodityTypes:[],
				rules: {
					dishType: [{
						trigger: 'change',
						required: true,
						message: '请选择出售类型',
					}],
					specification: [{
						trigger: 'change',
						required: true,
						message: '请选择规格单位',
					}],
					specificationNum: [
					{ required: true, message: '请输入规格', trigger: 'blur' },
					{
						trigger: 'blur',
						required: true,
						validator: validateRules.isInteger,
					}],
					restaurants: [{
						trigger: 'change',
						required: true,
						message: '请至少选择一个销售餐厅',
					}],
				}
			};
		},
		created() {
			let self = this;
			//获取所有餐厅
			this.$http.get(this.api.getRestaurants, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				self.allRestaurant = response.data;
			},function(response){
	                //失败回调
	        })
			
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
		},
		mounted(){
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getDishForUpdate,{
					params: {
						accessToken: self.$store.state.user.token,
						dishID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.addInfo = response.data;
					}
				},function(response){
	                //失败回调
	            })
			},
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.updateDishInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								dishID:this.$store.state.app.viewId,
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