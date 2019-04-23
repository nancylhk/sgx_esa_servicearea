<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>名称：</label><span>{{carParkInfo.parkingName}}</span></p>
			<p class="basic-info"><label>面积：</label><span>{{carParkInfo.measure}}㎡</span></p>
			<p class="basic-info"><label>所在区域：</label><span>{{carParkInfo.distribution}}</span></p>
			<p class="basic-info"><label>小客车停车位数：</label><span>{{carParkInfo.minibusParkingNumber}} 个</span></p>
			<p class="basic-info"><label>大客车停车位数：</label><span>{{carParkInfo.busParkingNumber}} 个</span></p>
			<p class="basic-info"><label>货车停车位数：</label><span>{{carParkInfo.truckParkingNumber}} 个</span></p>
			<p class="basic-info"><label>危险品停车位数：</label><span>{{carParkInfo.dangerCarryingNumber}} 个</span></p>
		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				carParkInfo:'',
			}
		},
		mounted(){
			var self = this;
			self.getViewInfo();
		},
		methods: {
			getViewInfo(){
				var self = this;
				this.$http.get(this.api.getCarParkInfo,{
					params: {
						parkingID: this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.carParkInfo = response.data;
					}
				},function(response){
	                //失败回调
	            })
			}
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-form .basic-info label {
    width: 115px;
  }
</style>