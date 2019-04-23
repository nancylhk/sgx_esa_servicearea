<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="120px" size="mini"  :inline-message="true">
			<div class="mt30">
				<el-form-item label="姓名：" prop="employeeName">
					<el-input v-model="addInfo.employeeName"></el-input>
				</el-form-item>
				<el-form-item label="身份证号：" prop="identifierNo">
					<el-input v-model="addInfo.identifierNo"></el-input>
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
				<el-form-item label="籍贯：" prop="origin">
					<el-input v-model="addInfo.origin"></el-input>
				</el-form-item>
				<el-form-item label="民族：" prop="nation">
					<el-input v-model="addInfo.nation"></el-input>
				</el-form-item>
				<el-form-item label="文化水平：" prop="curtualLevel">
					<el-select v-model="addInfo.curtualLevel" >
						<el-option label="高中" value="1"></el-option>
						<el-option label="专科" value="2"></el-option>
						<el-option label="本科" value="3"></el-option>
						<el-option label="研究" value="4"></el-option>
						<el-option label="博士" value="5"></el-option>
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
				<el-form-item label="合同开始时间：" prop="startDate">
					<el-date-picker v-model="addInfo.startDate" type="date" placeholder="请选择" value-format="yyyy-MM-dd"  :picker-options="pickerStart" size="mini">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="合同到期时间：" prop="deadline">
					<el-date-picker v-model="addInfo.deadline" type="date" placeholder="请选择" value-format="yyyy-MM-dd"  :picker-options="pickerEnd" size="mini">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="状态：" prop="status">
					<el-select v-model="addInfo.status">
						<el-option label="在职" value="1"></el-option>
						<el-option label="离职" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否有健康证：" prop="isHealthyCard">
					<el-select v-model="addInfo.isHealthyCard" >
						<el-option label="是" value="1"></el-option>
						<el-option label="否" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="居住地：" class="re-select-ipt3 mustIcon"  prop="cityInfo">
					<city-select v-model="cityInfo"></city-select>
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
		name: 'sectionAdd',
		data() {
			return {
				addInfo: {
					employeeName: '',
					age:'',
					gender: '',
					origin:'',
					nation:'',
					identifierNo: '',
					curtualLevel:'',
					postId: '',
					areaId: '',
					areaAddress: '',
					detailedAddress:'',
					deadline:'',
					startDate:'',
					salary:'',
					isHealthyCard:'',
					healthyPicUrl:'',
					status:'',
					
				},
				cityInfo: '',
				postLists:[],
				pickerEnd: {  
			        disabledDate: (time) => {
						var mon = time.getMonth() + 1;
						var day = time.getDate();
						var tempDay = time.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
	                    return tempDay < this.addInfo.startDate;
	                }
			    },  
			    pickerStart: {  
			        disabledDate(time) {  
			          return false  ;
			        }  
		   		},
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
					postId: [{
						required: true,
						message: '请选择岗位',
						trigger: 'change'
					}],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					origin: [{
						required: true,
						message: '请输入籍贯，如“江苏南京”',
						trigger: 'blur'
					}],
					nation: [{
						required: true,
						message: '请输入名族，如“汉族”',
						trigger: 'blur'
					}],
					curtualLevel: [{
						required: true,
						message: '请选择文化水平',
						trigger: 'change'
					}],
					identifierNo: [{
						validator: validateRules.isCardNo,
						trigger: 'blur',
						required: true,
					}],
					status: [{
						required: true,
						message: '请选择状态',
						trigger: 'change'
					}],
					startDate: [{
						required: true,
						message: '请选择合同开始时间',
						trigger: 'change'
					}],
					deadline: [{
						required: true,
						message: '请选择合同结束时间',
						trigger: 'change'
					}],
					salary:[{
						required: true,
						message: '请输入薪资',
						trigger: 'blur'
					}],
					addressDetail:[{
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
		methods: {
			submitForm(formName) {
				let self = this;
				self.addInfo.areaId = self.cityInfo.areaId;
				self.addInfo.areaAddress = self.cityInfo.areaAddress;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addEmployeeInfo, {
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
							}else{
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