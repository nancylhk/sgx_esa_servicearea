<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini"  :inline-message="true">
			<div class="mt30">
				<el-form-item label="姓名：" prop="employeeName">
					<el-input v-model="addInfo.employeeName" disabled></el-input>
				</el-form-item>
				<el-form-item label="身份证号：" prop="identifierNo">
					<el-input v-model="addInfo.identifierNo" disabled></el-input>
				</el-form-item>
				<el-form-item label="年龄：" prop="age">
					<el-input v-model="addInfo.age"></el-input>
				</el-form-item>
				<el-form-item label="性别：" prop="gender">
					<el-select v-model="addInfo.gender" >
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="岗位：" prop="postId">
					<el-select v-model="addInfo.postId">
						<el-option
					      v-for="(item,index) in postLists"
					      :key="item.postId"
					      :label="item.postName"
					      :value="item.postId">
					   </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="薪资：" prop="salary">
					<el-input v-model="addInfo.salary"></el-input>
				</el-form-item>
				<el-form-item label="居住地：" class="re-select-ipt3 mustIcon"  prop="cityInfo">
					<city-select v-model="cityInfo"  :_selectCity="'130432'"></city-select>
				</el-form-item>
				<el-form-item label="详细地址：" prop="detailedAddress">
					<el-input v-model="addInfo.detailedAddress"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<div class="mt40 ml40">
			<el-button type="primary" @click="submitForm('addInfo')">确定</el-button>
			<el-button @click="resetForm('addInfo')">取消</el-button>
		</div>
	</div>

</template>
<script>
	import CitySelect from '../../common/CitySelect';
	import validateRules from '../../../utils/validate';
	export default {
		name: 'sectionUpdate',
		data() {
			return {
				addInfo: {},
				cityInfo: {},
				detailAddress: '',
				address:'',
				postLists:[],
				rules: {
					employeeName: [{
						required: true,
						validator: validateRules.isRealName,
						trigger: 'blur',
						
					}],
					age: [{
						required: true,
						validator: validateRules.isInteger,
						trigger: 'blur',
						
					}],
					post: [{
						required: true,
						message: '请选择岗位',
						trigger: 'change'
					}],
					age: [{
						required: true,
						message: '请选择年龄',
						trigger: 'change'
					}],
					identifierNo: [{
						validator: validateRules.isCardNo,
						trigger: 'blur',
						required: true,
					}],
					salary:[{
						required: true,
						message: '请输入薪资',
						trigger: 'blur'
					}],
					address:[{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					
				}
			};
		},
		components: {
			CitySelect
		},
		created() {
			var self = this;
			//分布形式
			if(self.$store.state.app.commonVariable.postLists){
				self.postLists = self.$store.state.app.commonVariable.postLists;
			}else{
				self.$http.get(self.api.queryAllPost, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.postLists =response.data.postLists;
					self.$store.dispatch('setCommonVariable',{postLists: self.postLists});
				}, function(response) {})
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
						self.addInfo = response.data;
						self.cityInfo.areaId = self.addInfo.areaId;
						//self.address = 
					}
				},function(response){})
			},
			submitForm(formName) {
				let self = this;
				self.addInfo.areaId = self.cityInfo.areaId;
				self.addInfo.areaAddress = self.cityInfo.areaAddress;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.updateEmployeeInfo, {
							params: {
								accessToken: self.$store.state.user.token,
								employeeId:self.$store.state.app.viewId,
								info: self.addInfo,
							}
						},function(response){
							if(response.data) {
								self.$message({
									type: 'success',
									message: '修改成功',
									duration: 2000
								});
								self.$emit('changeComp', 'sectionList');
							}else{
								self.$message({
									type: 'warning',
									message: '修改失败',
									duration: 2000
								});
							}
						},function(response){})
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