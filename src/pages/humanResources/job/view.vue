<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>岗位名称：</label><span>{{jobInfo.postName}}</span></p>
			<p class="basic-info"><label>人力成本区间/月：</label><span>{{jobInfo.costLowerLimit}}~{{jobInfo.costUpperLimit}}</span></p>
			<p class="basic-info"><label>工资区间：</label><span>{{jobInfo.salaryLowerLimit}}~{{jobInfo.salaryUpperLimit}}</span></p>
			<p class="basic-info"><label>创建人：</label><span>{{jobInfo.creator}}</span></p>
			<p class="basic-info"><label>创建时间：</label><span>{{jobInfo.createTime}}</span></p>

		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				jobInfo:'',
			}
		},
		mounted(){
			var self = this;

			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getJobInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						postId:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.jobInfo = response.data;
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
	    width: 106px;
	}
</style>