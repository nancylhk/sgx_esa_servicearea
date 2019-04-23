<template>
	<div class="sidebar-container">
		<div class="per-center">
			<h5 class="per-tit">个人中心<img class="per-icon" src="../../assets/images/set.png"/></h5>
			<div class="mt15 ml25">
				<img src="../../assets/images/user-info.png" /><span class="ml20">账号&nbsp;:&nbsp;</span><span>{{currentUserInfo.userName}}</span>
			</div>
			<ul class="user-info">
				<li>
					<em class="info-icon icon-tel"></em>
					<span class="ml3p">绑定手机号&nbsp;:&nbsp;</span>
					<span>{{currentUserInfo.userTel}}</span>
				</li>
				<li>
					<em class="info-icon icon-type"></em>
					<span class="ml3p">账号类型&nbsp;:&nbsp;</span>
					<span>{{currentUserInfo.accountType}}</span>
				</li>
				<li>
					<em class="info-icon icon-com"></em>
					<span class="ml3p">所属公司&nbsp;:&nbsp;</span>
					<span class="info-company">{{currentUserInfo.belongsMachism}}</span></li>
			</ul>
			<div class="user-item">
				<el-row type="flex" class="row-bg">
					<el-col :span="12">
						<section class="user-operate"><!--@click="changeParentId('11')"-->
							<!--<router-link :to="{path:'/myTodo/hisApproval',query: {barId:'11'}}">-->
							<em class="user-operate-img user-todo-img"></em>
							<p class="user-operate-item  user-todo">
								<span>代办事项</span>
								<span class="bold">{{todoNum}}</span>
							</p>
							<!--</router-link>-->
						</section>
					</el-col>
					<el-col :span="12">
						<section class="user-operate" @click="changeParentId('06')">
							<router-link :to="{path:'/message/allmsg',query: {barId:'06'}}">
								<em class="user-operate-img user-message-img"></em>
								<p class="user-operate-item  user-message">
									<span>未读消息</span>
									<span class="bold">{{msgNum}}</span>
								</p>
							</router-link>
						</section>
					</el-col>
				</el-row>
				<em class="user-line"></em>
			</div>
		</div>
		<article class="sys-articles">
			<section class="sys-cont">
				<h5 class="per-tit">最新公告<img class="per-icon" src="../../assets/images/more.png"/></h5>
				<ul class="sys-cont-detail">
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
				</ul>
			</section>
			<section class="sys-cont">
				<h5 class="per-tit">最新政策<img class="per-icon" src="../../assets/images/more.png"/></h5>
				<ul class="sys-cont-detail">
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
					<li><em></em>关于苏通卡苏通大桥服务区充值点营业时间充值点营业时间</li>
				</ul>
			</section>
		</article>
	</div>
</template>

<script>
	export default {
		name: 'Sidebar',
		data() {
			return {
				msgNum: '',
				todoNum: '',
				currentUserInfo: '',
			}
		},
		components: {

		},
		created() {
			//代办事项
			let self = this;
			this.$http.get(this.api.getTodoNumber, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			}, function(response) {
				if(response.status == 200) {
					self.todoNum = response.data;
				}
			}, function(response) {
				//失败回调
			})
			//未读消息
			this.$http.get(this.api.getNewMessageNumber, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			}, function(response) {
				if(response.status == 200) {
					self.msgNum = response.data.value;
				}
			}, function(response) {
				//失败回调
			})
			//个人中心
			this.$http.get(this.api.getCurrentUser, {
				params: {
					accessToken: this.$store.state.user.token,
				}
			}, function(response) {
				if(response.status == 200) {
					self.currentUserInfo = response.data;
				}
			}, function(response) {
				//失败回调
			})

		},
		methods: {
			addViewRecord() {
				let currentRoute = {};
				currentRoute['name'] = this.$route.name;
				currentRoute['path'] = this.$route.path;
				currentRoute['parentId'] = this.$route.meta;
				this.$store.dispatch('addVisitedHistory', currentRoute);
			},
			changeParentId(parentId) {
				this.$store.dispatch('setNavbarId', parentId)
			}
		},
		watch: {
			$route(from, to) {
				this.addViewRecord()
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.sidebar-container {
		width: 100%;
		.per-icon {
			display: inline-block;
			width: 16px;
			height: 16px;
			cursor: pointer;
			float: right;
		}
		.per-tit {
			width: 92%;
			border-bottom: solid 1px #ddd;
			padding: 10px 0;
			margin-left: 4%;
		}
		.per-center {
			height: 350px;
			background: #fff;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
			position: relative;
			.user-info {
				margin: 20px 8%;
				width: 90%;
			}
			.user-info li {
				line-height: 42px;
				span {
					display: inline-block;
					vertical-align: top;
				}
				.info-company {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 60%;
				}
			}
			.info-icon {
				display: inline-block;
				width: 16px;
				height: 16px;
				background-repeat: no-repeat;
				vertical-align: middle;
			}
			.icon-tel {
				background-image: url(../../assets/images/tel.png);
			}
			.icon-type {
				background-image: url(../../assets/images/type.png);
			}
			.icon-com {
				width: 18px;
				height: 18px;
				background-image: url(../../assets/images/company.png);
			}
			.user-item {
				height: 80px;
				width: 100%;
				background: #3d77af;
				position: absolute;
				bottom: 0;
				padding: 1%;
				cursor: pointer;
				.user-operate {
					width: 100%;
					height: 60px;
					margin-top: 10px;
				}
				.user-line {
					border-right: solid 1px #fff;
					position: absolute;
					height: 60px;
					top: 10px;
					left: 50%;
				}
				.user-operate-img {
					display: inline-block;
					width: 33px;
					height: 38px;
					float: left;
					position: relative;
					top: 10px;
					left: 6%;
					background-repeat: no-repeat;
					background-size: 100%;
				}
				.user-todo-img {
					background-image: url(../../assets/images/toodo.png);
				}
				.user-message-img {
					background-image: url(../../assets/images/message.png);
				}
				.user-operate-item {
					color: #fff;
					position: relative;
					top: 10px;
					right: 0;
					text-align: center;
				}
				.user-operate-item span {
					display: block;
					line-height: 22px;
				}
			}
		}
		.sys-articles {
			height: 515px;
			background: #fff;
			margin-top: 15px;
			box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
			.sys-cont {
				height: 48%;
			}
			.sys-cont-detail {
				padding: 10px 16px;
			}
			.sys-cont-detail li {
				color: #666666;
				width: 96%;
				line-height: 36px;
				cursor: pointer;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				em {
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 4px;
					background: #45c8dc;
					margin-right: 5px;
				}
			}
			.sys-cont-detail li:hover {
				color: #45c8dc;
			}
		}
	}
</style>