<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>名称：</label><span>{{carRepaireInfo.serviceName}}</span></p>
			<p class="basic-info"><label>面积：</label><span>{{carRepaireInfo.measure}}㎡</span></p>
			<p class="basic-info"><label>电话：</label><span>{{carRepaireInfo.tel}}</span></p>
			<p class="basic-info"><label>经营方式：</label><span>{{carRepaireInfo.businessType}}</span></p>
			<p class="basic-info"><label>所在区域：</label><span>{{carRepaireInfo.distribution}}</span></p>
			<p class="basic-info"><label>营业范围：</label><span>{{carRepaireInfo.range}}</span></p>
		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				carRepaireInfo:'',
			}
		},
		mounted(){
			var self = this;

			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getCarRepaireInfo,{
					params: {
						accessToken: this.$store.state.user.token,
						serviceID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.carRepaireInfo = response.data;
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