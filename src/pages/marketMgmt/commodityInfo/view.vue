<template>
	<div class="app-form mt20 ml40">
		<h5 class="info-tit">基本信息</h5>
		<section >
			<p class="basic-info mt20"><label>商品名称：</label><span>{{commodityInfo.commodityName}}</span></p>
			<p class="basic-info"><label>条形码：</label><span>{{commodityInfo.barCode}}</span></p>
			<p class="basic-info"><label>生产商：</label><span>{{commodityInfo.producer}}</span></p>
			<p class="basic-info"><label>产地：</label><span>{{commodityInfo.originPlace}}</span></p>
			<p class="basic-info"><label>出售类型：</label><span>{{commodityInfo.commodityType}}</span></p>
			<p class="basic-info"><label>等级：</label><span>{{commodityInfo.commodityLevel}}</span></p>
			<p class="basic-info"><label>规格：</label><span>{{commodityInfo.specificationNum + commodityInfo.specification}}</span></p>
			<p class="basic-info"><label>保质期：</label><span>{{commodityInfo.guaranteePeriodNum + commodityInfo.guaranteePeriod}}</span></p>
		</section>
		<h5 class="info-tit mt20">出售信息</h5>
		<section >
			<p class="basic-info mt20"><label>出售价格：</label><span>{{commodityInfo.price}}元 / {{commodityInfo.priceUnit}}</span></p>
			<!--<p class="basic-info"><label>库存上限：</label><span>{{commodityInfo.stockTopLimit + commodityInfo.priceUnit}}</span></p>
			<p class="basic-info"><label>库存下限：</label><span>{{commodityInfo.stockBootLimit + commodityInfo.priceUnit}}</span></p>-->
			<p class="basic-info"><label>销售店铺：</label><span v-for="(item,index) in commodityInfo.shops">{{item}}<i v-show="index < commodityInfo.shops.length-1">、</i></span></p>
			<!--<p class="basic-info"><label>是否打印杯贴：</label><span>{{commodityInfo.isPrint}}</span></p>-->
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

			self.getInfo();
		},
//		computed: {
//		    marketNames() {
//		        return this.commodityInfo.markets.map(i => i.marketName).join('、');
//		    }
//		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getCommodityInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						commodityID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.commodityInfo = response.data;
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
   /* width: 115px;*/
  }
</style>