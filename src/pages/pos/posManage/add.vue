<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="POS机编号：" prop="propertyId">
					<el-input v-model="addInfo.propertyId"></el-input>
				</el-form-item>
				<el-form-item label="条形码：" prop="barCode">
					<el-input v-model="addInfo.barCode"></el-input>
				</el-form-item>
				<el-form-item label="品牌：" prop="brand">
					<el-input v-model="addInfo.brand"></el-input>
				</el-form-item>
				<el-form-item label="制造商：" prop="producter">
					<el-input v-model="addInfo.producter"></el-input>
				</el-form-item>
				<el-form-item label="产地：" prop="originPlace">
					<el-input v-model="addInfo.originPlace"></el-input>
				</el-form-item>
				<el-form-item label="维修电话：" prop="repairTel">
					<el-input  v-model="addInfo.repairTel"></el-input>
				</el-form-item>
				<el-form-item label="使用店铺：" prop="shopId">
					<el-select v-model="addInfo.shopId">
						<el-option v-for="(item,index) in shopList" :key="item.shopId" :label="item.shopName" :value="item.shopId">
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
					propertyId  :'',
					brand: '',
					producter: '',
					originPlace:'',
					repairTel:'',
					barCode:'',
					shopId:'',
				},
				shopList:[],
				rules: {
					brand: [{
						required: true,
						message: '请输入品牌',
						trigger: 'blur'
					}],
					propertyId: [{
						required: true,
						message: '请输入POS机编号',
						trigger: 'blur'
					}],
					producter: [{
						required: true,
						message: '请输入制造商',
						trigger: 'blur'
					}],
					originPlace: [{
						required: true,
						message: '请输入产地',
						trigger: 'blur'
					}],
					repairTel: [{
						required: true,
						validator: validateRules.isPhoneOrMobile,
						trigger: 'blur'
					}],
					barCode: [{
						required: true,
						message: '请输入条形码',
						trigger: 'blur'
					}],
					shopId: [{
						required: true,
						message: '请选择店铺',
						trigger: 'change'
					}],
				}
			};
		},
		created() {
			var self = this;
			//店铺列表
			self.$http.get(self.api.getShopName, {
				params: {
					accessToken: self.$store.state.user.token,
				}
			},function(response){
				if(response.status == 200) {
					self.shopList = response.data.shopNameLists;
				}
			},function(response){ })
		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addPosdev, {
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