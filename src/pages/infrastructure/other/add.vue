<template>
    <div>
        <div class="app-form mt20 ml40">
            <el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini" :inline-message="true">
                <div class="mt30">
                    <el-form-item label="设施名称：" prop="InfrastructureName">
                        <el-input v-model="addInfo.InfrastructureName"></el-input>
                    </el-form-item>
                    <el-form-item label="设施数目：" prop="num">
                        <el-input v-model="addInfo.num"></el-input>
                    </el-form-item>                   
                </div>
            </el-form>
            <div class="mt40 ml40">
                <el-button type="primary" @click="submitForm('addInfo')">确定</el-button>
                <el-button @click="resetForm('addInfo')">取消</el-button>
            </div>
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
					InfrastructureName: '',
					num: '',
				},
				rules: {
					InfrastructureName: [{
						required: true,
						validator: validateRules.isItemName,
						trigger: 'blur'
					}],									
					num: [{
							required: true,
							message: '请输入设施数目',
							trigger: 'blur'
						},
						{
							validator: validateRules.isInteger,
							trigger: 'blur',
							required: true,
						}
					],
				}
			};
		},
		created() {
			var self = this;			
		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addOtherInfrastructure, {
							params: {
								accessToken: self.$store.state.user.token,
								info:self.addInfo
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
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>