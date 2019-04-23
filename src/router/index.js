import Vue from 'vue'
import Router from 'vue-router'

/* layout */
import Layout from '../pages/common/Layout';
import BasicLayout from '../pages/common/BasicLayout';
Vue.use(Router)

/*const Login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')*/
const Homepage = r => require.ensure([], () => r(require('../pages/homepage/homepage')), 'homepage')
//消息
const Allmsg = r => require.ensure([], () => r(require('../pages/message/allmsg')), 'allmsg')
const Unreadmsg = r => require.ensure([], () => r(require('../pages/message/unreadmsg')), 'unreadmsg')
const Readmsg = r => require.ensure([], () => r(require('../pages/message/readmsg')), 'readmsg')

//我的待办
const HisApproval = r => require.ensure([], () => r(require('../pages/todo/hisApproval/index')), 'todo')


//基础设施
/*const Basic = r => require.ensure([], () => r(require('../pages/infrastructure/basic/index')), 'basic')*/
const BasicMarket = r => require.ensure([], () => r(require('../pages/infrastructure/market/index')), 'market')
const BasicCarRepaire = r => require.ensure([], () => r(require('../pages/infrastructure/carRepaire/index')), 'carRepaire')
const BasicCarPark = r => require.ensure([], () => r(require('../pages/infrastructure/carPark/index')), 'carPark')
const BasicRestaurant = r => require.ensure([], () => r(require('../pages/infrastructure/restaurant/index')), 'restaurant')
const BasicGas = r => require.ensure([], () => r(require('../pages/infrastructure/gas/index')), 'gas')
const BasicToilet = r => require.ensure([], () => r(require('../pages/infrastructure/toilet/index')), 'toilet')
const BasicOther = r => require.ensure([], () => r(require('../pages/infrastructure/other/index')), 'other')
//商超管理
const CommodityInfo = r => require.ensure([], () => r(require('../pages/marketMgmt/commodityInfo/index')), 'commodityInfo')

//营运管理
const OperateIncome = r => require.ensure([], () => r(require('../pages/operateMgmt/income/index')), 'income')
const OperateOutcome = r => require.ensure([], () => r(require('../pages/operateMgmt/outcome/index')), 'outcome')
const OperateTarget = r => require.ensure([], () => r(require('../pages/operateMgmt/target/index')), 'target')
// 收入填报
const OperateIncomeFill = r => require.ensure([], () => r(require('../pages/operateMgmt/incomeFill/list')), 'incomeFill')
//人力资源
const ResourcesJob = r => require.ensure([], () => r(require('../pages/humanResources/job/index')), 'job')
const ResourcesEmployee = r => require.ensure([], () => r(require('../pages/humanResources/employee/index')), 'employee')

//菜品管理
const RestaurantDishes = r => require.ensure([], () => r(require('../pages/restaurantMgmt/dishes/index')), 'dishes')
const RestaurantMaterial = r => require.ensure([], () => r(require('../pages/restaurantMgmt/material/index')), 'material')

//pos机管理
const PosManage = r => require.ensure([], () => r(require('../pages/pos/posManage/index')), 'posManage')
const PosConfig = r => require.ensure([], () => r(require('../pages/pos/posConfig/index')), 'posConfig')

//销售查询
const Sales = r => require.ensure([], () => r(require('../pages/statisticalData/sales')), 'sales') 
const SaleDetails = r => require.ensure([], () => r(require('../pages/statisticalData/saleDetails')), 'saleDetails')
const Turnover = r => require.ensure([], () => r(require('../pages/statisticalData/turnover')), 'turnover')
const EmployeeSales = r => require.ensure([], () => r(require('../pages/statisticalData/employeeSales')), 'employeeSales')

const CarFlowReport = r => require.ensure([], () => r(require('../pages/carTraffic/carFlowReport')), 'carFlowReport')
const CarFlowChart = r => require.ensure([], () => r(require('../pages/carTraffic/carFlowChart')), 'carFlowChart')
const AreaTrafficReport = r => require.ensure([], () => r(require('../pages/carTraffic/areaTrafficReport')), 'areaTrafficReport')
const CarColorChart = r => require.ensure([], () => r(require('../pages/carTraffic/carColorChart')), 'carColorChart')
const CarColorReport = r => require.ensure([], () => r(require('../pages/carTraffic/carColorReport')), 'carColorReport')

//公用库管理
const PublicStorageCommodity = r => require.ensure([], () => r(require('../pages/publicStorage/commodity/index')), 'publicStorageCommodity')

const PublicStorageHisApproval = r => require.ensure([], () => r(require('../pages/publicStorage/hisApproval/index')), 'publicStorageHisApproval')

const SubmitReview = r => require.ensure([], () => r(require('../pages/publicStorage/submitRewiew/index')), 'submitReview')

const PublicStorageAddApproval = r => require.ensure([], () => r(require('../pages/publicStorage/addApproval/index')), 'addApproval')
// 基本信息
const SecuritySettings = r => require.ensure([], () => r(require('../pages/basicInfo/securitySettings/index')), 'securitySettings')
const BaseMsg = r => require.ensure([], () => r(require('../pages/basicInfo/baseMsg/index')), 'baseMsg')
const MemberOrg = r => require.ensure([], () => r(require('../pages/basicInfo/memberOrg/index')), 'memberOrg')

const routes = [
	{
		path: '/',
		redirect: '/homepage', //重定向到默认首页
	},
/*	{
		path: '/login',
		component: Login,
		hidden: true
	},*/
	{
		path: '/',
		component: Layout,
		redirect: 'noredirect',
		name: '',
		noDropdown: true,
		children: [{
			path: 'homepage',
			component: Homepage,
			name: '首页',
			meta:'homePage'
		}, ]
	},
	{
		path: '/message',
		component: BasicLayout,
		children: [{
				path: 'allmsg',
				component: Allmsg,
				name: '全部消息',
				meta:'06'
			},
			{
				path: 'unreadmsg',
				component: Unreadmsg,
				name: '未读消息',
				meta:'06'
			},
			{
				path: 'readmsg',
				component: Readmsg,
				name: '已读消息',
				meta:'06'
			},
		]
	},
/*	{
		path: '/myTodo',
		component: BasicLayout,
		children: [{
				path: 'hisApproval',
				component: HisApproval,
				name: '我的历史审批',
				meta:'11'
			}
		]
	},
*/	{
		path: '/infrastructure',
		component: BasicLayout,
		children: [
/*			{
				path: 'basic',
				component: Basic,
				name: '基本信息',
				meta:'01'
			},*/
			{
				path: 'market',
				component: BasicMarket,
				name: '商超',
				meta:'01'
			},
			{
				path: 'carRepaire',
				component: BasicCarRepaire,
				name: '汽修',
				meta:'01'
			},
			{
				path: 'carPark',
				component: BasicCarPark,
				name: '停车场',
				meta:'01'
			},
			{
				path: 'restaurant',
				component: BasicRestaurant,
				name: '餐厅',
				meta:'01'
			},
			{
				path: 'gas',
				component: BasicGas,
				name: '加油站',
				meta:'01'
			},
			{
				path: 'toilet',
				component: BasicToilet,
				name: '卫生间',
				meta:'01'
			},
			{
				path: 'other',
				component: BasicOther,
				name: '其他设施',
				meta:'01'
			},

		]
	},
	{
		path: '/market',
		component: BasicLayout,
		children: [{
			path: 'commodityInfo',
			component: CommodityInfo,
			name: '商品信息管理',
			meta:'02'
		}]
	},
	{
		path: '/operateMgmt',
		component: BasicLayout,
		children: [{
			path: 'income',
			component: OperateIncome,
			name: '收入管理',
			meta:'03'
		},{
			path: 'outCome',
			component: OperateOutcome,
			name: '支出管理',
			meta:'03'
		},{
			path: 'target',
			component: OperateTarget,
			name: '运营目标',
			meta:'03'
		},{
			path: 'incomeFill',
			component: OperateIncomeFill,
			name: '收入填报',
			meta:'03'
		}
		]
	},{
		path: '/humanResources',
		component: BasicLayout,
		children: [{
			path: 'job',
			component: ResourcesJob,
			name: '岗位',
			meta:'04'
		},{
			path: 'employee',
			component: ResourcesEmployee,
			name: '人员',
			meta:'04'
		}
		]
	},{
		path: '/restaurantMgmt',
		component: BasicLayout,
		children: [{
			path: 'dishes',
			component: RestaurantDishes,
			name: '菜品信息管理',
			meta:'05'
		},{
			path: 'material',
			component: RestaurantMaterial,
			name: '原材料信息管理',
			meta:'05'
		}
		]
	},
	{
		path: '/pos',
		component: BasicLayout,
		children: [{
			path: 'posManage',
			component: PosManage,
			name: 'POS机管理',
			meta:'07'
		}, {
			path: 'posConfig',
			component: PosConfig,
			name: '前台商品位置设定',
			meta:'07'
		}]
	},
	{
		path: '/statisticalData',
		component: BasicLayout,
		children: [{
			path: 'sales',
			component: Sales,
			name: '销售查询',
			meta:'08'
		},{
			path: 'saleDetails',
			component: SaleDetails,
			name: '销售明细查询',
			meta:'08'
		},
		{
			path: 'turnover',
			component: Turnover,
			name: '营业额报表',
			meta:'08'
		},{
			path: 'employeeSales',
			component: EmployeeSales,
			name: '人员销售报表',
			meta:'08'
		},{
			path: 'carFlowReport',
			component: CarFlowReport,
			name: '车流量查询',
			meta:'08'
		},{
			path: 'areaTrafficReport',
			component: AreaTrafficReport,
			name: '地区车流量查询',
			meta:'08'
		}]
	},{
		path: '/carTraffic',
		component: BasicLayout,
		children: [{
			path: 'carFlowReport',
			component: CarFlowReport,
			name: '车流量统计报表',
			meta:'09'
		},{
			path: 'areaTrafficReport',
			component: AreaTrafficReport,
			name: '地区车流量统计报表',
			meta:'09'
		},{
			path: 'carColorReport',
			component: CarColorReport,
			name: '车牌颜色统计报表',
			meta:'09'
		},{
			path: 'carFlowChart',
			component: CarFlowChart,
			name: '车流量统计图',
			meta:'09'
		},{
			path: 'carColorChart',
			component: CarColorChart,
			name: '车牌颜色统计图',
			meta:'09'
		}]
	},{
		path: '/publicStorage',
		component: BasicLayout,
		children: [{
			path: 'commodity',
			component: PublicStorageCommodity,
			name: '公用库商品列表',
			meta:'10'
		}]
	},{
		path: '/publicStorage',
		component: BasicLayout,
		children: [{
			path: 'hisApproval',
			component: PublicStorageHisApproval,
			name: '我的历史审批',
			meta:'10'
		}]
	},{
		path: '/publicStorage',
		component: BasicLayout,
		children: [{
			path: 'submitReview',
			component: SubmitReview,
			name: '我的待审核',
			meta:'10'
		}]
	},{
		path: '/publicStorage',
		component: BasicLayout,
		children: [{
			path: 'addApproval',
			component: PublicStorageAddApproval,
			name: '我的添加列表',
			meta:'10'
		}]
	},
	{
		path: '/basicInfo',
		component: BasicLayout,
		children: [{
			path: 'securitySettings',
			component: SecuritySettings,
			name: '安全设置',
			meta:'12'
		},{
			path: 'baseMsg',
			component: BaseMsg,
			name: '基础信息',
			meta:'12'
		},{
			path: 'memberOrg',
			component: MemberOrg,
			name: '人员结构',
			meta:'12'
		}]
	},
]

export default new Router({
	routes,
	mode: "hash",
	strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
})