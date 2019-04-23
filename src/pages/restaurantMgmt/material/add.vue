<template>
	<div class="app-form mt20 ml40">
		
	</div>

</template>
<script>
	export default {
		name: 'sectionAdd',
		data() {
			return {
				addInfo: {
	
				},
				allMarket: [],
				rules: {
					commodityName: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}, ],
				}
			};
		},
		created() {

		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addCommodityInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								info: self.addInfo
							}
						},function(response){
							if(response.data) {
								self.$message({
									type: 'success',
									message: '新增成功',
									duration: 2000
								});
								self.$emit('changeComp', 'sectionList');
							} else {
								self.$message({
									type: 'warning',
									message: '新增失败',
									duration: 2000
								});
							}
						},function(response){
			                //失败回调
			            })
					}
				});

			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$emit('changeComp', 'sectionList');
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>