<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>名称：</label><span>{{restaurantInfo.restaurantName}}</span></p>
			<p class="basic-info"><label>面积：</label><span>{{restaurantInfo.measure}}㎡</span></p>
			<p class="basic-info"><label>所在区域：</label><span>{{restaurantInfo.distribution}}</span></p>
			<p class="basic-info"><label>经营方式：</label><span>{{restaurantInfo.businessType}}</span></p>
			<p class="basic-info"><label>定价方式：</label><span>{{restaurantInfo.pricingType}}</span></p>
			<p class="basic-info"><label>营业范围：</label><span  v-for="(item,index) in restaurantInfo.businessRange">{{item}}<i v-show="index  < restaurantInfo.businessRange.length-1">、</i></span></p>
		</section>
	</div>

</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				restaurantInfo:'',
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
				this.$http.get(this.api.getRestaurantInfo,{
					params: {
						restaurantID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.restaurantInfo = response.data;
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