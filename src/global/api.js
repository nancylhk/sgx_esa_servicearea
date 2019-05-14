const BASE_URL = 'http://192.168.2.66:60'; //9009   /serviceArea  http://192.168.2.195:9006   http://192.168.2.66:60
export default {
		
	//登录
	"accountLogin": BASE_URL + '/login/uplogin',  
	"phoneLogin": BASE_URL + '/user/phonelogin',
	"getVerifyImgCode": BASE_URL + '/user/getCheckNumber',
	"getVerifyCellPhoneCode": BASE_URL + '/user/getCellPhoneCheckNumber',
	
	//服务区首页
	'getTodayBusinessNumber': BASE_URL + '/income/getBusinessNumber',
	'getCurrentPersonNumber': BASE_URL + '/restarea/getCurrentPersonNumber',
	'getCurrentCarNumber': BASE_URL + '/restarea/getCurrentCarNumber',
	'getMarketNumber': BASE_URL + '/restarea//shop/getMarketNumber',
	'getRestaurantNumber': BASE_URL + '/restarea/shop/getRestaurantNumber',
	'getCommodityRange': BASE_URL + '/commodity/getShopTypeIncome',
	'getYearTarget': BASE_URL + '/income/getYearTarget',
/*	'getYearIncome': BASE_URL + '/income/getYearIncome',
	'getYearProfit': BASE_URL + '/income/getProfit',*/
	'getBestSells': BASE_URL + '/commodity/getBestSells',
	'getTopSaleNumCommodityInfo': BASE_URL + '/income/getTopSaleNumCommodityInfo',
	'getTopSaleMoneyCommodityInfo': BASE_URL + '/income/getTopSaleMoneyCommodityInfo',
	'getIncomeTrend': BASE_URL + '/income/getIncomeTrend',
	'getTodoNumber': BASE_URL + '/activiti/productionActivity/personalTaskCount',

	//待办
	'getHistoryWorkList': BASE_URL + '/activiti/productionActivity/findHistoryWork',
	'getHistoryWorkListCount': BASE_URL + '/activiti/productionActivity/findHistoryWorkCount',
	'getHistoryWorkCommentById': BASE_URL + '/activiti/productionActivity/findHisCommentById',
	
	
	//消息中心
	'getMessageList': BASE_URL + '/message/getMessageList',
	'getCurrentUser': BASE_URL + '/user/getCurrentUser',
	
	//基本资料
    'getUserAccountInfo' : BASE_URL + '/user/userAccountInfo',
    'changePassword' : BASE_URL +'/user/changePassword',
    'checkNumberBefore' : BASE_URL +'/user/checkNumberBefore',
    'getCheckNumberBefore' : BASE_URL +'/user/getCheckNumberBefore',
    'getPhoneCheckNumber' : BASE_URL +'/user/getPhoneCheckNumber',
    'changePhoneNumber' : BASE_URL +'/user/changePhoneNumber',

	//基础设施-商超
	"getMarketList": BASE_URL + '/restarea/shop/getDefaultShopList',
	"addMarketInfo": BASE_URL + '/restarea/shop/addShop',
	"getMarketInfo": BASE_URL + '/restarea/shop/getShop',
	"updateMarketInfo": BASE_URL + '/restarea/shop/updateShop',
	"deleteMarketInfo": BASE_URL + '/restarea/shop/deleteShop',
	"getMarketListCount": BASE_URL + '/restarea/shop/getShopCount',
	"getMarketForUpdate": BASE_URL + '/restarea/shop/getShopForUpdate',
	"getMarketNameIsNoExist": BASE_URL + '/restarea/shop/isNoExist',
	"getShopType": BASE_URL + '/system/dimension/getShopType',
	"getAllShop": BASE_URL + '/restarea/shop/getAllShop',
	"getShopBusinessRange": BASE_URL + '/system/dimension/getShopBusinessRange',
	
	
	

	//基础设施-汽修
	"getCarRepaireList": BASE_URL + '/restarea/autoMobile/getAutoMobileList',
	"getCarRepaireListCount": BASE_URL + '/restarea/autoMobile/getAutoMobileListCount',
	"addCarRepaireInfo": BASE_URL + '/restarea/autoMobile/addAutoMobile',
	"getCarRepaireInfo": BASE_URL + '/restarea/autoMobile/getAutoMobile',
	"updateCarRepaireInfo": BASE_URL + '/restarea/autoMobile/updateAutoMobile',
	"deleteCarRepaireInfo": BASE_URL + '/restarea/autoMobile/deleteAutoMobile',
	"getAutoMobileForUpdate": BASE_URL + '/restarea/autoMobile/getAutoMobileForUpdate',

	//基础设施-餐厅
	"getRestaurantList": BASE_URL + '/restarea/restaurant/getDefaultRestaurantList',
	"addRestaurantInfo": BASE_URL + '/restarea/restaurant/addRestaurant',
	"getRestaurantInfo": BASE_URL + '/restarea/restaurant/getRestaurant',
	"updateRestaurantInfo": BASE_URL + '/restarea/restaurant/updateRestaurant',
	"deleteRestaurantInfo": BASE_URL + '/restarea/restaurant/deleteRestaurant',
	"getRestaurantCount": BASE_URL + '/restarea/restaurant/getRestaurantCount',
	"getRestaurantForUpdate": BASE_URL + '/restarea/restaurant/getRestaurantForUpdate',

	//基础设施-加油站
	"getGasList": BASE_URL + '/restarea/oilsSation/getOilsStationList',
	"addGasInfo": BASE_URL + '/restarea/oilsSation/addOilsStations',
	"getGasInfo": BASE_URL + '/restarea/oilsSation/getOilsStation',
	"updateGasInfo": BASE_URL + '/restarea/oilsSation/updateOilsStation',
	"deleteGasInfo": BASE_URL + '/restarea/oilsSation/deleteOilsStation',
	"getGasListCount": BASE_URL + '/restarea/oilsSation/getOilsStationCount',
	"getOilsStationForUpdate": BASE_URL + '/restarea/oilsSation/getOilsStationForUpdate',

	//基础设施-停车场
	"getCarParkList": BASE_URL + '/restarea/parkingLot/getParkingLotList',
	"addCarParkInfo": BASE_URL + '/restarea/parkingLot/addParkingLot',
	"getCarParkInfo": BASE_URL + '/restarea/parkingLot/getParkingLot',
	"updateCarParkInfo": BASE_URL + '/restarea/parkingLot/updateParkingLot',
	"deleteCarParkInfo": BASE_URL + '/restarea/parkingLot/deleteParkingLot',
	"getParkingLotListCount": BASE_URL + '/restarea/parkingLot/getParkingLotListCount',
	"getCarParkInfoForUpdate": BASE_URL + '/restarea/parkingLot/getParkingLotForUpdate',

	//基础设施-卫生间
	//"getToiletList" : BASE_URL + '/toilet/getDefaultToiletList',
	"addToiletInfo": BASE_URL + '/restarea/toilet/addToilet',
	"getToiletInfo": BASE_URL + '/restarea/toilet/getToilet',
	"updateToiletInfo": BASE_URL + '/restarea/toilet/updateToilet',
	"deleteToiletInfo": BASE_URL + '/restarea/toilet/deleteToilet',
	"getToiletList": BASE_URL + '/restarea/toilet/getToiletList',
	"getToiletListCount": BASE_URL + '/restarea/toilet/getToiletListCount',
	"getToiletInfoForUpdate": BASE_URL + '/restarea/toilet/getToiletForUpdate',

	//公用库商品管理  
	"getPublicStorageProductList": BASE_URL + '/commodity/queryPublicStorage', 
	"getPublicStorageProductListCount": BASE_URL + '/commodity/queryPublicStorageCount', 
	"addPublicStorageProduct": BASE_URL + '/commodity/addPublicStorageProduct',
	"deletePublicStorageProduct": BASE_URL + '/commodity/deletePublicStorageProduct',
	"collarPublicStorageProduct": BASE_URL + '/commodity/collarPublicStorageProduct',
	"getAllPublicStorage": BASE_URL + '/restarea/getAllPublicStorageList',
	"getShopTypelist": BASE_URL + '/commodity/getShopType', 
	"getPublicStorageInfoForUpdate": BASE_URL + '/commodity/getPublicStorageInfoForUpdate',
	"startCommonStorageProcess": BASE_URL + '/activiti/productionActivity/startCommonStorageProcess',
	"getPersonalTaskList": BASE_URL + '/activiti/productionActivity/personalTaskList',
	"completeRequest": BASE_URL + '/activiti/productionActivity/completeRequest',
	"getPublicStorageInfo": BASE_URL + '/commodity/getPublicStorageInfo',
	"modifyPublicStorageProduct": BASE_URL + '/commodity/modifyPublicStorage',
	"findWorkProcesstById": BASE_URL + '/activiti/productionActivity/findWorkListById',
	"getMyPublicStorageList": BASE_URL + '/commodity/queryMyPublicStorage', 
	"getMyPublicStorageListCount": BASE_URL + '/commodity/queryMyPublicStorageCount',
	
	
	//商品信息管理  
	"getCommodityList": BASE_URL + '/commodity/commodity/getDefaultCommodityList', 
	"addCommodityInfo": BASE_URL + '/commodity/commodity/addCommodity',
	"getCommodityInfo": BASE_URL + '/commodity/commodity/getCommodity',
	"updateCommodityInfo": BASE_URL + '/commodity/commodity/updateCommodity',
	"deleteCommodityInfo": BASE_URL + '/commodity/commodity/deleteCommodity',
	"upDateCommodityPrice": BASE_URL + '/commodity/shcommodityop/updatePrice',
	"getAllMarket": BASE_URL + '/commodity/commodity/getAllMarket',   
	"getCommodtiyCount": BASE_URL + '/commodity/commodity/getCommodityCount', 
	"getCommodityInfoForUpdate": BASE_URL + '/commodity/commodity/getCommodityForUpdate',
	"getCommodityIsNoExiste": BASE_URL + '/commodity/commodity/isNoExist',

	//营运管理-收入管理  
	"getIncoemList": BASE_URL + '/income/getIncoemList',
	"getIncomeListCount": BASE_URL + '/income/queryIncomeCount',
	"addIncome": BASE_URL + '/income/addIncome',
	"getIncomeInfo": BASE_URL + '/income/getIncomeInfo',
	"disableIncomeInfo": BASE_URL + '/income/disableIncome',

	//营运管理-支出管理  
	"getOutcomeInfoList": BASE_URL + '/outcome/getDefaultOutComeList',
	"addOutcomeInfo": BASE_URL + '/outcome/addoutcome',
	"getOutcomeInfo": BASE_URL + '/outcome/getDetailOutComeInfo',
	"disableOutcomeInfo": BASE_URL + '/outcome/disable',
	"getDefaultOutComeNum": BASE_URL + '/outcome/getDefaultOutComeNum',
	
	//营运管理-目标
	"getMissionList": BASE_URL + '/income/getMissionList',
	"queryMissionCount": BASE_URL + '/income/queryMissionCount',
	"disableMission": BASE_URL + '/income/disableMission',
	"updateMission": BASE_URL + '/income/updateMission',
	"getMissionInfo": BASE_URL + '/income/getMissionInfo',

	//人力资源-岗位
	"getJobList": BASE_URL + '/post/post/queryPost',
	"getJobListCount": BASE_URL + '/post/post/queryPost',
	"getJobInfo": BASE_URL + '/post/post/queryPostById',
	"getJobListCount": BASE_URL + '/post/post/queryPostNum',

	//人力资源-人员
	"getEmployeeList": BASE_URL + '/employee/employee/queryEmployee',
	"addEmployeeInfo": BASE_URL + '/employee/employee/addEmployee',
	"getEmployeeInfo": BASE_URL + '/employee/employee/queryEmployeeById',
	"updateEmployeeInfo": BASE_URL + '/employee/employee/modifyEmployee',
	"updateDeadline": BASE_URL + '/employee/employee/updateDeadline',
	"updateStatus": BASE_URL + '/employee/employee/updateStatus',
	"deleteEmployeeInfo": BASE_URL + '/employee/employee/deleteEmployeeById',
	"getEmployeeListCount": BASE_URL + '/employee/employee/queryEmployeeNum',
	"queryAllPost": BASE_URL + '/post/post/queryAllPost',

	//菜品信息管理  
	"getDishList": BASE_URL + '/dish/dish/getDefaultDishList',
	"addDishInfo": BASE_URL + '/dish/dish/addDish',
	"getDishInfo": BASE_URL + '/dish/dish/getDish',
	"updateDishInfo": BASE_URL + '/dish/dish/updateDish',
	"deleteDishInfo": BASE_URL + '/dish/dish/deleteDish',
	"upDateDishPrice": BASE_URL + '/dish/dish/updatePrice',
	"getRestaurants": BASE_URL + '/dish/dish/getAllRestaurant',
	"getDishCount": BASE_URL + '/dish/dish/getDishCount',
	"getDishForUpdate": BASE_URL + '/dish/dish/getDishForUpdate',

	//POS管理  
	"getDetailtPosdevList": BASE_URL + '/posdev/getDefaultPosdevList',
	"getDetailtPosdevInfo": BASE_URL + '/posdev/getDetailtPosdevInfo',
	"addPosdev": BASE_URL + '/posdev/addPosdev',
	"updatePosdev": BASE_URL + '/posdev/updatePosdev',
	"deletePosdev": BASE_URL + '/posdev/deletePosdev',
	"getDefaultPosDevListNum": BASE_URL + '/posdev/getDefaultPosDevListNum',
	"getShopName": BASE_URL + '/posdev/getShopName',
	
	//pos商品设定
	"getPosShopList": BASE_URL + '/posdev/getPosShopList',
	"getPosShopListCount": BASE_URL + '/posdev/getPosShopListCount',
	"getPosProductList": BASE_URL + '/posdev/getPosProductList',
	"getAllProductList": BASE_URL + '/posdev/getAllPosProductList',
	"getAllProductListCount": BASE_URL + '/posdev/getAllPosProductListCount',
	"addPosProductList": BASE_URL + '/posdev/addPosProductList',
	
	//销售查询
	"getSaleReportTotalInfo": BASE_URL + '/report/getSaleReportTotalInfo',
	"getSaleReport": BASE_URL + '/report/getSaleReport',
	"exportSaleReport": BASE_URL + '/report/exportSaleReport',
	"getShopList": BASE_URL + '/restarea/getShopInfo',
	
	//销售明细查询
	"getSaleDetailReportTotalInfo": BASE_URL + '/report/getSaleDetailReportTotalInfo',
	"getSaleDetailReport": BASE_URL + '/report/getSaleDetailReport',
	"exportSaleDetailReport": BASE_URL + '/report/exportSaleDetailReport',
	
	//营业额
	"getTurnoverReportTotalInfo": BASE_URL + '/report/getTurnoverReportTotalInfo',
	"getTurnoverReport": BASE_URL + '/report/getTurnoverReport',
	"exportTurnoverReport": BASE_URL + '/report/exportTurnoverReport',
	
	//人员销售
	"getStaffSaleRepTotalInfo": BASE_URL + '/report/getStaffSaleRepTotalInfo',
	"getStaffSaleReport": BASE_URL + '/report/getStaffSaleReport',  
	"exportStaffSale": BASE_URL + '/report/exportStaffSale',
	
	//车流量统计
	"getMonthlyTrafficCount": BASE_URL + '/vehicle/getMonthlyTrafficCount',
	"getMonthlyTrafficColor": BASE_URL + '/vehicle/getMonthlyTrafficColor',
	"getAreaTraffic": BASE_URL + '/vehicle/vehicleFlowrate/flow',
	//"exportAreaTrafficReport": BASE_URL + "/vehicle_gzy/vehicleFlowrate/Export?restAreaId = "+self.restAreaId+"&date="+self.month,
	"exportAreaTrafficReport": BASE_URL + "/vehicle/vehicleFlowrate/Export",
	"getSouthColorLine": BASE_URL + '/vehicle/vehicleFlowrate/colorLineSouth',
	"getNorthColorLine": BASE_URL + '/vehicle/vehicleFlowrate/colorLineNorth',
	"getCarFlowLine": BASE_URL + '/vehicle/vehicleFlowrate/flowLine',
	

	//系统参数
	"getBusinessType": BASE_URL + '/system/dimension/getBusinessType',
	"getDistribution": BASE_URL + '/system/dimension/getDistribution',
	"getPricingType": BASE_URL + '/system/dimension/getPricingType',
	"getResturantBusinessRange": BASE_URL + '/system/dimension/getRestaurantBusinessRange',
	"getMarketBusinessRange": BASE_URL + '/system/dimension/getMarketBusinessRange',
	"getPaymentType": BASE_URL + '/system/dimension/getPaymentType',
	"gePayOutType": BASE_URL + '/system/dimension/gePayOutType',
	"getCommodityLevel": BASE_URL + '/system/dimension/getCommodityLevel',
	"getGuaranteePeriod": BASE_URL + '/system/dimension/getGuaranteePeriod',
	"getSpecification": BASE_URL + '/system/dimension/getSpecification',
	"getCommodityType": BASE_URL + '/system/dimension/getCommodityType',
	"getOils": BASE_URL + '/system/dimension/getOils',
	"getAutomaticBusinessRange": BASE_URL + '/system/dimension/getAutomaticBusinessRange',  
	"getPriceUnit": BASE_URL + '/system/dimension/getPriceUnit',  
	"getToiletType": BASE_URL + '/system/dimension/getToiletType',  

	
	// 基本资料--基础信息
	"getRestAreaInfo": BASE_URL + '/restarea/restArea/getRestAreaInfo1',//查看服务区基础信息
	"getInfrastructure1": BASE_URL + "/restarea/restarea/getInfrastructure1",//基本设施
	"getRestaAreaBusiness": BASE_URL + "/restarea/getRestaAreaBusiness",//经营模式
	// 基本资料--人员结构
	"getManagePost": BASE_URL + '/post/post/getManagePost',//查看管理岗位信息
	"getProducePost":BASE_URL +'/post/post/getProducePost',//生产岗位
	"getRenterUnitPost":BASE_URL +'/post/post/getRenterUnitPost',//承租单位岗位信息
	
	//基础设施-其他设施
	"getOtherInfrastructure": BASE_URL + '/basedev/basedev/getOtherInfrastructure',
	"updateOtherInfrastructure": BASE_URL +'/basedev/basedev/updateOtherInfrastructure',
	"deleteOtherInfrastructure": BASE_URL +"/basedev/basedev/deleteOtherInfrastructure",
	"addOtherInfrastructure": BASE_URL + "/basedev/basedev/addOtherInfrastructure",
	'getOtherInfrastructureInfo':BASE_URL +'/basedev/basedev/getOtherInfrastructureInfo',
	// 项目跟踪
	"getMajorProjectInfoList":BASE_URL +"/datacollection/project/getMajorProjectInfoList",
	"getProjectTypeList":BASE_URL +'/datacollection/project/getProjectTypeList',
	"addMajorProjectInfo":BASE_URL +'/datacollection/project/addMajorProjectInfo',//
	"getMajorProjectInfo":BASE_URL +'/datacollection/project/getMajorProjectInfo',//
	"updateMajorProjectInfo":BASE_URL +'/datacollection/project/updateMajorProjectInfo',//

	"taskSubmit":BASE_URL +'/datacollection/nonIncome/taskSubmit',//上报
	"deleteMajorProject":BASE_URL +'/datacollection/project/deleteMajorProject',//删除
	
	// 收入填报---自营收入
	
	"getIncomeTask":BASE_URL +'/datacollection/income/getIncomeTask',//
	"getSelfSupportSaleInfo": BASE_URL + "/datacollection/income/getSelfSupportSaleInfo",
	"addSelfSupportSaleInfo":BASE_URL +'/datacollection/income/addSelfSupportSaleInfo',//
	"getSelfSupportInfoSalePreview":BASE_URL +'/datacollection/income/getSelfSupportInfoSalePreview',//
	"delSelfSupportSaleInfo":BASE_URL +'/datacollection/income/delSelfSupportSaleInfo',//
	
	//收入填报 ---商户收入
	// "getMerchantSaleInfo":BASE_URL +'/datacollection/income/getMerchantSaleInfo',//
	"addMerchantSaleInfo":BASE_URL +'/datacollection/income/addMerchantSaleInfo',//
	// "getMerchantSaleInfoPreview":BASE_URL +'/datacollection/income/getMerchantSaleInfoPreview',//
	//收入填报 ---租金收入
	// "getRentInfo":BASE_URL +'/datacollection/income/getRentInfo',//
	"addRentInfo":BASE_URL +'/datacollection/income/addRentInfo',//
	// "getRentInfoPreview":BASE_URL +'/datacollection/income/getRentInfoPreview',//
	// 收入填报 --- 能源收入
	"getEnergySaleInfo":BASE_URL +'/datacollection/income/getEnergySaleInfo',//
	"addEnergySaleInfo":BASE_URL +'/datacollection/income/addEnergySaleInfo',//
	"getEnergySaleInfoPreview":BASE_URL +'/datacollection/income/getEnergySaleInfoPreview',//
	"delEnergySaleInfo":BASE_URL +'/datacollection/income/delEnergySaleInfo',//
	"getEnergyType":BASE_URL +'/system/dimension/getEnergyType',
	// 收入填报 --- 节假日销售统计数据填报
	"getFestivalSaleInfo":BASE_URL +'/datacollection/income/getFestivalSaleInfo',//
	"addFestivalSaleInfo":BASE_URL +'/datacollection/income/addFestivalSaleInfo',//
	"getFestivalSaleInfoPreview":BASE_URL +'/datacollection/income/getFestivalSaleInfoPreview',//
	"delFestivalSaleInfo":BASE_URL +'/datacollection/income/delFestivalSaleInfo',//

	// 成本填报 -- 主要成本
	"getNonIncomeTask":BASE_URL +'/datacollection/nonIncome/getNonIncomeTask',//
	"getPaymentInfo":BASE_URL +'/datacollection/nonIncome/getPaymentInfo',//
	"addPaymentInfo":BASE_URL +'/datacollection/nonIncome/addPaymentInfo',//
	"getPaymentInfoPreview":BASE_URL +'/datacollection/nonIncome/getPaymentInfoPreview',//
	"deletePaymentInfoByPaymentId":BASE_URL +'/datacollection/nonIncome/deletePaymentInfoByPaymentId',//

	//成本填报 --断面流量
	"getSectionVehicleFlowInfo":BASE_URL +'/datacollection/nonIncome/getSectionVehicleFlowInfo',//
	"addSectionVehicleFlowInfo":BASE_URL +'/datacollection/nonIncome/addSectionVehicleFlowInfo',//
	"deleteSectionFlowBySectionFlowId":BASE_URL +'/datacollection/nonIncome/deleteSectionFlowBySectionFlowId',//
	"getSectionVehicleFlowInfoPreview":BASE_URL +'/datacollection/nonIncome/getSectionVehicleFlowInfoPreview',//
	
	//商户履约
	"getCooperationInfo":BASE_URL +'/datacollection/nonIncome/getCooperationInfo',//
	"addCooperationInfo":BASE_URL +'/datacollection/nonIncome/addCooperationInfo',//
	"getCooperationInfoPreview":BASE_URL +'/datacollection/nonIncome/getCooperationInfoPreview',//
	"deleteCooperationByCooperationId":BASE_URL +'/datacollection/nonIncome/deleteCooperationByCooperationId',
	// 消息
	"getUnreadMessageNum":BASE_URL +'/message/message/getUnreadMessageNum',//
	"getUnreadMessageList":BASE_URL +'/message/message/getUnreadMessageList',//
	"updateAllUnreadMessage":BASE_URL +'/message/message/updateAllUnreadMessage',//
	"getUnreadMessage":BASE_URL +'/message/message/getUnreadMessage',//
	"updateUnreadMessage":BASE_URL +'/message/message/updateUnreadMessage',//
	"deleteMessage":BASE_URL +'/message/message/deleteMessage',//
	"":BASE_URL +'/',//
	
	// 维表接口
	"shopType":BASE_URL +'/system/dimension/shopType',//店铺类型
	"getfundsSourceType":BASE_URL +'/system/dimension/getFundsSourceType',//资金来源
	"getProjectType":BASE_URL +'/system/dimension/getProjectType',//
	"getShops":BASE_URL +'/system/dimension/getShops',//
	"getFestivals":BASE_URL +'/system/dimension/getFestivals',//
	
	// 首页右下角
	"getFilledTaskList":BASE_URL +"/datacollection/nonIncome/getFilledTaskList",
}