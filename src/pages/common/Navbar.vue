<template>
	<div class="nav-container">
		<h5 class="nav-tit">{{navTit[navbarID]}}</h5>
		<!--:navTit="_navTit"-->
		<ul class="nav-subtit">
			<router-link v-for="tit in navSubTitData" v-if="tit.parentId == navbarID" :to="{path:tit.path,query: {barId:tit.parentId}}" :key="tit.path">
				<li :class="tit.path==barId?'aaa':''">{{tit.title}}</li>
			</router-link>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'Navbar',
		data() {
			return {
				barId:this.$route.parentPath,
				navTit: {
					"01": "基础设施",
					/*"02": "商超管理",*/
					"03": "营运管理",
					"06": "消息中心",
					"04": "人力资源",
					// "05": "餐厅管理",
					"07": "POS机管理",
					"08": "销售统计",
					"09": "车流量统计",
					"10": "商品管理",
					"11": "我的待办",
					"12": "基本资料",
					// "13":"报表数据采集"
				},
				navSubTitData: [
					/*{
						"title": "基本信息",
						"path": "/infrastructure/basic",
						"parentId": "01",
						"parentName": "基础设施"
					},*/
					{
						"title": "商铺",
						"path": "/infrastructure/market",
						"parentId": "01",
						"parentName": "基础设施"
					},
					/*{
						"title": "餐厅",
						"path": "/infrastructure/restaurant",
						"parentId": "01",
						"parentName": "基础设施"
					},*/
					{
						"title": "停车场",
						"path": "/infrastructure/carPark",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "汽修",
						"path": "/infrastructure/carRepaire",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "加油站",
						"path": "/infrastructure/gas",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "卫生间",
						"path": "/infrastructure/toilet",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "其他设施",
						"path": "/infrastructure/other",
						"parentId": "01",
						"parentName": "基础设施"
					},
					{
						"title": "我的商品列表",
						"path": "/market/commodityInfo",
						"parentId": "10",
						"parentName": "商品管理"
					},
					{
						"title": "收入管理",
						"path": "/operateMgmt/income",
						"parentId": "03",
						"parentName": "营运管理"
					},
					{
						"title": "支出管理",
						"path": "/operateMgmt/outcome",
						"parentId": "03",
						"parentName": "营运管理"
					},
					{
						"title": "运营目标",
						"description": "",
						"path": "/operateMgmt/target",
						"parentId": "03",
						"parentName": "营运管理"
					},
					{
						"title": "收入填报",
						"description": "",
						"path": "/operateMgmt/incomeFill",
						"parentId": "03",
						"parentName": "营运管理"
					},
					// {
					// 	"title": "填报情况",
					// 	"description": "",
					// 	"path": "/operateMgmt/fillList",
					// 	"parentId": "03",
					// 	"parentName": "营运管理"
					// },
					{
						"title": "成本填报",
						"description": "",
						"path": "/operateMgmt/mixFill",
						"parentId": "03",
						"parentName": "营运管理"
					},
					{
						"title": "项目跟踪与商业合作",
						"description": "",
						"path": "/operateMgmt/projectList",
						"parentId": "03",
						"parentName": "营运管理"
					},
					{
						"title": "全部消息",
						"path": "/message/allmsg",
						"parentId": "06",
						"parentName": "消息中心"
					},
					{
						"title": "未读消息",
						"path": "/message/unreadmsg",
						"parentId": "06",
						"parentName": "消息中心"
					},
					{
						"title": "已读消息",
						"path": "/message/readmsg",
						"parentId": "06",
						"parentName": "消息中心"
					},
					{
						"title": "我的历史审批",
						"path": "/myTodo/hisApproval",
						"parentId": "11",
						"parentName": "待办中心"
					},
					{
						"title": "岗位",
						"path": "/humanResources/job",
						"parentId": "04",
						"parentName": "人力资源"
					},
					{
						"title": "人员",
						"path": "/humanResources/employee",
						"parentId": "04",
						"parentName": "人力资源"
					},
// 					{
// 						"title": "菜品信息管理",
// 						"description": "",
// 						"path": "/restaurantMgmt/dishes",
// 						"parentId": "05",
// 						"parentName": "餐厅管理"
// 					},
// 					{
// 						"title": "原材料信息管理",
// 						"description": "",
// 						"path": "/restaurantMgmt/material",
// 						"parentId": "05",
// 						"parentName": "餐厅管理"
// 					},
					{
						"title": "POS机管理",
						"description": "",
						"path": "/pos/posManage",
						"parentId": "07",
						"parentName": "POS机管理"
					},
					{
						"title": "前台商品位置设定",
						"path": "/pos/posConfig",
						"parentId": "07",
						"parentName": "POS机管理"
					},
					{
						"title": "销售查询",
						"description": "",
						"path": "/statisticalData/sales",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "销售明细查询",
						"description": "",
						"path": "/statisticalData/saleDetails",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "营业额报表",
						"description": "",
						"path": "/statisticalData/turnover",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "人员销售报表",
						"description": "",
						"path": "/statisticalData/employeeSales",
						"parentId": "08",
						"parentName": "销售统计"
					},
					{
						"title": "车流量报表",
						"description": "",
						"path": "/carTraffic/carFlowReport",
						"parentId": "09",
						"parentName": "车流量统计"
						
					},{
						"title": "车牌颜色报表",
						"description": "",
						"path": "/carTraffic/carColorReport",
						"parentId": "09",
						"parentName": "车流量统计"
						
					},{
						"title": "地区车流量报表",
						"description": "",
						"path": "/carTraffic/areaTrafficReport",
						"parentId": "09",
						"parentName": "车流量统计"
						
					},{
						"title": "车流量统计图",
						"description": "",
						"path": "/carTraffic/carFlowChart",
						"parentId": "09",
						"parentName": "车流量统计"
					},{
						"title": "车牌颜色统计图",
						"description": "",
						"path": "/carTraffic/carColorChart",
						"parentId": "09",
						"parentName": "车流量统计"
					},{
						"title": "我的申请列表",
						"description": "",
						"path": "/publicStorage/addApproval",
						"parentId": "10",
						"parentName": "商品管理"
					},{
						"title": "公用库商品列表",
						"description": "",
						"path": "/publicStorage/commodity",
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
						"title": "安全设置",
						"description": "",
						"path": "/basicInfo/securitySettings",
						"parentId": "12",
						"parentName": "基本资料"
					},{
						"title": "基础信息",
						"description": "",
						"path": "/basicInfo/baseMsg",
						"parentId": "12",
						"parentName": "基本资料"
					},{
						"title": "人员结构",
						"description": "",
						"path": "/basicInfo/memberOrg",
						"parentId": "12",
						"parentName": "基本资料"
					},
					// {
					// 	"title": "基础数据",
					// 	"description": "",
					// 	"path": "/dataCollection/baseData",
					// 	"parentId": "13",
					// 	"parentName": "数据采集"
					// },{
					// 	"title": "经营数据",
					// 	"description": "",
					// 	"path": "/dataCollection/manageData",
					// 	"parentId": "13",
					// 	"parentName": "数据采集"
					// },
				]
			}
		},
		components: {

		},
		mounted() {

		},
		computed: {
			navbarID() {
				return this.$store.state.app.navbarID;
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.nav-container {
		width: 180px;
		position: fixed;
		top: 50px;
		bottom: 0;
		left: 0;
		z-index: 10;
		overflow: hidden;
		background: #f7f8fa;
		.nav-tit {
			line-height: 50px;
			height: 50px;
			text-align: center;
			background: #d9dee4;
			font-weight: bold;
			font-size: 16px;
		}
		.nav-subtit li {
			line-height: 45px;
			height: 45px;
			text-align: center;
			cursor: pointer;
			color: #666;
			font-size: 14px;
		}
		.nav-subtit li:hover {
			background: #fff;
		}
		.router-link-active li {
			background: #fff;
		}
		.aaa{
			background: #fff
		}
	}
</style>