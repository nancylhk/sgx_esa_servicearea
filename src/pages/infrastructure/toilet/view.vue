<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>名称：</label><span>{{toiletInfo.toiletName}}</span></p>
			<p class="basic-info"><label>面积：</label><span>{{toiletInfo.measure}}㎡</span></p>
			<p class="basic-info"><label>所在区域：</label><span>{{toiletInfo.distribution}}</span></p>
			<p class="basic-info"><label>性别：</label><span v-show="toiletInfo.gender==1">女</span><span v-show="toiletInfo.gender==0">男</span></p>
			<p class="basic-info"><label>蹲位数：</label><span>{{toiletInfo.squattingNum}}</span></p>
			<p class="basic-info"><label>无障碍卫生间：</label><span>{{toiletInfo.disabledNum}}</span></p>
			<p class="basic-info"><label>便池数：</label><span>{{toiletInfo.urinalNum}}</span></p>
		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				toiletInfo:'',
			}
		},
		mounted(){
			var self = this;

			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getToiletInfo,{
					params: {
						accessToken: this.$store.state.user.token,
						toiletID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.toiletInfo = response.data;
					}
				},function(response){})
			}
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-form .basic-info label {
    width: 115px;
  }
</style>