<template>
	<div class="login-contianer">
		<div class="login-tit">
			<img src="../../assets/images/logo-big.png" class="login-tit-logo ml20" />
			<span class="login-tit-main fs20 ml10 bold">驿智云</span>
			<span class="login-tit-main fs14"> &nbsp;—&nbsp; 服务区信息化管理平台</span>
			<ul class="login-tit-nav">
				<li>产品</li>
				<li>解决方案</li>
				<li>云市场</li>
				<li>合作伙伴</li>
			</ul>
		</div>
		<div class="login-introduce">
			<h5 class="login-introduce-tit">服务区信息化管理平台</h5>
			<p class="login-introduce-cont">
				通过信息化手段掌握和分析服务区营运管理情况，
				<br /> 提升服务区的管理水平，提升服务区的经营效益。
			</p>
		</div>

		<!--登录-->
		<div class="login-main" v-show="!forgetPassword">
			<p class="login-mode">
				<span v-bind:class="{active: loginType=='Account' }" @click="loginType = 'Account'">账号登录</span>
				<span v-bind:class="{active: loginType=='Phone' }" @click="loginType = 'Phone'">手机登录</span>
			</p>
			<!--账户名登录-->
			<div v-show="loginType=='Account'">
				<el-form :model="loginByAccount" :rules="rules" ref="loginByAccount" style="margin-top: 50px;">
					<el-form-item prop="username">
						<el-input v-model="loginByAccount.username" placeholder="账户名"><span></span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginByAccount.password"></el-input>
					</el-form-item>
				</el-form>
				<div v-show="showLoginVerify">
					<input class="verify-ipt" type="text" placeholder="验证码" v-model="imgVerifyCode" />
					<img @click="getVerifyImg()" class="verify-img" id="verifyImg" />
				</div>
				<button @click="handleAccountLogin('loginByAccount')" class="submit-btn" type="button">登录</button>
			</div>

			<!--手机号登录-->
			<div  v-show="loginType == 'Phone'" >
				<el-form :model="loginByPhone":rules="rules" ref="loginByPhone" style="margin-top: 50px;">
					<el-form-item prop="cellphoneNumber">
						<el-input v-model="loginByPhone.cellphoneNumber" placeholder="手机号码"><span></span></el-input>
					</el-form-item>
					<el-form-item prop="checkNumber">
						<input class="verify-ipt" type="text" placeholder="验证码" v-model="loginByPhone.checkNumber" />
						<button @click="getPhoneVerifyCode()" class="verify-btn" :disabled="!verifyShow" type="button">
					         <span v-show="verifyShow">获取验证码</span>
					         <span v-show="!verifyShow" class="count">{{count}}后重新发送</span>
					    </button>
					</el-form-item>
					<button @click="handlePhoneLogin('loginByPhone')" class="submit-btn"  type="button">登录</button>
				</el-form>
			</div>
			<span class="forget-psw" @click="forgetPassword = true">忘记密码</span>
		</div>

		<!--找回密码-->
		<div class="login-forget" v-show="forgetPassword">
			<p>
				找回密码
				<img class="forget-cancel" src="../../assets/images/cancel.png" @click="forgetPassword = false" />
			</p>
			<el-steps :active="active" finish-status="success" align-center class="mt30">
				<el-step title="填写账户名"></el-step>
				<el-step title="验证信息"></el-step>
				<el-step title="密码重置"></el-step>
			</el-steps>
			<div v-show="active == 0" class="forget-main">
				<!--第一步-->
				<el-form>
					<el-form-item>
						<el-input placeholder="账户名"><span></span></el-input>
					</el-form-item>
				</el-form>
				<div>
					<input class="verify-ipt" type="text" placeholder="验证码" v-model="imgVerifyCode" />
					<img @click="getVerifyImg()" class="verify-img" src="/user/getCheckNumber" />

				</div>
				<button @click="next" class="submit-btn" >下一步</button>
			</div>
			<div v-show="active == 1" class="forget-main">
				<!--第二步-->
				<div class="lh62"><span>绑定手机号：13675193889</span></div>
				<div>
					<input class="verify-ipt" type="text" placeholder="验证码" v-model="imgVerifyCode" />
					<button class="verify-btn">发送验证码</button>
				</div>
				<button @click="next" class="submit-btn">下一步</button>
			</div>
			<div v-show="active == 2" class="forget-main">
				<!--第三步-->
				<div class="text-ac">
					<p class="lh50">密码重置成功</p>
					<p class="lh50">新密码已发送至136****3889，请注意查收</p>
				</div>
				<button @click="next" class="submit-btn">完成</button>
			</div>
		</div>
		<em class="logo-dec"></em><em class="logo-dec1"></em>
	</div>

</template>

<script>
	import axios from 'axios';
	import validateRules from '../../utils/validate';
	import { mapActions, mapState } from 'vuex';
	const TIME_COUNT = 60;
	export default {
		data() {
			return {
				loginByAccount: {
					username: '',
					password: '',
					type: 'servicearea'
				},
				loginByPhone: {
					cellphoneNumber: '',
					checkNumber: '',
					type: 'servicearea'
				},
				loginType: 'Account',
				verifyShow: true,
				count: '',
				timer: null,
				forgetPassword: false,
				active: 0,
				showLoginVerify: false,
				imgVerifyCode: '',
				loginCount: 0,
				rules: {
					username: [{
						required: true,
						message: '请输入账户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					cellphoneNumber: [{
						required: true,
						validator: validateRules.isPhoneTel,
						trigger: 'blur'
					}],
					checkNumber: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
					imgVerifyCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
				},
			}
		},
		methods: {
			async handleAccountLogin(formName) {
				var self = this;
				if(!self.showLoginVerify) {
					self.$refs[formName].validate(async(valid) => {
						if(valid) {
							var userInfo = JSON.parse(JSON.stringify(self.loginByAccount));
							axios.get(self.api.accountLogin, {
								params: userInfo
							}).then((response) => {
								if(response.data.value != '' && response.data.value != null) {
									var par = response.data.value;
									self.$store.dispatch('LoginByAccount', par).then(() => {
										self.$router.push({
											path: '/'
										});
									}).catch(err => {
										self.$message.error(err);

									})
								} else {
									self.loginCount++;
									self.$message({
										showClose: true,
										message: response.data.errorDescription,
										type: 'error'
									});
									if(self.loginCount > 2) {
										self.showLoginVerify = true;
										self.getVerifyImg();
									}
								}
							})

						} else {
							return false;
						}
					});
				} else {
					if(self.imgVerifyCode != '') {
						self.$refs[formName].validate(async(valid) => {
							if(valid) {
								self.loginByAccount.verifyCode = self.imgVerifyCode;
								var userInfo = JSON.parse(JSON.stringify(self.loginByAccount));
								axios.get(self.api.accountLogin, {
									params: userInfo
								}).then((response) => {
									if(response.data.value != '' && response.data.value != null) {
										var par = response.data.value;
										self.$store.dispatch('LoginByAccount', par).then(() => {
											self.$router.push({
												path: '/'
											});
										}).catch(err => {
											self.$message.error(err);
										})
									} else {
										self.$message({
											showClose: true,
											message: response.data.errorDescription,
											type: 'error'
										});
										self.getVerifyImg();
									}
								})
							} else {
								return false;
							}
						});

					} else if(this.imgVerifyCode == '') {
						self.$message({
							type: 'warning',
							message: '请输入验证码',
							duration: 2000
						});
						self.getVerifyImg();
					}

				}
			},
			async handlePhoneLogin(formName) {
				let self = this;
				self.$refs[formName].validate(async(valid) => {
					if(valid) {
						if(self.timer == null){
							self.$message({
								showClose: true,
								message: "请先获取验证码",
								type: 'error'
							});
						}else{
							var userInfo = JSON.parse(JSON.stringify(self.loginByPhone));
							self.$http.get(self.api.phoneLogin, {
								params: userInfo
							}, function(response) {
								if(response.data.value != '' && response.data.value != null) {
									var par = response.data.value;
									self.$store.dispatch('LoginByAccount', par).then(() => {
										self.$router.push({
											path: '/'
										});
									}).catch(err => {
										self.$message.error(err);
									})
								} else {
									self.$message({
										showClose: true,
										message: "验证码错误",
										type: 'error'
									});
								}
							}, function(response) {})
						}
					} else {
						return false;
					}
				});
				
			},
			getVerifyImg() {
				document.getElementById("verifyImg").src = "/user/getCheckNumber?id=" + Date.parse(new Date());
			},
			getPhoneVerifyCode() {
				let self = this;
				const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; 
				if(self.loginByPhone.cellphoneNumber == '') {
					self.$message({
						showClose: true,
						message: "请输入手机号码",
						type: 'error'
					});
				}else if(!reg.test(self.loginByPhone.cellphoneNumber)) {
					self.$message({
						showClose: true,
						message: "手机号码格式不正确",
						type: 'error'
					});
				}else {
					if(!self.timer) {
						self.$http.get(self.api.getVerifyCellPhoneCode, {
							params: {
								cellphoneNumber: self.loginByPhone.cellphoneNumber,
							}
						}, function(response) {
							self.count = TIME_COUNT;
							self.verifyShow = false;
							self.timer = setInterval(() => {
								if(self.count > 0 && self.count <= TIME_COUNT) {
									self.count--;
								} else {
									self.verifyShow = true;
									clearInterval(self.timer);
									self.timer = null;
								}
							}, 1000)
						}, function(response) {})
					}
				}
			},
			next() {
				if(this.active++ > 2) this.active = 0;
			},

		},
		watch: {
			adminInfo: function(newValue) {
				if(newValue.id) {
					this.$message({
						type: 'success',
						message: '检测到您之前登录过，将自动登录'
					});
					this.$router.push('index/homepage')
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.login-contianer {
		min-height: 100%;
		min-width: 1280px;
		background-color: #092679;
		background-image: linear-gradient(-180deg, rgba(5, 36, 124, 1) 0%, rgba(58, 80, 190, 1) 50%, rgba(5, 57, 137, 1) 100%);
		background-size: cover;
		position: relative;
		top: 0;
		left: 0;
		overflow: auto;
		.login-tit {
			height: 60px;
			line-height: 65px;
			border-bottom: solid 1px #eee;
			color: #fff;
			font-weight: bold;
			.login-tit-main {
				display: inline-block;
				vertical-align: top;
			}
			.login-tit-logo {
				width: 28px;
				height: 28px;
				margin-bottom: 7px;
			}
			.login-tit-nav {
				display: inline-block;
				line-height: 68px;
				margin-left: 240px;
			}
			.login-tit-nav li {
				font-size: 14px;
				display: inline-block;
				width: 85px;
				cursor: pointer;
				font-weight: bold;
			}
		}
		.login-introduce {
			color: #fff;
			font-weight: bold;
			display: inline-block;
			position: absolute;
			top: 30%;
			left: 16%;
			.login-introduce-tit {
				text-align: center;
				line-height: 40px;
				font-size: 30px;
			}
			.login-introduce-cont {
				text-align: center;
				line-height: 32px;
				font-size: 14px;
				margin-top: 60px;
			}
		}
		.login-main {
			width: 380px;
			height: 420px;
			background-color: #fff;
			padding: 20px 40px;
			box-sizing: border-box;
			position: absolute;
			right: 20%;
			top: 21%;
			z-index: 2;
			border-radius: 2px;
			.login-mode {
				line-height: 35px;
				border-bottom: solid 1px #d8dce5;
				.active {
					border-bottom: solid 2px #00c1de;
					position: relative;
					top: 1px;
				}
				span {
					width: 49%;
					display: inline-block;
					text-align: center;
					cursor: pointer;
				}
			}
			.forget-psw {
				float: right;
				margin: 10px 5px;
				cursor: pointer;
			}
		}
		.login-forget {
			width: 540px;
			height: 420px;
			background-color: #fff;
			padding: 10px;
			box-sizing: border-box;
			position: absolute;
			right: 13%;
			top: 21%;
			z-index: 2;
			border-radius: 2px;
			.forget-cancel {
				width: 16px;
				height: 16px;
				float: right;
				cursor: pointer;
			}
			.forget-main {
				width: 380px;
				padding: 20px 40px;
				box-sizing: border-box;
				position: absolute;
				right: 15%;
				top: 30%;
				z-index: 2;
				border-radius: 2px;
			}
			.lh62 {
				line-height: 62px;
			}
			.lh50 {
				line-height: 50px;
			}
			.text-ac {
				text-align: center;
			}
		}
		.submit-btn {
			width: 100%;
			height: 40px;
			background-color: #00c1de;
			border: none;
			margin-top: 20px;
			color: #fff;
			cursor: pointer;
		}
		.verify-ipt {
			border-radius: 4px;
			border: 1px solid #dcdfe6;
			box-sizing: border-box;
			color: #606266;
			height: 38px;
			font-size: 12px;
			line-height: 1;
			outline: 0;
			padding: 0 15px;
			width: 145px;
		}
		.verify-btn {
			font-size: 11px;
			border: none;
			background: #eeeeee;
			border-radius: 2px;
			height: 39px;
			width: 145px;
			margin-left: 5px;
			color: #333;
			cursor: pointer;
		}
		.verify-img {
			height: 39px;
			width: 145px;
			margin-left: 5px;
			cursor: pointer;
		}
		.logo-dec {
			width: 32%;
			height: 35%;
			background-image: url(../../assets/images/logo-dec.png);
			background-repeat: no-repeat;
			background-size: cover;
			opacity: 0.7;
			filter: alpha(opacity=70);
			position: absolute;
			bottom: 0px;
			left: 0px;
		}
		.logo-dec1 {
			width: 38%;
    		height: 45%;
			background-image: url(../../assets/images/logo-dec1.png);
			background-repeat: no-repeat;
			background-size: cover;
			position: absolute;
			bottom: 0px;
			right: 0px;
			z-index: 0;
		}
		.el-form-item {
		    margin-bottom: 22px;
		}
	}
</style>