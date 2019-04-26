<template>
	<div class="header-container">
		<router-link to="/homepage">
			<div class="header-item">
				<img src="../../assets/images/logo.png" class="header-logo">
				<span class="header-tit">驿智云</span>
			</div>
		</router-link>
		<div class="header-topbar">
			<div style="width:150px" v-bind:class="{'topbar-open': topBarIsShow }" @click="toggleTopBar()">
				<span class="topbar-tit" id="toggler-btn">云服务<em class="topbar-arrowd" id="toggler-icon"></em></span>
			</div>
			<div class="topbar-container" v-show="topBarIsShow">
				<div class="visit-history">
					<p class="visit-tit">最近访问</p>
					<router-link class="tabs-view" v-for="tag in Array.from(visitedRecord)" :to="{path:tag.path,query: {barId:tag.parentId}}" :key="tag.path">
						<p class="visit-record" @click="changeParentId(tag.parentId)">{{tag.name}}</p>
					</router-link>
				</div>
				<div class="topbar-product" id="topbar-item">
					<el-tabs :tab-position="tabPosition">
						<el-tab-pane label="全部服务">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="基本资料">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '12'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="基础设施">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '01'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="商品管理">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '10'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<!--<el-tab-pane label="商超管理">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '02'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>-->
						<el-tab-pane label="营运管理">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '03'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="人力资源">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '04'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="餐厅管理">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '05'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="POS机管理">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '07'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="销售统计">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '08'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="车流量统计">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '09'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="报表数据采集">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '13'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<div class="header-info">
			<input class="header-search" />
			<span class="ml40"><em class="user-logo"></em>欢迎您,陈雪颖</span>
			<span class="ml20">注销</span>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				topBarIsShow: false,
				tabPosition: 'left',
				navItem: [
					/*{
						"title": "基本信息",
						"description": "服务区基本信息查看、修改",
						"path": "/infrastructure/basic",
						"parentId": "01",
						"parentName": "基础设施"
					},*/
					{
						"title": "安全设置",
						"description": "查看用户账号基本资料，修改密码等",
						"path": "/basicInfo/securitySettings",
						"parentId": "12",
						"parentName": "基本资料"
					},
					{
						"title": "基础信息",
						"description": "查看用户基本信息，基本设施等",
						"path": "/basicInfo/baseMsg",
						"parentId": "12",
						"parentName": "基本资料"
					},
					{
						"title": "人员结构",
						"description": "查看用户岗位分配信息",
						"path": "/basicInfo/memberOrg",
						"parentId": "12",
						"parentName": "基本资料"
					},
					{
						"title": "我的申请列表",
						"description": "新增商品提交上级单位审核，修改商品",
						"path": "/publicStorage/addApproval",
						"parentId": "10",
						"parentName": "商品管理"
					},
					/*{
						"title": "我的待审核",
						"description": "",
						"path": "/publicStorage/SubmitReview",
						"parentId": "10",
						"parentName": "公用库商品管理"
					},{
						"title": "我的历史审批",
						"description": "",
						"path": "/publicStorage/hisApproval",
						"parentId": "10",
						"parentName": "公用库商品管理"
					},*/
					{
						"title": "商铺",
						"description": "商铺的基本信息、营业范围信息等",
						"path": "/infrastructure/market",
						"parentId": "01",
						"parentName": "基础设施"
					},
					/*{
						"title": "餐厅",
						"description": "餐厅的基本信息、经营范围信息等",
						"path": "/infrastructure/restaurant",
						"parentId": "01",
						"parentName": "基础设施"
					},*/
					{
						"title": "停车场",
						"description": "停车场的基本信息、车位信息等",
						"path": "/infrastructure/carPark",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "汽修",
						"description": "汽修厂的基本信息、经营模式、经营范围",
						"path": "/infrastructure/carRepaire",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "加油站",
						"description": "加油站的基本信息、油品等信息",
						"path": "/infrastructure/gas",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "卫生间",
						"description": "查看卫生间基本信息，新增修改卫生间",
						"path": "/infrastructure/toilet",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "其他设施",
						"description": "查看其他设施基本信息，新增修改其他设施",
						"path": "/infrastructure/other",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "我的商品列表",
						"description": "商品基本信息，包括价格、条形码等",
						"path": "/market/commodityInfo",
						"parentId": "10",
						"parentName": "商品管理"
					},
					{
						"title": "公用库商品列表",
						"description": "查看公用库商品信息，领用商品等",
						"path": "/publicStorage/commodity",
						"parentId": "10",
						"parentName": "商品管理"
					},
/*					{
						"title": "商品展示配置",
						"path": "/market/commodityConfig",
						"parentId": "02",
						"parentName": "商超管理"
					},*/
					{
						"title": "收入管理",
						"description": "查看收入信息，新增收入项",
						"path": "/operateMgmt/income",
						"parentId": "03",
						"parentName": "营运管理"
					},
					{
						"title": "支出管理",
						"description": "查看支出信息，新增支出项",
						"path": "/operateMgmt/outcome",
						"parentId": "03",
						"parentName": "营运管理"
					},{
						"title": "运营目标",
						"description": "查看年度运营目标，新增目标",
						"path": "/operateMgmt/target",
						"parentId": "03",
						"parentName": "营运管理"
					},{
						"title": "收入填报",
						"description": "各项收入填报",
						"path": "/operateMgmt/incomeFill",
						"parentId": "03",
						"parentName": "营运管理"
					},{
						"title": "成本填报",
						"description": "各项成本,车流量,商户合作填报",
						"path": "/operateMgmt/mixFill",
						"parentId": "03",
						"parentName": "营运管理"
					},{
						"title": "项目跟踪与商业合作",
						"description": "项目跟踪与商业合作",
						"path": "/operateMgmt/projectList",
						"parentId": "03",
						"parentName": "营运管理"
					},
					{
						"title": "岗位",
						"description": "查看岗位信息",
						"path": "/humanResources/job",
						"parentId": "04",
						"parentName": "人力资源"
					},
					{
						"title": "人员",
						"description": "查看人员信息，新增修改人员信息",
						"path": "/humanResources/employee",
						"parentId": "04",
						"parentName": "人力资源"
					},
					{
						"title": "菜品信息管理",
						"description": "查看菜品相关信息",
						"path": "/restaurantMgmt/dishes",
						"parentId": "05",
						"parentName": "餐厅管理"
					},
					{
						"title": "原材料信息管理",
						"description": "管理原材料",
						"path": "/restaurantMgmt/material",
						"parentId": "05",
						"parentName": "餐厅管理"
					},
					{
						"title": "POS机管理",
						"description": "查看POS机相关信息，新增修改POS机",
						"path": "/pos/posManage",
						"parentId": "07",
						"parentName": "POS机管理"
					},
					{
						"title": "前台商品位置设定",
						"description": "设置POS机前台商品位置",
						"path": "/pos/posConfig",
						"parentId": "07",
						"parentName": "POS机管理"
					},
					{
						"title": "销售查询",
						"description": "查看服务区销售信息",
						"path": "/statisticalData/sales",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "销售明细查询",
						"description": "查看服务区销售明细信息",
						"path": "/statisticalData/saleDetails",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "营业额报表",
						"description": "查看服务区营业额信息，导出报表",
						"path": "/statisticalData/turnover",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "人员销售报表",
						"description": "查看服务区人员销售信息，导出报表",
						"path": "/statisticalData/employeeSales",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "车流量报表",
						"description": "查看服务区车流量信息，并导出报表",
						"path": "/carTraffic/carFlowReport",
						"parentId": "09",
						"parentName": "车流量统计"
						
					},{
						"title": "车牌颜色报表",
						"description": "查看服务区车牌颜色信息，并导出报表",
						"path": "/carTraffic/carColorReport",
						"parentId": "09",
						"parentName": "车流量统计"
						
					},{
						"title": "地区车流量报表",
						"description": "查看服务区地区车流量信息，并导出报表",
						"path": "/carTraffic/areaTrafficReport",
						"parentId": "09",
						"parentName": "车流量统计"
						
					},{
						"title": "车流量统计图",
						"description": "查看服务区车流量统计图",
						"path": "/carTraffic/carFlowChart",
						"parentId": "09",
						"parentName": "车流量统计"
					},{
						"title": "车牌颜色统计图",
						"description": "查看服务区车牌颜色统计图",
						"path": "/carTraffic/carColorChart",
						"parentId": "09",
						"parentName": "车流量统计"
					},{
						"title": "基础数据",
						"description": "服务区基本信息表、服务区人员结构表",
						"path": "/dataCollection/baseData",
						"parentId": "13",
						"parentName": "数据采集"
					},{
						"title": "经营数据",
						"description": "服务区经营数据",
						"path": "/dataCollection/manageData",
						"parentId": "13",
						"parentName": "数据采集"
					}
				]
			};
		},
		created() {
			let body = document.querySelector('body');
			let self = this;
			body.addEventListener('click', (ev) => {
				if(self.topBarIsShow) {
					if(ev.target.id == 'toggler-btn' || ev.target.id == 'toggler-icon') {
						self.topBarIsShow = true;
					} else if(document.getElementsByClassName('el-tabs__header')[0].contains(ev.target) && ev.target.id != 'toggler-btn') {
						self.topBarIsShow = true;
					} else {
						self.topBarIsShow = false
					}
				}
			}, false)
		},
		computed: {
			visitedRecord() {
				return this.$store.state.app.seviceareaVisitHistory
			}
		},
		methods: {
			toggleTopBar() {
				this.topBarIsShow = !this.topBarIsShow;
			},
			addViewRecord() {
				let currentRoute = {};
				currentRoute['name'] = this.$route.name;
				currentRoute['path'] = this.$route.path;
				currentRoute['parentId'] = this.$route.meta;
				this.$store.dispatch('addVisitedHistory', currentRoute);
			},
			changeParentId(parentId) {
				this.$store.dispatch('setNavbarId', parentId)
			}
		},
		watch: {
			$route(from, to) {
				this.addViewRecord()
			}
		}

	}
</script>

<style lang="scss">
	.header-container {
		width: 100%;
		background-color: #19233c;
		height: 50px;
		color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 12;
		.header-item {
			display: inline-block;
			width: 180px;
			padding-left: 10px;
			vertical-align: top;
			.header-logo {
				width: 24px;
				height: 24px;
				margin-top: 11px;
				vertical-align: top;
			}
			.header-tit {
				font-size: 18px;
				font-weight: bold;
				color: #fff;
				line-height: 50px;
				margin-left: 8px;
			}
		}
		.header-topbar {
			display: inline-block;
			.topbar-tit {
				color: #fff;
				width: 100%;
				height: 50px;
				line-height: 50px;
				display: inline-block;
				text-align: center;
				font-size: 14px;
				cursor: pointer;
				.topbar-arrowd {
					width: 12px;
					height: 7px;
					display: inline-block;
					background: url(../../assets/images/arrow-down.png) no-repeat;
					margin: 0 0 1px 6px;
					cursor: pointer;
				}
			}
			.topbar-tit:hover {
				background-color: #101727;
				.topbar-arrowd {
					transform: rotate(180deg);
				}
			}
			.topbar-open {
				background: #fff;
				.topbar-tit {
					color: #333;
					background-color: transparent;
					.topbar-arrowd {
						background: url(../../assets/images/arrow-up.png) no-repeat;
						transform: rotate(0deg);
					}
				}
			}
			.topbar-container {
				position: absolute;
				min-height: 400px;
				height: auto;
				left: 0;
				right: 0;
				background-color: #fff;
				z-index: 12;
				color: #333;
				-webkit-box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
				box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
				.visit-history {
					background-color: #f7f8fa;
					width: 183px;
					position: absolute;
					bottom: 0;
					top: 0;
					.visit-tit {
						font-size: 14px;
						color: #666;
						text-align: center;
						line-height: 36px;
					}
					.visit-record {
						font-size: 12px;
						color: #666;
						text-align: center;
						line-height: 32px;
						cursor: pointer;
					}
					.visit-record:hover {
						color: #00c1de;
					}
				}
				.topbar-product {
					height: 300px;
					padding-top: 5px;
					position: absolute;
					left: 210px;
					top: 0;
					right: 20px;
					.el-tabs__nav-wrap {
						width: 200px;
						height: 340px;
					}
					.el-tabs__item {
						width: 180px;
						text-align: left;
					}
					.el-tabs__item:hover {
						color: #00c1de;
						cursor: pointer;
					}
					.el-tabs__item.is-active {
						background: #00c1de;
						color: #fff;
					}
					.el-tabs__active-bar {
						height: 2px;
						background-color: #00c1de;
						z-index: 1;
					}
					.el-tabs__header {
						margin: 15px 10px 0 0;
					}
					.el-tabs__content {
						overflow: auto;
						position: relative;
						height: 360px;
					}
					.product-list {
						/*-moz-column-count:4; 
				        -webkit-column-count:4; 
				        column-count:4;
				        display: flex;
				        flex-flow: wrap column;
				        align-content: flex-start;
				        height: 350px;*/
					}
					.product-list li {
						float: left;
						width: 23%;
						height: 75px;
						background: #f7f8fa;
						padding: 0 15px;
						cursor: pointer;
						margin-left: 10px;
						/*-moz-page-break-inside: avoid;
					    -webkit-column-break-inside: avoid;
					    break-inside: avoid;*/
						h5 {
							line-height: 36px;
							height: 30px;
						}
						p {
							color: #999;
							line-height: 20px;
						}
					}
					.product-list li:hover {
						background: #00c1de;
						color: #fff;
						p,
						h5 {
							color: #fff;
						}
					}
				}
			}
		}
		.header-info {
			display: inline-block;
			float: right;
			line-height: 46px;
			color: #fff;
			margin-right: 20px;
			font-size: 14px;
			.header-search {
				width: 200px;
				height: 24px;
				border-radius: 5px;
				border: none;
				padding-left: 10px;
				color: #666;
				vertical-align: middle;
				background-image: url(../../assets/images/search.png);
				background-repeat: no-repeat;
				background-position: 95% center;
			}
			.user-logo {
				width: 16px;
				height: 16px;
				background: url(../../assets/images/user.png) no-repeat;
				display: inline-block;
				margin-right: 5px;
				position: relative;
				top: 3px;
			}
		}
	}
</style>