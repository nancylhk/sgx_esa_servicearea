<template>
	<div class="app-form mt20 ml40">
		<div v-show="isShow">
			<el-form :model="formerInfo" :rules="rules" ref="formerInfo" label-width="120px" size="mini" :inline-message="true">
				<div class="mt30">
					<p class="former-tit"><span>绑定手机号码：{{userInfo.userTel}}</span></p>
					<el-form-item label="请输入验证码：" prop="checkNumber">
						<el-input v-model="formerInfo.checkNumber"></el-input>
						<button @click="sendVerifyCode()" class="verify-btn" :disabled="!verifyShow" type="button">
					         <span v-show="verifyShow">获取验证码</span>
					         <span v-show="!verifyShow" class="count">{{count}}后重新发送</span>
					    </button>
					</el-form-item>
				</div>
			</el-form>
			<div class="mt40">
				<el-button type="primary" @click="confirmVerifyCode('formerInfo')">确定</el-button>
			</div>
		</div>
		<div v-show="!isShow">
			<el-form :model="lastInfo" :rules="rules" ref="lastInfo" label-width="120px" size="mini" :inline-message="true">
				<div class="mt30">
					<el-form-item label="手机号码" prop="newPhoneNumber">
						<el-input v-model="lastInfo.newPhoneNumber"></el-input>
					</el-form-item>
					<el-form-item label="验证码：" prop="newCheckNumber">
						<el-input v-model="lastInfo.newCheckNumber"></el-input>
						<button @click="sendNewPhoneVerifyCode()" class="verify-btn" :disabled="!verifyShow1" type="button">
					         <span v-show="verifyShow1">获取验证码</span>
					         <span v-show="!verifyShow1" class="count">{{count1}}后重新发送</span>
					    </button>
					</el-form-item>
				</div>
			</el-form>
			<div class="mt40 ml40">
				<el-button type="primary" @click="confirmNewPhoneVerifyCode('lastInfo')">确认</el-button>
				<el-button @click="isShow=true">返回上一级</el-button>
			</div>
		</div>
	</div>

</template>
<script>
	import validateRules from '../../../utils/validate';
	import axios from 'axios';
	const TIME_COUNT = 60;
	export default {
		name: 'modifyPhoneComp',
		data() {
			return {
				userInfo: this.$store.state.app.viewId,
				isShow: true,
				formerInfo: {
					checkNumber: '',
				},
				lastInfo: {
					newPhoneNumber: '',
					newCheckNumber: '',
				},
				verifyShow: true,
				verifyShow1: true,
				count: '',
				count1: '',
				timer: null,
				timer1: null,
				rules: {
					checkNumber: [{
						required: true,
						trigger: 'blur',
						message: '请输入验证码',
					}],
					newPhoneNumber: [{
						required: true,
						trigger: 'blur',
						message: '请输入新的手机号码',
					}],
					newCheckNumber: [{
						required: true,
						trigger: 'blur',
						message: '请输入验证码',
					}],
				}
			};
		},
		created() {

		},
		mounted() {

		},
		methods: {
			sendVerifyCode() {
				let self = this;
				if(!self.timer) {
					self.$http.get(self.api.getCheckNumberBefore, {
						params: {
							accessToken: self.$store.state.user.token,
							userId: self.userInfo.userId,
						}
					}, function(response) {
						if(response.data) {
							self.count = TIME_COUNT;
							self.verifyShow = false;
							self.timer = setInterval(() => {
								if(self.count > 1 && self.count <= TIME_COUNT) {
									self.count--;
								} else {
									self.verifyShow = true;
									clearInterval(self.timer);
									self.timer = null;
								}
							}, 1000)
						} else {
							self.$message({
								type: 'warning',
								message: '验证码发送失败',
								duration: 2000
							});
						}
					}, function(response) {
						//失败回调
					})
				}

			},
			confirmVerifyCode(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.checkNumberBefore, {
							params: {
								accessToken: self.$store.state.user.token,
								userId: self.userInfo.userId,
								checkNumber: self.formerInfo.checkNumber
							}
						}, function(response) {
							if(response.data) {
								/*self.$message({
									type: 'success',
									message: '验证成功',
									duration: 2000
								});*/
								self.isShow = false;
								//self.$emit('changeComp', 'listComp');
							} else {
								self.$message({
									type: 'warning',
									message: '验证失败',
									duration: 2000
								});
							}
						}, function(response) {
							//失败回调
						})
					}
				});
			},
			sendNewPhoneVerifyCode() {
				let self = this;
				const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(self.lastInfo.newPhoneNumber == '') {
					self.$message({
						showClose: true,
						message: "请输入手机号码",
						type: 'error'
					});
				} else if(!reg.test(self.lastInfo.newPhoneNumber)) {
					self.$message({
						showClose: true,
						message: "手机号码格式不正确",
						type: 'error'
					});
				} else {
					if(!self.timer1) {
						self.$http.get(self.api.getPhoneCheckNumber, {
								params: {
									accessToken: self.$store.state.user.token,
									phoneNumber: self.lastInfo.newPhoneNumber,
								}
							}, function(response) {
								if(response.data) {
									self.count1 = TIME_COUNT;
									self.verifyShow1 = false;
									self.timer1 = setInterval(() => {
										if(self.count1 > 1 && self.count1 <= TIME_COUNT) {
											self.count1--;
										} else {
											self.verifyShow1 = true;
											clearInterval(self.timer1);
											self.timer1 = null;
										}
									}, 1000)
								} else {
									self.$message({
										type: 'error',
										message: '验证码发送失败',
										duration: 2000
									});
								}
							},
							function(response) {})
					}
				}
			},
			confirmNewPhoneVerifyCode(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.changePhoneNumber, {
							params: {
								accessToken: self.$store.state.user.token,
								userId: self.userInfo.userId,
								phoneNumber: self.lastInfo.newPhoneNumber,
								checkNumber: self.lastInfo.newCheckNumber,

							}
						}, function(response) {
							if(response.data) {
								self.$message({
									type: 'success',
									message: '手机绑定修改成功',
									duration: 2000
								});
								self.$emit('changeComp', 'listComp');
							} else {
								self.$message({
									type: 'warning',
									message: '手机绑定修改失败',
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
	.app-form .el-form-item .el-input {
		position: relative;
		font-size: 12px;
		display: inline-block;
		width: 200px;
	}
	
	.former-tit {
		padding-left: 22px;
		line-height: 100px;
	}
	
	.verify-btn {
		font-size: 12px;
		border: none;
		background: #eeeeee;
		border-radius: 3px;
		height: 28px;
		width: 100px;
		margin-left: 5px;
		color: #333;
		cursor: pointer;
	}
</style>