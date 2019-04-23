<template>
	<div class="app-form app-step mt20 ml40">
		<el-steps :active="stepActive" align-center finish-status="success">
			<el-step v-for="(info,index) in workProcess" :title="info.workName" :key="index"></el-step>
		</el-steps>
		<p><em class="app-crumb-line"></em><span>基本信息</span></p>
		<section>
			<p class="basic-info mt10"><label>商品名称：</label><span>{{commodityInfo.productName}}</span></p>
			<p class="basic-info"><label>条形码：</label><span>{{commodityInfo.barCode}}</span></p>
			<p class="basic-info"><label>所属公用库：</label><span>{{commodityInfo.publicStorageID}}</span></p>
			<p class="basic-info"><label>生产商：</label><span>{{commodityInfo.producer}}</span></p>
			<p class="basic-info"><label>产地：</label><span>{{commodityInfo.originPlace}}</span></p>
			<p class="basic-info"><label>等级：</label><span>{{commodityInfo.commodityLevel}}</span></p>
			<p class="basic-info"><label>规格：</label><span>{{commodityInfo.specificationNum + commodityInfo.specification}}</span></p>
			<p class="basic-info"><label>保质期：</label><span>{{commodityInfo.guaranteePeriodNum + commodityInfo.guaranteePeriod}}</span></p>
		</section>
		<p class="mt20"><em class="app-crumb-line"></em><span>出售信息</span></p>
		<section>
			<p class="basic-info mt10"><label>出售价格：</label><span>{{commodityInfo.price}}元 / {{commodityInfo.priceUnit}}</span></p>
			<p class="basic-info"><label>库存上限：</label><span>{{commodityInfo.topLimit + commodityInfo.priceUnit}}</span></p>
			<p class="basic-info"><label>库存下限：</label><span>{{commodityInfo.bootLimit + commodityInfo.priceUnit}}</span></p>
			<p class="basic-info"><label>店铺类型：</label><span>{{commodityInfo.shopTypeID}}</span></p>
			<p class="basic-info"><label>是否打印杯贴：</label><span v-show="commodityInfo.isPrint==1">否</span><span v-show="commodityInfo.isPrint==0">是</span></p>
			<p class="basic-info"><label>备注：</label><span>{{commodityInfo.commont}}</span></p>
		</section>
		<p class="mt20"><em class="app-crumb-line"></em><span>审批流程</span></p>
		<div>
			<section class="approval-step-tit">
				<ul class="mt20 ml20">
					<li v-for="(info,index) in approvalList">
						<span>{{index+1}}</span>
					</li>
				</ul>
			</section>
			<section class="approval-step-cont mt20">
				<div class="approval-step-det" v-for="(info,index) in approvalList">
					<p class="approval-step-info">
						<span>{{info.userName}}</span>
						<span class="approvalResult" :class="{approvalResult1:info.status=='驳回'}">{{info.status}}</span>
						<span class="approval-time">{{info.time}}</span>
					</p>
					<p class="approval-step-info1"><span class="approval-msg">{{info.message}}</span></p>
				</div>
			</section>
		</div>

	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				commodityInfo: '',
				stepActive: 0,
				approvalList: [],
				workProcess: []
			}
		},
		mounted() {
			var self = this;

			self.getInfo();
		},
		created() {
			var self = this;
			this.$http.get(this.api.findWorkProcesstById, {
				params: {
					accessToken: self.$store.state.user.token,
					productID: this.$store.state.app.viewId,
				}
			}, function(response) {
				if(response.status == 200) {
					self.workProcess = response.data.workList;
					if(self.workProcess.length > 0) {
						for(var i = self.workProcess.length; i--; i >= 0) {
							if(self.workProcess[i].workStatus == 1) {
								self.stepActive = i;
								return
							} else {
								self.stepActive == 0
							}
						}
					}

				}
			}, function(response) {
				//失败回调
			})
		},
		methods: {
			getInfo() {
				var self = this;
				this.$http.get(this.api.getPublicStorageInfo, {
					params: {
						accessToken: self.$store.state.user.token,
						productID: this.$store.state.app.viewId,
					}
				}, function(response) {
					if(response.status == 200) {
						self.commodityInfo = response.data;
						//self.businessRange = response.data.value;
					}
				}, function(response) {
					//失败回调
				})

				var self = this;
				this.$http.get(this.api.getHistoryWorkCommentById, {
					params: {
						accessToken: self.$store.state.user.token,
						productID: this.$store.state.app.viewId,
					}
				}, function(response) {
					if(response.status == 200) {
						self.approvalList = response.data.commentList;
					}
				}, function(response) {
					//失败回调
				})
			},
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.app-form .basic-info label {
		/* width: 115px;*/
	}
	
	.app-step {
		.el-step.is-center .el-step__line {
			height: 1px;
			left: 56%;
			right: -44%;
		}
		.el-steps {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			width: 100%;
		}
		.basic-info {
			width: 48%;
			display: inline-block;
		}
		.approval-step-tit {
			display: inline-block;
			width: 6%;
			li {
				height: 50px;
				line-height: 50px;
				border-left: dashed 1px #ccc;
				span {
					display: inline-block;
					line-height: 20px;
					width: 20px;
					height: 20px;
					background: #0099cc;
					border-radius: 10px;
					color: #fff;
					text-align: center;
					margin-top: 10px;
					position: relative;
					right: 10px;
				}
			}
		}
		.approval-step-cont {
			display: inline-block;
			width: 75%;
			vertical-align: top;
		}
		.approval-step-info {
			height: 30px;
			line-height: 50px;
		}
		.approval-step-det {
			height: 50px;
			line-height: 50px;
		}
		.approval-step-info1 {
			line-height: 25px;
		}
		.approval-time {
			float: right;
		}
		.approval-msg {
			color: #999;
			padding-left: 3px;
		}
		.approval-result {
			padding-left: 10px;
			color: #3edc22;
			font-weight: bold;
		}
		.approvalResult1 {
			padding-left: 10px;
			color: #f7613e;
			font-weight: bold;
		}
	}
</style>