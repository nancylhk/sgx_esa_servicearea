<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>商品名称：</label><span>{{commodityInfo.commodityName}}</span></p>
			<p class="basic-info"><label>条形码：</label><span>{{commodityInfo.barCode}}</span></p>
			<p class="basic-info"><label>面商品类型：</label><span>{{commodityInfo.typeID}}</span></p>
			<p class="basic-info"><label>等级：</label><span>{{commodityInfo.levelID}}</span></p>
			<p class="basic-info"><label>生产商：</label><span>{{commodityInfo.producer}}</span></p>
			<p class="basic-info"><label>产地：</label><span>{{commodityInfo.originPlace}}</span></p>
			<p class="basic-info"><label>规格：</label><span>{{commodityInfo.specification}}</span></p>
			<p class="basic-info"><label>规格单位：</label><span>{{commodityInfo.specificationID}}</span></p>
			<p class="basic-info"><label>保质期：</label><span>{{commodityInfo.guaranteePeriod}}</span></p>
			<p class="basic-info"><label>保质期单位：</label><span>{{commodityInfo.periodID}}</span></p>
			<p class="basic-info"><label>货号：</label><span>{{commodityInfo.commodityNo}}</span></p>
			<p class="basic-info"><label>出售价格：</label><span>{{commodityInfo.price}}</span></p>
			<p class="basic-info"><label>计价单位：</label><span>{{commodityInfo.priceUnit}}</span></p>
			<p class="basic-info"><label>库存上限：</label><span>{{commodityInfo.stockTopLimit}}</span></p>
			<p class="basic-info"><label>库存下限：</label><span>{{commodityInfo.stockBootLimit}}</span></p>
			<p class="basic-info"><label>销售店铺：</label><span v-for="market in commodityInfo.markets">{{market.marketName}}</span></p>
			<p class="basic-info"><label>是否打印杯贴：</label><span>{{commodityInfo.isPrint}}</span></p>
			<p class="basic-info"><label>备注：</label><span>{{commodityInfo.commont}}</span></p>
		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				commodityInfo:'',
			}
		},
		mounted(){
			var self = this;

			self.getViewInfo();
		},
		methods: {
			getViewInfo(){
				var self = this;
				this.$http.get(this.api.getCommodityInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						commodityID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.commodityInfo = response.data.dataObj;
						//self.businessRange = response.data.value;
					}
				},function(response){
	                //失败回调
	            })
			},
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-form .basic-info label {
    width: 115px;
  }
</style>