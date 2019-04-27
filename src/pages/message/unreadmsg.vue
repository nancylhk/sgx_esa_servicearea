<template>
	<div class="app-container">
		<h5 class="app-crumb"><em class="app-crumb-line"></em>未读消息</h5>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" :model="formSearch" class="demo-form-inline">
				<el-form-item label="内容">
					<el-input v-model="formSearch.cont" placeholder="内容"></el-input>
				</el-form-item>
				<!--<el-form-item label="状态">
			    <el-select v-model="formSearch.state" placeholder="选择状态">
			      <el-option label="已读" value="read"></el-option>
			      <el-option label="未读" value="unread"></el-option>
			    </el-select>
			  </el-form-item>-->
				<el-form-item  class="right">
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main unread-msg">
			<table>
				<thead>
					<tr><input type="checkbox" v-moel='allChecked'/>
						<th>序号</th>
						<th>标题内容</th>
						<th>发送人</th>
						<th>发送时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in tableDataList">
						<input type="checkbox" v-model='info.checked'/>
						<td>{index+1}</td>
						<td><a>{{info.title}}</a></td>
						<td>陈雪颖</td>
						<td>{{info.createTime}}</td>
					</tr>
				</tbody>
			</table>
			<footer>
				<div class="msgOperate">
					<button>删除</button><button class="ml20" @click="signReaded">标记已读</button>
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
			// this.getList();
			// this.getListCount()
			//全部消息
			/*axios.get('http://192.168.2.73:9009/message/getMessageList',{
				params: {
					accessToken: this.$store.state.app.token,
					isread:"all"
				}
			}).then((response) => {
				if(response.status == 200) {
					this.todoNum = response.data;
				}
			})*/
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			signReaded() {
				let self = this;
				if(this.allChecked == true) {			
					this.$http.get(this.api.updateAllUnreadMessage, {
						params: {
							accessToken: this.$store.state.user.token,								
						}
					},function(response){
						if(response.status == 200) {
							self.getList()
						}
					},function(response){
							//失败回调
					})
				}
				let checkedArr = self.tableDataList.filter(e=>{
					return e.checked == true
				})
				if(checkedArr.length>0) {
					let messageIDs = [];
					checkedArr.forEach(e=>{
						messageIDs.push(e.messageID)
					})
					this.$http.get(this.api.updateAllUnreadMessage, {
						params: {
							accessToken: this.$store.state.user.token,
							messageIDs:messageIDs,
												
						}
					},function(response){
						if(response.status == 200) {
							self.getList()
						}
					},function(response){
							//失败回调
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
						taskID:'',
						beginRow: this.beginRow,
						endRow: this.endRow,					
					}
				},function(response){
					if(response.status == 200) {
						self.tableDataList = response.data;
						self.tableDataList.forEach(e=>{
							e.checked = false
						})
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
						minMoney: self.minMoney,
						maxMoney:self.maxMoney,
						outcomeType: self.outcomeType
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