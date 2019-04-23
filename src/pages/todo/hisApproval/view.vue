<template>
	<div class="app-form mt20 ml40">
		<h5 class="info-tit mt30">任务列表</h5>
		<table class="mt20">
			<thead>
				<tr>
					<th>序号</th>
					<th>审批人</th>
					<th>审批结果</th>
					<th>审批时间</th>
					<th>批注</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(info,index) in approvalList">
					<td>{{index+1}}</td>
					<td>{{info.userName}}</td>
					<td>{{info.status}}</td>
					<td>{{info.time}}</td>
					<td>{{info.message}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				approvalList: '',
			}
		},
		mounted() {
			var self = this;
			self.getInfo();
		},
		methods: {
			getInfo() {
				var self = this;
				this.$http.get(this.api.getHistoryWorkCommentById, {
					params: {
						accessToken: self.$store.state.user.token,
						productID: this.$store.state.app.viewId,
					}
				}, function(response) {
					if(response.status == 200) {
						self.approvalList = response.data.commentList;
					}
				}, function(response) {
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
	
	.app-form {
		table {
			width: 100%;
			border-collapse: collapse;
			tr {
				line-height: 32px;
				height: 32px;
				border-bottom: #fff solid 1px;
				td {
					text-align: center;
					color: #666;
				}
				th {
					text-align: center;
					color: #333;
				}
				input {
					margin-left: 12px;
				}
				input[type="text"] {
					height: 27px;
					width: 120px;
					margin-left: 0;
				}
			}
			thead tr {
				background: #e6e6e6;
			}
			tbody tr {
				background: #f2f2f2;
			}
			a {
				color: #0099cc;
				padding: 0 5px;
				cursor: pointer;
			}
		}
	}
</style>