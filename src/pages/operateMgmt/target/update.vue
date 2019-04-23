<template>
	<div class="app-form mt20 ml40">
		<el-form :model="addInfo" :rules="rules" ref="addInfo" label-width="100px" size="mini">
			<div class="mt30">
				<el-form-item label="时间：" prop="targetDate">
					<el-date-picker v-model="addInfo.targetDate" type="year" placeholder="选择年" size="mini" value-format="yyyy">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="支出目标：" prop="outcomeTarget">
					<el-input v-model="addInfo.outcomeTarget"></el-input><span class="unit">元</span>
				</el-form-item>
				<el-form-item label="收入目标：" prop="incomeTarget">
					<el-input v-model="addInfo.incomeTarget"></el-input><span class="unit">元</span>
				</el-form-item>
				<el-form-item label="利润目标：" prop="profitTarget">
					<el-input v-model="addInfo.profitTarget"></el-input><span class="unit">元</span>
				</el-form-item>
				<el-form-item label="说明：" prop="remark">
					<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addInfo.remark"></el-input>
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
	import axios from 'axios';
	export default {
		name: 'sectionUpdate',
		data() {
			return {
				addInfo: {
					outcomeTarget: '',
					incomeTarget: '',
					profitTarget: '',
					tradeDate:'',
					remark:''
				},
				rules: {
					outcomeTarget: [{
						required: true,
						message: '请输入支出目标',
						trigger: 'blur'
					}],
					profitTarget: [{
						required: true,
						message: '请输入收入目标',
						trigger: 'blur'
					}],
					incomeTarget: [{
						required: true,
						message: '请输入利润目标',
						trigger: 'blur'
					}],
					targetDate: [{
						required: true,
						message: '请选择目标年份',
						trigger: 'change'
					}],
				},
			};
		},
		created() {
			let self = this;
				self.$http.get(self.api.getMissionInfo, {
					params: {
						accessToken: self.$store.state.user.token,
						missionId:self.$store.state.app.viewId
					}
				},function(response){
					if(response.status == 200) {
						self.addInfo = response.data;
					}
				},function(response){})
		},
		methods: {
			submitForm(formName) {
				let self = this;
				self.$http.get(self.api.updateMission, {
					params: {
						accessToken: self.$store.state.user.token,
						missionId:self.$store.state.app.viewId,
						targetDate: self.addInfo.targetDate,
						incomeTarget: self.addInfo.incomeTarget,
						profitTarget: self.addInfo.profitTarget,
						outcomeTarget: self.addInfo.outcomeTarget,
						remark: self.addInfo.remark,
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
							type: 'error',
							message: '新增失败',
							duration: 2000
						});
					}
				}, function(response) {
					//失败回调
				})

			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.$emit('changeComp', 'sectionList');
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