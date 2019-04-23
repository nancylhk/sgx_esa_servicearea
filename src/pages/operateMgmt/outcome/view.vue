<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>支出类型：</label><span>{{outcomeInfo.outcomeItem}}</span></p>
			<p class="basic-info"><label>支出金额：</label><span>{{outcomeInfo.outcomeAmount}}</span></p>
			<p class="basic-info"><label>支付方式：</label><span>{{outcomeInfo.outcomeType}}</span></p>
			<p class="basic-info"><label>支出时间：</label><span>{{outcomeInfo.outcomeTime}}</span></p>
			<p class="basic-info"><label>经办人：</label><span>{{outcomeInfo.handler}}</span></p>
			<p class="basic-info"><label>创建时间：</label><span>{{outcomeInfo.createTime}}</span></p>
			<p class="basic-info"><label>说明：</label><span>{{outcomeInfo.commont}}</span></p>
		</section>
	</div>

</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				outcomeInfo:'',
			}
		},
		mounted(){
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getOutcomeInfo,{
					params: {
						outcomeId:self.$store.state.app.viewId,
						accessToken: self.$store.state.user.token,
					}
				},function(response){
					if(response.status == 200) {
						self.outcomeInfo = response.data;
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