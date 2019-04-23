<template>
	<div>
		<div class="app-search ml10 mt5">
			<!--<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="店铺名称">
					<el-input v-model="shopName" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="status"  clearable>
						<el-option label="使用" value="1"></el-option>
						<el-option label="未使用" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item  class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="addEvent">新增</el-button>
				</el-form-item>
			</el-form>-->
		</div>
		<div class="app-main mt20" id="app-main">
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>机器名</th>
						<th>服务区</th>
						<th>销售店铺</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(info,index) in posList">
						<td>{{index+1}}</td>
						<td>{{info.DevID}}</td>
						<td>{{info.restArea}}</td>
						<td>{{info.shop}}</td>
						<td>
							<a @click ="viewEvent(info)">位置设定</a>
						</td>
					</tr>
					<!--<tr>
						<td>1</td>
						<td>11</td>
						<td>test</td>
						<td>shop</td>
						<td>
							<a @click ="viewEvent({})">位置设定</a>
						</td>
					</tr>-->
				</tbody>
			</table>
			<p v-show="total == 0" class="noDataTip">没有找到相关数据！</p>
			<footer v-show="total > 0">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</footer>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'sectionList',
		data() {
			return {
				total: -1,
				currentPage: 1,
				pageSize: 10,
				beginRow:'',
				endRow:'',
				posList:[]
			}
		},
		mounted() {
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height-200 + 'px'):(height+'px') ;
		},
		methods: {
			viewEvent(ID) {
				this.$emit('changeComp', 'sectionAdd', '查看');
				this.$store.dispatch('setViewId', ID);
			},
			searchEvent(){
				this.getList();
				this.getListCount();
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage-1)+1;
				self.endRow = self.currentPage * self.pageSize;
				self.$http.get(self.api.getPosShopList, {
					params: {
						accessToken: self.$store.state.user.token,
						beginRow: self.beginRow,
						endRow: self.endRow,
					}
				},function(response){
					if(response.status == 200) {
						self.posList = response.data;	
					}
				},function(response){ })
				
			},
			//查询条数
			getListCount(){
				let self = this;
				self.$http.get(self.api.getPosShopListCount, {
					params: {
						accessToken: self.$store.state.user.token,
					}
				},function(response){
					if(response.status == 200) {
						self.total = parseInt(response.data);
					}
				},function(response){ })
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getList();
			},
			

		},

	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.app-main {
		.el-button--text {
			border: none;
			color: #0099cc;
		}

	}
</style>