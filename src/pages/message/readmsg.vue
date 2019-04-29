<template>
	<div class="app-container">
		<h5 class="app-crumb"><em class="app-crumb-line"></em>已读消息</h5>
		<div class="app-main unread-msg mt20">
			<table>
				<thead>
					<tr>
						<input type="checkbox" v-model='allChecked'   @change="allCheck"/>
						<th>序号</th>
						<th>标题内容</th>
						<th>发送人</th>
						<th>发送时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in tableDataList">
						<input type="checkbox" v-model='info.checked' @change="oneChange"/>
						<td>{{index+1}}</td>
						<td>
							<router-link :to="{path:'/message/detail',query:{messageID:info.messageID}}">
								{{info.title}}
							</router-link>
						</td>
						<td>{{info.sendName}}</td>
						<td>{{info.createTime}}</td>
					</tr>
				</tbody>
			</table>
			<footer>
				<div class="msgOperate">
					<button @click="deleteMsg">删除</button>
					<!-- <button class="ml20" @click="signReaded">标记已读</button> -->
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
	import axios from 'axios';
	export default {
		data() {
			return {
				currentPage: 1,
				pageSize: 10,
				beginRow:'',
				endRow:'',
				allChecked:false,
				totalMsgNum: 0,
				formSearch: {
					cont: '',
					state: ''
				},
				tableDataList:[]

			}
		},
		created() {
			this.getListCount();
			this.getList()
		},
		methods: {
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
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getUnreadMessageList, {
					params: {
						accessToken: this.$store.state.user.token,
						beginRow: this.beginRow,
						endRow: this.endRow,		
						isRead:1			
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
						isRead:1
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
		
	}
</script>

<style lang="scss">
	.unread-msg {
		table tr td {
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