<template>
	<div class="security">
		<div>
			<p>登录账号：<span>{{userInfo.userName}}</span></p>
			<p>创建时间：<span>{{userInfo.createTime}}</span></p>
		</div>
		<div>
			<p>您当前账号安全程度：<span></span></p>
		</div>
		<div class="security-info">
			<p>
				<span class="security-tit">登录密码</span>
				<span class="security-cont">安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</span>
				<span class="security-set"><em class="mr15 security-set-no">未设置</em>|<a class="ml15"  @click="modfiyPsw(userInfo.userId)">修改</a></span>
			</p>
			<p class="mt20">
				<span class="security-tit">绑定手机</span>
				<span class="security-cont">您已绑定手机号{{userInfo.userTel}}。[您的手机号位安全手机，可用于找回密码，但不能用于登录]</span>
				<span class="security-set"><em class="mr15 security-set-yet">已设置</em>|<a class="ml15"  @click="modfiyPhone(userInfo)">修改</a></span>
			</p>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'listComp',
		data() {
			return {
				userInfo:{}

			}
		},
		mounted() {
			this.getUserInfo();

		},
		methods: {
			getUserInfo() {
				let self = this;
				self.$http.get(self.api.getUserAccountInfo, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					if(response.status == 200) {
						self.userInfo = response.data;
					}
				}, function(response) {
					//失败回调
				})
			},
			modfiyPsw(ID) {
				this.$emit('changeComp', 'modifyPswComp', '修改密码');
				this.$store.dispatch('setViewId', ID);
			},
			modfiyPhone(ID) {
				this.$emit('changeComp', 'modifyPhoneComp', '修改绑定手机');
				this.$store.dispatch('setViewId', ID);
			},
			
		},

	}
</script>

<style rel="stylesheet/scss" lang="scss">
.security{
	margin:20px;
	width:90%;
	p{
		line-height: 50px;
	}
	span{
		display: inline-block;
	}
	.security-tit{
		width:10%;
		vertical-align: top;
		font-weight: bold;
	}
	.security-cont{
		line-height: 30px;
	}
	.security-set{
		float: right;
    	margin-right: 20px;
    	a{
    		color: #0099CC;
    		cursor: pointer;
    	}
    	.security-set-yet{
    		display: inline-block;
		    color: #7ed239;
		    padding-left: 20px;
		    line-height: 18px;
		    vertical-align: middle;
    		background-image: url(../../../assets/images/set-yet.png);
    		background-repeat: no-repeat;
    	}
    	.security-set-no{
    		display: inline-block;
    		color: #f56b31;
    		 padding-left: 20px;
		    line-height: 18px;
		    vertical-align: middle;
    		background-image: url(../../../assets/images/set-no.png);
    		background-repeat: no-repeat;
    	}
	}
	.security-info{
		margin-top:50px;
		p{
			line-height: 75px;
			border-bottom:solid 1px #d8d8d8;
		}
	}
}
</style>