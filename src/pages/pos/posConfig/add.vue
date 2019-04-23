<template>
	<div class="pos-set">
		<el-row :gutter="10">
			<el-col :span="12">
				<p class="pos-tit"><span>服务区名称:</span><span>{{posInfo.restArea}}</span><span class="ml20">销售店铺: </span><span>{{posInfo.shop}}</span></p>
				<section class="pos-bg">
					<h5 class="chart-tit"></h5>
					<div class="pos-part">
						<el-row :gutter="5">
							<el-col :span="18">
								<div class="pos-part-tit">
									商品列表展示区
								</div>
							</el-col>
							<el-col :span="6">
								<!--<draggable v-model="posList" :options="{}" :move="getdata" @update="datadragEnd" @start="drag=true" @end="drag=false">-->
								<!--<transition-group>-->
								<section>
									<div v-for="(item,index) in posList" :key="item.numbers" class="posTag blue" @click="getPosProductInfo(item)" v-bind:class="{posActive:item.numbers == activeIndex}" v-if="index<8">
										{{item.productName}}
										<p>{{item.price}}<span v-show="item.price != ''">元</span></p>
									</div>
								</section>
								<!--</transition-group>-->
								<!--</draggable>-->
							</el-col>
						</el-row>
					</div>
					<div class="pos-part">
						<!--<draggable v-model="posList">
						<transition-group>-->
							<div v-for="(item,index) in posList" :key="item.numbers" class="posTag blue width12" @click="getPosProductInfo(item)" v-bind:class="{posActive:item.numbers == activeIndex}" v-if="index>7" >
								{{item.productName}}
								<p>{{item.price}}<span v-show="item.price != ''">元</span></p>
							</div>
						<!--</transition-group>
						</draggable>
						draggable="true" @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)" @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)"
						-->
					</div>
					<div class="mt40 mr20 right pos-set-btn">
						<button @click="setBlank()">置空</button>
						<button @click="cancelSelected()">取消选择</button>
					</div>
				</section>
			</el-col>
			<el-col :span="12">
				<div class="pos-add-btn">
					<el-button type="primary" @click="addPosProductInfo()">保存设定</el-button>
					<el-button @click="resetForm()">返回上一页</el-button>
				</div>
				<section class="pos-bg">
					<h5 class="product-tit">设置商品</h5>
					<el-form :inline="true" class="demo-form-inline mt15" label-width="60px" size="mini">
						<el-form-item label="商品编码">
							<el-input v-model="productID"></el-input>
						</el-form-item>
						<el-form-item label="商品名称">
							<el-input v-model="productName"></el-input>
						</el-form-item>
						<el-form-item class="right">
							<el-button type="primary" @click="searchEvent">查询</el-button>
						</el-form-item>
					</el-form>
					<table>
						<thead>
							<tr>
								<th>序号</th>
								<th>服务区</th>
								<th>销售店铺</th>
								<th>商品名称</th>
								<th>商品编码</th>
								<th>商品价格</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(info,index) in productList">
								<td>{{index+1}}</td>
								<td>{{info.restArea}}</td>
								<td>{{info.shop}}</td>
								<td>{{info.productName}}</td>
								<td>{{info.productID}}</td>
								<td>{{info.price}}</td>
								<td>
									<a @click="selectedProduct(info)">选择</a>
								</td>
							</tr>
						</tbody>
					</table>
					<el-pagination class="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
					</el-pagination>
				</section>
			</el-col>

		</el-row>
	</div>
</template>
<script>
	import validateRules from '../../../utils/validate';
	import draggable from 'vuedraggable';
	import axios from 'axios';
	export default {
		name: 'sectionAdd',
		data() {
			return {
				posList: [],
				posInfo: this.$store.state.app.viewId,
				productList: [],
				activeIndex: -1,
				productID: '',
				productName: '',
				total: 1,
				currentPage: 1,
				pageSize: 10,
				beginRow: '',
				endRow: ''
			};
		},
		components: {　　
			draggable
		},
		created() {
			let self = this;
			self.getPosProductList();
			self.getProductList();
			self.getProductListCount();

		},
		methods: {
			handleDragStart(e, item) {
				this.dragging = item;
			},
			handleDragEnd(e, item) {
				this.dragging = null
			},
			//首先把div变成可以放置的元素，即重写dragenter/dragover
			handleDragOver(e) {
				e.dataTransfer.dropEffect = 'move' // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
			},
			handleDragEnter(e, item) {
				e.dataTransfer.effectAllowed = "move" //为需要移动的元素设置dragstart事件
				if(item === this.dragging) {
					return
				}
				const newItems = [...this.posList]
				console.log(newItems)
				const src = newItems.indexOf(this.dragging)
				const dst = newItems.indexOf(item)

				newItems.splice(dst, 0, ...newItems.splice(src, 1))

				this.posList = newItems
			},

			selectedProduct(info) {
				var self = this;
				if(self.activeIndex >= 0) {
					self.posList[self.activeIndex - 1].productName = info.productName;
					self.posList[self.activeIndex - 1].productID = info.productID;
					self.posList[self.activeIndex - 1].price = info.price;
				}

			},
			searchEvent() {
				this.getProductList();
				this.getProductListCount();
			},
			//获取40个pos tag 列表
			getPosProductList() {
				let self = this;
				self.$http.get(self.api.getPosProductList, {
					params: {
						accessToken: self.$store.state.user.token,
						devID: self.posInfo.DevID,
					}
				}, function(response) {
					self.posList = response.data;

				}, function(response) {})

			},
			//获取所有商品列表
			getProductList() {
				let self = this;
				self.beginRow = self.pageSize * (self.currentPage - 1) + 1;
				self.endRow = self.currentPage * self.pageSize;
				self.$http.get(self.api.getAllProductList, {
					params: {
						accessToken: self.$store.state.user.token,
						devID: self.posInfo.DevID,
						beginRow: self.beginRow,
						endRow: self.endRow,
						productID: self.productID,
						productName: self.productName,
					}
				}, function(response) {
					self.productList = response.data;

				}, function(response) {})

			},
			//查询条数
			getProductListCount() {
				let self = this;
				self.$http.get(self.api.getAllProductListCount, {
					params: {
						accessToken: self.$store.state.user.token,
						devID: self.posInfo.DevID,
						productID: self.productID,
						productName: self.productName,
					}
				}, function(response) {
					self.total = parseInt(response.data);

				}, function(response) {})
			},
			getdata(evt) {
				this.activeIndex = parseInt(evt.draggedContext.element.numbers);
			},
			getPosProductInfo(ele) {
				console.log(ele.productName)
				this.activeIndex = parseInt(ele.numbers);
			},
			datadragEnd(evt) {
				/*this.posList[evt.oldIndex].nummber = evt.newIndex;
				this.posList[evt.newIndex].nummber = evt.oldIndex;*/
				/*console.log('拖动前的索引 :' + evt.oldIndex)
				console.log('拖动后的索引 :' + evt.newIndex)*/
			},
			addPosProductInfo() {
				let self = this;
				var params = new URLSearchParams();
				params.append('info', JSON.stringify(self.posList));
				self.$http.post(self.api.addPosProductList, params, {
					headers: {
						//"Content-Type": "multipart/form-data"
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
					url: self.api.addPosProductList,
					data: params,
					//headers: {
					//	"Content-Type": "multipart/form-data"
					//},
				}).then((response) => {
					if(response.data) {
						self.$message({
							type: 'success',
							message: '新增成功',
							duration: 2000
						});
						//self.$emit('changeComp', 'sectionList');
					} else {
						self.$message({
							type: 'warning',
							message: '新增失败',
							duration: 2000
						});
					}
				});*/

			},
			cancelSelected() {
				this.activeIndex = -1;
			},
			setBlank() {
				let self = this;
				self.posList[self.activeIndex - 1].productName = "";
				self.posList[self.activeIndex - 1].productID = "";
				self.posList[self.activeIndex - 1].price = "";
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getProductList();
				this.getProductListCount();
			},
			resetForm(formName) {
				this.$emit('changeComp', 'sectionList');
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.pos-set {
		.el-input {
			position: relative;
			font-size: 12px;
			display: inline-block;
			width: 120px;
		}
		.el-button {
			padding: 5px 18px;
		}
		.pos-bg {
			background: #f5f8fb;
			border: #e0e0e0 solid 1px;
			height: 630px;
			border-radius: 5px;
			padding: 15px 10px;
			clear: both;
		}
		.pos-part{
			height:265px;
		}
		.pos-part-tit {
			line-height: 250px;
			text-align: center;
			font-size: 16px;
		}
		.pos-tit {
			line-height: 50px;
			span {
				padding-left: 10px
			}
		}
		.posTag {
			display: inline-block;
			width: 47.5%;
			height: 65px;
			border-radius: 10px;
			color: #fff;
			text-align: center;
			line-height: 16px;
			margin-top: 2px;
			margin-left: 1%;
			padding-top: 8px;
			cursor: default;
			vertical-align: top;
			position: relative;
			cursor: pointer;
			p {
				bottom: 0;
				width: 100%;
				position: absolute;
				line-height: 24px;
				border-bottom-right-radius: 10px;
				border-bottom-left-radius: 10px;
			}
		}
		.blue {
			background: #6fabff;
			p {
				background: #689ff0;
			}
		}
		.green {
			background: #64ede0;
			p {
				background: #4addc4;
			}
		}
		.pos-set-btn {
			button {
				padding: 6px 18px;
				border-radius: 5px;
				border: none;
				color: #fff;
				background: #0099cc;
				cursor: pointer;
			}
		}
		.pos-add-btn {
			line-height: 50px;
			float: right;
		}
		.width12 {
			width: 12.1%;
			margin-left: 0.3%;
		}
		.product-tit {
			font-weight: bold;
		}
		.pagination {
			position: absolute;
			bottom: 20px;
			right: 30px;
		}
		table {
			width: 100%;
			border-collapse: collapse;
			tr {
				line-height: 38px;
				height: 38px;
				border-bottom: #dce7ea solid 1px;
				td {
					text-align: center;
					color: #999;
				}
				th {
					text-align: center;
					color: #999;
					font-weight: bold;
				}
			}
			thead tr {
				background: #d5e1ef;
			}
			a {
				color: #fff;
				padding: 4px 9px;
				background: #0099cc;
				border-radius: 3px;
				cursor: pointer;
				&:hover {
					background: #5fd5fd;
				}
			}
		}
		.posActive {
			border: solid 2px #feff00;
		}
	}
</style>