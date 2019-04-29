<template>
	<div class="app-container">
		<h5 class="app-crumb"><em class="app-crumb-line"></em>全部消息</h5>
		<div class="app-main all-msg mt20">
			<table>
				<thead>
					<tr>
						<input type="checkbox" v-model='allChecked' @change="allCheck"/>
						<th>序号</th>
						<th>标题内容</th>
						<th>发送人</th>
						<th>发送时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(message,index) in tableDataList" :class="{ 'c-read':message.isRead == 1, 'c-unread':message.isRead == 0}">
						<input type="checkbox" v-model='message.checked' @change="oneChange"/>
						<td>{{index+1}}</td>
						<td>
							<span @click="signRead(message.messageID,message.isRead)">
								{{message.title}}
							</span>
						</td>
						<td>{{message.sendName}}</td>
						<td>{{message.createTime}}</td>
					</tr>
				</tbody>
			</table>
			<footer>
				<div class="msgOperate">
					<button @click="deleteMsg">删除</button>
				</div>
				<el-pagination 
				@current-change="handleCurrentChange" 
				:current-page.sync="currentPage" 
				:page-size="pageSize" 
				layout="total, prev, pager, next" 
				:total="totalMsgNum">
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
				tableDataList:[],
				totalMsgNum:0,
				currentPage: 1,
				pageSize: 10,
				beginRow:'',
				endRow:'',
				allChecked:false,
			}
		},
		mounted() {
			var vm = this;
			vm.getList();
			vm.getListCount()
		},
		methods: {
			signRead(messageID,isRead) {
				let self = this;
				if(isRead == 0) {
					this.$http.get(this.api.updateUnreadMessage, {
						params: {
							accessToken: this.$store.state.user.token,
							messageIDs:messageID,									
						}
					},function(response){
						if(response.status == 200) {
							self.$router.push({
								path:'/message/detail',
								query:{messageID:messageID}
							})
						}
					},function(response){
							//失败回调
					})	
				}else{
					self.$router.push({
						path:'/message/detail',
						query:{messageID:messageID}
					})
				}
				 		 
			},
			deleteMsg() {
				let self = this;
				let checkedArr = self.tableDataList.filter(e=>{
					return e.checked == true
				})
				
				if(checkedArr.length>0) {
					let messageIDs  = '';
					this.tableDataList.forEach(e=>{
							if(e.checked) {
								messageIDs += e.messageID  + ',';
							}
					})
					this.$http.get(this.api.deleteMessage, {
						params: {
							accessToken: this.$store.state.user.token,
							messageIDs:messageIDs,
												
						}
					},function(response){
						if(response.status == 200) {
							location.reload()
						}
					},function(response){
							//失败回调
					})
				}else{
					self.$message.warning('请选择想要删除的信息');
				}
			},
			oneChange() {
				let checkedArr = []
				this.tableDataList.forEach(e=>{
						if(e.checked){
							checkedArr.push(e.messageID)
						}
				})
				if(checkedArr.length == this.tableDataList.length) {
					this.allChecked = true
				}else{
					this.allChecked = false
				}
			},
			allCheck() {
				if(this.allChecked){
					this.tableDataList.forEach(e=>{
						 e.checked = true
					})
				}else{
					this.tableDataList.forEach(e=>{
						 e.checked = false
					})
				}
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getUnreadMessageList, {
					params: {
						accessToken: this.$store.state.user.token,
						beginRow: this.beginRow,
						endRow: this.endRow,			
					}
				},function(response){
					if(response.status == 200) {
						if(response.data.length>0){
							self.tableDataList = response.data;
							self.tableDataList.forEach(e=>{
								e.checked = false
							})
						}
						
					}
				},function(response){
	                //失败回调
	            })
				
			},
			getListCount(){
				let self = this;
				self.$http.get(self.api.getUnreadMessageNum, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				},function(response){
					if(response.status == 200) {
						self.totalMsgNum = parseInt(response.data);
					}
				},function(response){})
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getList();
			},
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