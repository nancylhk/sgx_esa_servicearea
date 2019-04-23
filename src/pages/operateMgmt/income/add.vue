<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" size="mini">
			<div class="mt30">
				<el-form-item label="收入来源：" prop="incomeType">
					<el-input v-model="addInfo.incomeType"></el-input>
				</el-form-item>
				<el-form-item label="支付方式：" prop="posType">
					<el-select v-model="addInfo.posType" placeholder="请选择">
						<el-option v-for="(item,index) in paymentTypes" :key="item.typeCode" :label="item.typeName" :value="item.typeCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="金额：" prop="countNum">
					<el-input v-model="addInfo.countNum"></el-input><span class="unit">元</span>
				</el-form-item>
				<el-form-item label="时间：" prop="tradeDate">
					<el-date-picker v-model="addInfo.tradeDate" type="date" placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="经办人：" prop="cashierId">
					<el-input v-model="addInfo.cashierId"></el-input>
				</el-form-item>
				<el-form-item label="上传文件：" prop="mutipartFile">
					<!--<el-upload class="avatar-uploader" v-model="addInfo.mutipartFile" action="" :show-file-list="false" :on-success="handleAvatarSuccess">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>-->

					<div class="upload">
						<div class="upload_warp_img" v-show="imgList.length!=0">
							<div class="upload_warp_img_div" v-for="(item,index) of imgList">
								<div class="upload_warp_img_div_top">
									<div class="upload_warp_img_div_text">
										{{item.file.name}}
									</div>
									<img src="../../../assets/images/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
								</div>
								<img :src="item.file.src">
							</div>
						</div>
						<div class="upload_warp" @click="fileClick" v-show="imgList.length==0">
							<img src="../../../assets/images/upload.png">
						</div>
						<input @change="fileChange($event)" type="file" id="upload_file" accept="image/jpeg, image/png, image/jpg" style="display: none" />
					</div>

				</el-form-item>
				<el-form-item label="说明：" prop="commont">
					<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addInfo.commont"></el-input>
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
	import axios from 'axios';
	export default {
		name: 'sectionAdd',
		data() {
			return {
				addInfo: {
					cashierId: '',
					incomeType: '',
					posType: '',
					commont: '',
					countNum: '',
					tradeDate: ''
				},
				paymentTypes: [],
				rules: {
					countNum: [{
							required: true,
							message: '请输入金额',
							trigger: 'blur'
						},
						{
							required: true,
							validator: validateRules.isNumber,
							trigger: 'blur'
						}
					],
					incomeType: [{
						required: true,
						message: '请输入收入来源',
						trigger: 'blur'
					}],
					posType: [{
						required: true,
						message: '请选择支付方式',
						trigger: 'change'
					}],
					tradeDate: [{
						required: true,
						message: '请选择交易时间',
						trigger: 'change'
					}],
					cashierId: [{
						required: true,
						message: '请输入经办人',
						trigger: 'blur'
					}]
				},
				mutipartFile: {},
				imgList: []
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
		},
		methods: {
			submitForm(formName) {
				let self = this;
				//this.$refs[formName].validate((valid) => {
				//if(valid) {
				//var data = new URLSearchParams();
				//	data.append('mutipartFile', self.mutipartFile);       //你要传给后台的参数值 key/value
				/*						self.$http.post(self.api.addIncome,data, {
											params: {
												accessToken: self.$store.state.user.token,
												info: self.addInfo
											}
										}, function(response) {
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
										}, function(response) {
											//失败回调
										})*/
				/* var params = new URLSearchParams();*/
				var params = new FormData()
				params.append('mutipartFile', self.mutipartFile);
				params.append('accessToken', self.$store.state.user.token);
				params.append('info', JSON.stringify(self.addInfo));

				self.$http.post(self.api.addIncome, params, {
					headers: {
						//'Content-type': 'application/x-www-form-urlencoded'
						"Content-Type": "multipart/form-data"
					},
				}, function(response) {
					if(response.data) {
						self.$message({
							type: 'success',
							message: '新增成功',
							duration: 2000
						});
						self.$emit('changeComp', 'sectionList');
					} else {
						self.$message({
							type: 'error',
							message: '新增失败',
							duration: 2000
						});
					}
				}, function(response) {
					//失败回调
				})

				/*axios({
					method: 'post',
					url: self.api.addIncome,
					data: params,
					headers: {
						//'Content-type': 'application/x-www-form-urlencoded'
						"Content-Type": "multipart/form-data"
					},
				}).then((response) => {
					if(response.data) {
						self.$message({
							type: 'success',
							message: '新增成功',
							duration: 2000
						});
						self.$emit('changeComp', 'sectionList');
					} else {
						self.$message({
							type: 'error',
							message: '新增失败',
							duration: 2000
						});
					}
				});*/
				//}
				//});

			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$emit('changeComp', 'sectionList');
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},

			fileClick() {
				document.getElementById('upload_file').click()
			},
			fileChange(el) {
				if(el.target.files[0].size) {
					this.mutipartFile = el.target.files[0];
					this.fileList(el.target);
					el.target.value = ''
				}

			},
			fileList(fileList) {
				let files = fileList.files;
				for(let i = 0; i < files.length; i++) {
					//判断是否为文件夹
					if(files[i].type != '') {
						this.showImage(files[i]);
					} else {
						//文件夹处理
						//this.folders(fileList.items[i]);
					}
				}
			},
			showImage(file) {
				//判断是否为图片文件
				if(file.type.indexOf('image') == -1) {
					file.src = 'wenjian.png';
					this.imgList.push({
						file
					});
				} else {
					let reader = new FileReader();
					let image = new Image();
					let _this = this;
					reader.readAsDataURL(file);
					reader.onload = function(evt) {
						var fileString = evt.target.result;
						//_this.mutipartFile = fileString;
						file.src = this.result;
						image.onload = function() {
							let width = image.width;
							let height = image.height;
							file.width = width;
							file.height = height;
							_this.imgList.push({
								file
							});
						};
						image.src = file.src;
					}
				}
			},
			fileDel(index) {
				this.imgList.splice(index, 1);
			},

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
	
	.upload_warp_img_div_del {
		position: absolute;
		top: 6px;
		width: 16px;
		right: 4px;
	}
	
	.upload_warp_img_div_top {
		position: absolute;
		top: 0;
		width: 100%;
		height: 30px;
		background-color: rgba(0, 0, 0, 0.4);
		line-height: 30px;
		text-align: left;
		color: #fff;
		font-size: 12px;
		text-indent: 4px;
	}
	
	.upload_warp_img_div img {
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
	}
	
	.upload_warp_img_div {
		position: relative;
		height: 100px;
		width: 100px;
		border: 1px solid #ccc;
		margin: 0px 30px 10px 0px;
		float: left;
		line-height: 100px;
		display: table-cell;
		text-align: center;
		background-color: #eee;
		cursor: pointer;
	}
	
	.upload_warp_img {
		padding: 14px 0 0 14px;
	}
	
	.upload_warp img {
		width: 80px;
		height: 80px;
	}
</style>