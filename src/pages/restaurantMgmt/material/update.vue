<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="110px" size="mini">
			<div class="mt30">
				<el-form-item label="商品名称：" prop="commodityName">
					<el-input v-model="addInfo.commodityName"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="条形码：" prop="barCode">
					<el-input v-model="addInfo.barCode" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="规格：" :inline="true" prop="specification">
					<el-input v-model="addInfo.specification"></el-input>
				</el-form-item>
				<el-form-item label="规格单位：" :inline="true" prop="specificationID">
					<el-input v-model="addInfo.specificationID"></el-input>
				</el-form-item>
				<el-form-item label="库存上限：" prop="stockTopLimit">
					<el-input v-model="addInfo.stockTopLimit"></el-input>
				</el-form-item>
				<el-form-item label="库存下限：" prop="stockBootLimit">
					<el-input v-model="addInfo.stockBootLimit"></el-input>
				</el-form-item>
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
				<el-form-item label="是否打印杯贴：" prop="isPrint">
					<el-select v-model="addInfo.isPrint" placeholder="是否打印">
						<el-option label="是" value="1"></el-option>
						<el-option label="否" value="0"></el-option>
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
	export default {
		name: 'sectionUpdate',
		data() {
			return {
				addInfo: {
					commodityName: '',
					barCode:'',
					specification: '',
					specificationID: '',
					stockTopLimit: '',
					stockBootLimit: '',
					commont: '',
					markets: [],
					isPrint:'',
				},
				allMarket: [],
				rules: {
					
				}
			};
		},
		mounted(){
			var self = this;
			self.getViewInfo();
		},
		created() {
			let self = this;
			this.$http.get(this.api.getAllMarket, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			},function(response){
				self.allMarket = response.data.dataArr;
			},function(response){
                //失败回调
            })
		},
		methods: {
			getViewInfo(){
				var self = this;
				this.$http.get(this.api.getCommodityInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						commodityID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.addInfo = response.data.dataObj;
						var marketTemp = response.data.dataObj.markets ;
						self.addInfo.markets = [];
						for(var i=0;i< marketTemp.length;i++){
							self.addInfo.markets.push(marketTemp[i].marketID)
						}
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
</style>