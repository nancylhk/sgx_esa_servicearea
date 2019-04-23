<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="名称：" prop="parkingName">
					<el-input v-model="addInfo.parkingName"></el-input>
				</el-form-item>
				<el-form-item label="面积：" prop="measure">
					<el-input v-model="addInfo.measure"></el-input><span class="unit">㎡</span>
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
				<el-form-item label="小客车停车位数：" prop="minibusParkingNumber">
					<el-input v-model="addInfo.minibusParkingNumber"></el-input><span class="unit">个</span>
				</el-form-item>
				<el-form-item label="大客车停车位数：" prop="busParkingNumber">
					<el-input v-model="addInfo.busParkingNumber"></el-input><span class="unit">个</span>
				</el-form-item>
				<el-form-item label="货车停车位数：" prop="truckParkingNumber">
					<el-input v-model="addInfo.truckParkingNumber"></el-input><span class="unit">个</span>
				</el-form-item>
				<el-form-item label="危险品停车位数：" prop="dangerCarryingNumber">
					<el-input v-model="addInfo.dangerCarryingNumber"></el-input><span class="unit">个</span>
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
					parkingName: '',
					measure: '',
					distribution:'',
					minibusParkingNumber:'',
					busParkingNumber:'',
					truckParkingNumber:'',
					dangerCarryingNumber:''

				},
				distributions:[],
				rules: {
					parkingName: [{
						required: true,
						validator: validateRules.isItemName,
						trigger: 'blur'
					}],
					distribution: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
					}],
					measure:[
					{ required: true, message: '请输入面积', trigger: 'blur' },
					{
						validator: validateRules.isNumber,
						trigger: 'blur',
						required: true,
					}],
					dangerCarryingNumber:[
					{ required: true, message: '请输入危险品停车位数', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					}],
					minibusParkingNumber:[
					{ required: true, message: '请输入小客车停车位数', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					}],
					busParkingNumber:[
					{ required: true, message: '请输入大客车停车位数', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					}],
					truckParkingNumber:[
					{ required: true, message: '请输入货车停车位数', trigger: 'blur' },
					{
						validator: validateRules.isInteger,
						trigger: 'blur',
						required: true,
					}],
				}
			}
		},
		created(){
			var self = this;
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
		},
		mounted(){
			var self = this;
			self.getViewInfo();
		},
		methods: {
			getViewInfo(){
				var self = this;
				this.$http.get(this.api.getCarParkInfoForUpdate,{
					params: {
						parkingID: this.$store.state.app.viewId,
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
						self.$http.get(self.api.updateCarParkInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								parkingID: this.$store.state.app.viewId,
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