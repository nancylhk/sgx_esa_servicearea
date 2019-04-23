<template>
	<div class="app-form mt20 ml40">
		<section >
			<h5 class="info-tit">POS机基本信息</h5>
			<p class="basic-info"><label>POS机编号：</label><span>{{posInfo.barCode}}</span></p>
			<p class="basic-info"><label>条形码：</label><span>{{posInfo.barCode}}</span></p>
			<p class="basic-info"><label>品牌：</label><span>{{posInfo.brand}}</span></p>
			<p class="basic-info"><label>制造商：</label><span>{{posInfo.producer}}</span></p>
			<p class="basic-info"><label>维修电话：</label><span>{{posInfo.repairTel}}</span></p>
		</section>
		<section >
			<h5 class="info-tit">扩展信息</h5>
			<p class="basic-info"><label>服务区名称：</label><span>{{posInfo.restareaName}}</span></p>
			<p class="basic-info"><label>店铺名称：</label><span>{{posInfo.shopName}}</span></p>
			<p class="basic-info"><label>状态：</label><span>{{posInfo.status}}</span></p>
			<p class="basic-info"><label>是否在线：</label><span>{{posInfo.isOnline}}</span></p>
		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				posInfo:'',
			}
		},
		mounted(){
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getDetailtPosdevInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						devId:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.posInfo = response.data;
					}
				},function(response){})
			},
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-form .basic-info label {
    width: 115px;
  }
</style>