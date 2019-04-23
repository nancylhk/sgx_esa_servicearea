<template>
	<div>
		<div class="app-search ml10 mt5">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="名称">
					<el-input v-model="commodityName"></el-input>
				</el-form-item>
				<el-form-item label="价格">
					<input v-model="priceLow" class="queryIpt" />
					<span style="color: #d8dce5;">~</span>
					<input v-model="priceTop" class="queryIpt" />
				</el-form-item>
				<el-form-item class="right">
					<el-button type="primary" @click="searchEvent">查询</el-button>
					<el-button type="primary" @click="addEvent">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="app-main" id="app-main">
			<draggable v-model="tags" :options="{disabled:false,chosenClass:'choose',animation:150}" :move="getdata" @update="datadragEnd" @start="drag=true" @end="drag=false">
				<transition-group>
					<div v-for="element in tags" :key="element.id" class="posTag" @click="getCommodityInfo(element)">
						{{element.name}}
					</div>
				</transition-group>
			</draggable>
			<!--<p v-show="total == 0" class="noDataTip">没有找到相关数据！</p>
			<footer v-show="total > 0">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</footer>-->
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import draggable from 'vuedraggable';
	export default {
		name: 'sectionList',
		data() {
			return {
				total: -1,
				currentPage: 1,
				pageSize: 10,
				commodityName: '',
				priceLow: '',
				priceTop: '',
				beginRow: '',
				endRow: '',
				priceDialogVisible: false,
				commodityList: '',
				commodityInfo: '',
				price: '',
				tags: [{
					"name": "康师傅红烧牛肉面",
					"id": "001",
					"price":5.0
				}, {
					"name": "泡椒凤爪",
					"id": "002",
					"price":7.0
				}, {
					"name": "烤馍片",
					"id": "003",
					"price":4.0
				}, {
					"name": "小馒头",
					"id": "004",
					"price":8.0
				}]
			}
		},
		components: {　　
			draggable
		},
		mounted() {
			this.getList();
			this.getListCount();
			var height = document.documentElement.clientHeight;
			document.getElementById("app-main").style.height = (height > 700) ? (height - 200 + 'px') : (height + 'px');
		},
		methods: {
			addEvent() {
				this.$emit('changeComp', 'sectionAdd', '新增');
			},
			viewEvent(ID) {
				this.$emit('changeComp', 'sectionView', '查看');
				this.$store.dispatch('setViewId', ID);
			},
			updateEvent(ID) {
				this.$emit('changeComp', 'sectionUpdate', '修改');
				this.$store.dispatch('setViewId', ID);
			},
			searchEvent() {
				this.getList();
				this.getListCount();
			},
			getdata(evt) {
				console.log(evt.draggedContext.element.id)
			},
			datadragEnd(evt) {
				console.log('拖动前的索引 :' + evt.oldIndex)
				console.log('拖动后的索引 :' + evt.newIndex)
			},
			getCommodityInfo(item){
				console.log(item.price);
				console.log(item.name);
			},
			deleteEvent(ID) {
				this.$confirm('确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true
				}).then(() => {
					var self = this;
					self.$http.get(self.api.deleteCommodityInfo, {
						params: {
							accessToken: self.$store.state.user.token,
							commodityID: ID,
						}
					}, function(response) {
						if(response.data) {
							self.$message({
								type: 'success',
								message: '删除成功',
								duration: 2000
							});
							self.getList();
							self.getListCount();
						} else {
							self.$message({
								type: 'warning',
								message: '删除失败',
								duration: 2000
							});
						}
					}, function(response) {
						//失败回调
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
						duration: 2000
					});
				});
			},
			getList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				this.$http.get(this.api.getCommodityList, {
					params: {
						accessToken: self.$store.state.user.token,
						commodityName: self.commodityName,
						priceLow: self.priceLow,
						priceTop: self.priceTop,
						beginRow: self.beginRow,
						endRow: self.endRow,
					}
				}, function(response) {
					if(response.status == 200) {
						self.commodityList = response.data;
					}
				}, function(response) {
					//失败回调
				})
			},
			getListCount() {
				let self = this;
				self.$http.get(self.api.getCommodtiyCount, {
					params: {
						accessToken: self.$store.state.user.token,
						commodityName: self.commodityName,
						priceLow: self.priceLow,
						priceTop: self.priceTop,
					}
				}, function(response) {
					if(response.status == 200) {
						self.total = response.data;
					}
				}, function(response) {})
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
	
	.dialog-cont {
		span {
			display: inline-block;
			width: 43%;
			text-align: left;
		}
		label {
			display: inline-block;
			width: 32%;
			text-align: right;
			padding-right: 10px;
		}
		input {
			height: 26px;
			-webkit-appearance: none;
			background-color: #fff;
			border-radius: 4px;
			border: 1px solid #d8dce5;
			box-sizing: border-box;
			color: #5a5e66;
			display: inline-block;
			line-height: 1;
			outline: 0;
			padding: 0 15px;
			width: 43%;
		}
	}
	
	.posTag {
		display: inline-block;
		width: 120px;
		height: 60px;
		border-radius: 10px;
		background: #f7f7f7;
		text-align: center;
		line-height: 60px;
		margin: 1px;
		cursor: default;
	}
</style>