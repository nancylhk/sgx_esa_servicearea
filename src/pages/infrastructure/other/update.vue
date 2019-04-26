<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="设施名称：" prop="infrastructureName">
					<el-input v-model="addInfo.infrastructureName"></el-input>
				</el-form-item>
				<el-form-item label="设施数目：" prop="infrastructureNum">
					<el-input v-model="addInfo.infrastructureNum"></el-input>
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
					infrastructureId:'',
					infrastructureName:'',
					infrastructureNum:''
				},
				rules: {
					infrastructureName: [{
						required: true,
						message: '请输入设施名称',
						trigger: 'blur'
					},
					{ min: 1, max: 255, message: '长度在 1 到 255 位', trigger: 'blur' },],
					
					infrastructureNum: [{
							required: true,
							message: '请输入设施数目',
							trigger: 'blur'
						},
						{ min: 1, max: 8, message: '长度在 1 到 8 位', trigger: 'blur' },
						{
							validator: validateRules.isInteger,
							trigger: 'blur',
							required: true,
						},

					],
					
				}
			};
		},
		created() {
			
		},
		mounted(){
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getOtherInfrastructureInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						InfrastructureID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.addInfo = response.data;
						console.log(self.addInfo)
					}
				},function(response){})
			},
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.updateOtherInfrastructure, {
							params: {
								accessToken: self.$store.state.user.token,
								info:self.addInfo
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