<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>名称：</label><span>{{marketInfo.shopName}}</span></p>
			<p class="basic-info"><label>面积：</label><span>{{marketInfo.measure}}㎡</span></p>
			<p class="basic-info"><label>所在区域：</label><span>{{marketInfo.distribution}}</span></p>
			<p class="basic-info"><label>经营方式：</label><span>{{marketInfo.businessType}}</span></p>
			<p class="basic-info"><label>定价方式：</label><span>{{marketInfo.pricingType}}</span></p>
			<p class="basic-info"><label>营业范围：</label><span  v-for="(item,index) in marketInfo.businessRange">{{item}}<i v-show="index  < marketInfo.businessRange.length-1">、</i></span></p>
			
		</section>
	</div>

</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				marketInfo:'',
				businessRange:'',
			}
		},
		mounted(){
			var self = this;
			self.getViewInfo();
		},
		methods: {
			getViewInfo(){
				var self = this;
				this.$http.get(this.api.getMarketInfo,{
					params: {
						shopID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.marketInfo = response.data;
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