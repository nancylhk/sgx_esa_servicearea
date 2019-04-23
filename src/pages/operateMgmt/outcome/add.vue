<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" size="mini"  :inline-message="true">
			<div class="mt30">
				<el-form-item label="支出类型" prop="outcomeItem">
					<el-select v-model="addInfo.outcomeItem">
						<el-option v-for="(item,index) in payOutTypes" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支出金额：" prop="outcomeAmount">
					<el-input v-model="addInfo.outcomeAmount"></el-input><span class="unit">元</span>
				</el-form-item>
				<el-form-item label="支付方式：" prop="outcomeTypeId">
					<el-select v-model="addInfo.outcomeTypeId">
						<el-option v-for="(item,index) in paymentTypes" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支出时间：" prop="outcomeTime">
					<el-date-picker v-model="addInfo.outcomeTime" type="date" size="mini" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="经办人：" prop="handler">
					<el-input v-model="addInfo.handler"></el-input>
				</el-form-item>
				<el-form-item label="上传文件：" prop="picUrl">
					<el-upload class="avatar-uploader" action="" :show-file-list="false" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="支出说明：" prop="commont">
					<el-input type="textarea" :rows="4" v-model="addInfo.commont"></el-input>
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
	import validateRules from '../../../utils/validate';
	export default {
		name: 'sectionAdd',
		data() {
			return {
				addInfo: {
					outcomeAmount: '',
					outcomeTypeId: '',
					outcomeTime: '',
					outcomeItem:'',
					handler: '',
					commont: '',
					picUrl: ''
				},
				paymentTypes:[],
				payOutTypes:[],
				imageUrl: '',
				rules: {
					outcomeAmount: [
					{ required: true, message: '请输入支出金额', trigger: 'blur' },
					{
						required: true,
						validator: validateRules.isNumber,
						trigger: 'blur'
					}],
					outcomeTypeId: [{
						required: true,
						message: '请选择支出类型',
						trigger: 'change'
					}],
					outcomeItem: [{
						required: true,
						message: '请选择支出事项',
						trigger: 'change'
					}],
					outcomeTime: [{
						required: true,
						message: '请选择支出时间',
						trigger: 'change'
					}],
					handler: [{
						required: true,
						message: '请输入经办人',
						trigger: 'blur'
					}],
					
				}
			};
		},
		created() {
			var self = this;
			//支付方式
			if(self.$store.state.app.commonVariable.paymentTypes) {
				self.paymentTypes = self.$store.state.app.commonVariable.paymentTypes;
			} else {
				self.$http.get(self.api.getPaymentType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.paymentTypes = response.data.paymentTypes;
					self.$store.dispatch('setCommonVariable', {
						paymentTypes: self.paymentTypes
					});
				}, function(response) {})
			}
			//支出事项
			if(self.$store.state.app.commonVariable.payOutTypes) {
				self.payOutTypes = self.$store.state.app.commonVariable.payOutTypes;
			} else {
				self.$http.get(self.api.gePayOutType, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				}, function(response) {
					self.payOutTypes = response.data.payOutTypes;
					self.$store.dispatch('setCommonVariable', {
						payOutTypes: self.payOutTypes
					});
				}, function(response) {})
			}
		},
		methods: {
			submitForm(formName) {
				let self = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						self.$http.get(self.api.addOutcomeInfo, {
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
						},function(response){})
					}
				});
			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$emit('changeComp', 'sectionList');
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === "image/png";
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传图片格式错误!');
				}
				if(!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}

		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.avatar-uploader .el-upload {
		border: 1px solid #d8dce5;
		border-radius: 4px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>