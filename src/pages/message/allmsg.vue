<template>
	<div class="app-container">
		<h5 class="app-crumb"><em class="app-crumb-line"></em>全部消息</h5>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" :model="formSearch" class="demo-form-inline">
				<el-form-item label="内容">
					<el-input v-model="formSearch.cont" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="formSearch.state" clearable>
						<el-option label="已读" value="read"></el-option>
						<el-option label="未读" value="unread"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main all-msg">
			<table>
				<thead>
					<tr><input type="checkbox" /></button>
						<th>序号</th>
						<th>标题内容</th>
						<th>发送人</th>
						<th>发送时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(message,index) in allMsgList" :class="{ 'c-read':message.isRead == 3, 'c-unread':message.isRead == 2}">
						<input type="checkbox" />
						<td>{{index+1}}</td>
						<td>
							<a>{{message.content}}</a>
						</td>
						<td>{{message.sendername}}</td>
						<td>{{message.createTime}}</td>
					</tr>
				</tbody>
			</table>
			<footer>
				<div class="msgOperate">
					<button>删除</button><button class="ml20">标记已读</button>
				</div>
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>

			</footer>

		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				formSearch: {
					cont: '',
					state: ''
				},
				total:Number,
				currentPage: 1,
				pageSize: 10,
				allMsgList: []
			}
		},
		mounted() {
			var vm = this;
			vm.getList();

		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			getList() {
				//全部消息
				let self = this;
				this.$http.get(this.api.getMessageList, {
					params: {
						accessToken: this.$store.state.user.token,
						isread: "all",
						currentPage: this.currentPage,
						pageSize: this.pageSize
					}
				}, function(response) {
					if(response.status == 200) {
						self.allMsgList = response.data.dataArr;
						self.total = parseInt(response.data.value);
					}
				}, function(response) {
					//失败回调
				})
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getList();
			}
		},
		created() {

		},
	}
</script>

<style lang="scss">
.all-msg {
		.c-read td {
			color: #999;
			a {
				color: #999;
			}
			a:hover {
				color: #0099cc;
				border-bottom: solid 1px #0099cc;
			}
		}
		.c-unread td {
			color: #333;
			a {
				color: #333;
			}
			a:hover {
				color: #0099cc;
				border-bottom: solid 1px #0099cc;
			}
		}
	}

</style>