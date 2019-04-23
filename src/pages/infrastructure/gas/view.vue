<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>名称：</label><span>{{gasInfo.oilsStationName}}</span></p>
			<p class="basic-info"><label>面积：</label><span>{{gasInfo.measure}}㎡</span></p>
			<p class="basic-info"><label>所在区域：</label><span>{{gasInfo.distribution}}</span></p>
			<p class="basic-info"><label>经营方式：</label><span>{{gasInfo.businessType}}</span></p>
			<p class="basic-info"><label>加油机数量：</label><span>{{gasInfo.refuelingMachineNumber}}</span></p>
			<p class="basic-info"><label>油品种类：</label><span  v-for="(item,index) in gasInfo.oils">{{item}}<i v-show="index  < gasInfo.oils.length-1">、</i></span></p>
			
		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				gasInfo:'',
			}
		},
		mounted(){
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo() {
				var self = this;
				this.$http.get(this.api.getGasInfo, {
					params: {
						oilsStationCode: this.$store.state.app.viewId,
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					if(response.status == 200) {
						self.gasInfo = response.data;
					}
				}, function(response) {})
			},
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>