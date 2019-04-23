<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>姓名：</label><span>{{employeeInfo.employeeName}}</span></p>
			<p class="basic-info"><label>身份证号：</label><span>{{employeeInfo.identifierNo}}</span></p>
			<p class="basic-info"><label>年龄：</label><span>{{employeeInfo.age}}</span></p>
			<p class="basic-info"><label>性别：</label><span>{{employeeInfo.gender}}</span></p>
			<p class="basic-info"><label>籍贯：</label><span>{{employeeInfo.origin}}</span></p>
			<p class="basic-info"><label>民族：</label><span>{{employeeInfo.nation}}</span></p>
			<p class="basic-info"><label>文化水平：</label><span v-show="employeeInfo.curtualLevel=='1'">高中</span><span v-show="employeeInfo.curtualLevel=='2'">专科</span><span v-show="employeeInfo.curtualLevel=='3'">本科</span><span v-show="employeeInfo.curtualLevel=='4'">研究</span><span v-show="employeeInfo.curtualLevel=='5'">博士</span></p>
			<p class="basic-info"><label>岗位：</label><span>{{employeeInfo.postName}}</span></p>
			<p class="basic-info"><label>薪资：</label><span>{{employeeInfo.salary}}</span></p>
			<p class="basic-info"><label>合同开始时间：</label><span>{{employeeInfo.startDate}}</span></p>
			<p class="basic-info"><label>合同到期时间：</label><span >{{employeeInfo.deadline}}</span></p>
			<p class="basic-info"><label>状态：</label><span v-show="employeeInfo.status=='1'">在职</span><span v-show="employeeInfo.status=='0'">离职</span></p>
			<p class="basic-info"><label>是否有健康证：</label><span v-show="employeeInfo.isHealthyCard=='1'">是</span><span v-show="employeeInfo.isHealthyCard=='0'">否</span></p>
			<p class="basic-info"><label>居住地：</label><span><span>{{employeeInfo.areaAddress+employeeInfo.detailedAddress}}</span></span></p>
		</section>
	</div>

</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				employeeInfo:'',
			}
		},
		mounted(){
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getEmployeeInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						employeeId:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.employeeInfo = response.data;
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