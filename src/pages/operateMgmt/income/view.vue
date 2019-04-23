<template>
	<div class="app-form mt20 ml40">
		<section  v-show="incomInfo.posId == ''">
			<!--<p class="basic-info"><label>交易流水号：</label><span>{{incomInfo.sellId}}</span></p>-->
			<p class="basic-info"><label>收入来源：</label><span>{{incomInfo.incomeType}}</span></p>
			<p class="basic-info"><label>支付方式：</label><span>{{incomInfo.typeName}}</span></p>
			<p class="basic-info"><label>金额：</label><span>{{incomInfo.income}}</span></p>
			<p class="basic-info"><label>交易时间：</label><span>{{incomInfo.tradeDate}}</span></p>
			<p class="basic-info"><label>经办人：</label><span>{{incomInfo.employeeName}}</span></p>
			<p class="basic-info"><label>备注：</label><span>{{incomInfo.commont}}</span></p>
			<p class="basic-info"><label>录入时间：</label><span>{{incomInfo.createTime}}</span></p>
			<p class="basic-info"><label>附件：</label><img :src="incomInfo.picUrl"/></p>
		</section>
		<section v-show="incomInfo.posId != ''">
			<p class="basic-info"><label>POS机编号：</label><span>{{incomInfo.posId}}</span></p>
			<p class="basic-info"><label>销售店铺：</label><span>{{incomInfo.shopName}}</span></p>
			<p class="basic-info"><label>支付方式：</label><span>{{incomInfo.typeName}}</span></p>
			<p class="basic-info"><label>金额：</label><span>{{incomInfo.income}}</span></p>
			<p class="basic-info"><label>收银员：</label><span>{{incomInfo.employeeName}}</span></p>
			<p class="basic-info"><label>交易时间：</label><span>{{incomInfo.tradeDate}}</span></p>
			<p class="basic-info"><label>备注：</label><span>{{incomInfo.commont}}</span></p>
		
		</section>
	</div>

</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				incomInfo:'',
			}
		},
		mounted(){
			var self = this;

			self.getViewInfo();
		},
		methods: {
			getViewInfo(){
				var self = this;
				this.$http.get(this.api.getIncomeInfo,{
					params: {
						sellId:this.$store.state.app.viewId,
						accessToken: self.$store.state.user.token,
					}
				},function(response){
					if(response.status == 200) {
						self.incomInfo = response.data;
					}
				},function(response){
	                //失败回调
	            })
			}
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>