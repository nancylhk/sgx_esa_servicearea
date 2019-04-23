<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="150px" size="mini" :inline-message="true">
			<div class="mt30">
				<el-form-item label="当前登录密码：" prop="oldPassword">
					<el-input v-model="addInfo.oldPassword" type="password"></el-input>
				</el-form-item>
				<el-form-item label="新的登录密码" prop="newPassword">
					<el-input v-model="addInfo.newPassword" type="password"></el-input>
				</el-form-item>
				<el-form-item label="确认新的登录新密码：" prop="newPswConfirm">
					<el-input v-model="addInfo.newPswConfirm" type="password"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div class="mt40 ml40">
			<el-button type="primary" @click="submitForm('addInfo')">确定</el-button>
			<el-button @click="resetForm()">取消</el-button>
		</div>
	</div>

</template>
<script>
	import validateRules from '../../../utils/validate';
	import axios from 'axios';
	export default {
		name: 'modifyPswComp',
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.addInfo.newPassword) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				addInfo: {
					newPassword: '',
					newPswConfirm: '',
				},
				rules: {
					oldPassword: [{
						required: true,
						trigger: 'blur',
						message: '请输入旧密码',
					}],
					newPassword: [{
						required: true,
						trigger: 'blur',
						message: '请输入新密码',
					}],
					newPswConfirm: [{
						validator: validatePass,
						trigger: 'blur',
						required: true,
					}],
					/*multipartFile: [{
						trigger: 'change',
						required: true,
						message: '请选择流程文件',
					}],*/
				}
			};
		},
		watch: {

		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.changePassword, {
							params: {
								accessToken: self.$store.state.user.token,
								userId: self.$store.state.app.viewId,
								oldPassword: self.addInfo.oldPassword,
								newPassword: self.addInfo.newPassword
							}
						}, function(response) {
							if(response.data) {
								self.$message({
									type: 'success',
									message: '修改成功',
									duration: 2000
								});
								self.$emit('changeComp', 'listComp');
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
				this.$emit('changeComp', 'listComp', '');
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>