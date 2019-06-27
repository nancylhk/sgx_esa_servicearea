<template>
	<div class="nav-container">
		<h5 class="nav-tit">{{navTit[navbarID]}}</h5>
		<!--:navTit="_navTit"-->
		<ul class="nav-subtit">
			<router-link v-for="tit in navSubTitData" v-if="tit.parentId == navbarID" :to="{path:tit.path,query: {barId:tit.parentId}}" :key="tit.path">
				<li :class="tit.active?'aaa':''" @click="signBg(tit.path)">{{tit.title}}</li>
			</router-link>
		</ul>
	</div>
</template>
<script>
import navItem from '../../global/navItem';
	export default {
		name: 'Navbar',
		data() {
			return {
				nowPath:this.$route.path,
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
				navSubTitData: navItem.navItem
			}
		},
		components: {

		},
		watch:{
			$route(to,from){
						
			}
		},
		watch: {
			$route: {
				handler: function(val, oldVal){
					let filterPath1 = [
						'/operateMgmt/selfIncomeFill',
						'/operateMgmt/businessIncomeFill',
						'/operateMgmt/rentIncomeFill',
						'/operateMgmt/energySalesFill',
						'/operateMgmt/holidaySalesFill',
						'/operateMgmt/selfIncomeView',
						'/operateMgmt/businessIncomeView',
						'/operateMgmt/rentIncomeView',
						'/operateMgmt/energySalesView',
						'/operateMgmt/holidaySalesView',
					];
					filterPath1.forEach( e=>{
						if(e == val.path) {
							let elem = {};
							let index = 0;
							this.navSubTitData.forEach((e,i)=>{
								if(e.path == '/operateMgmt/incomeFill') {
									e.active = true
									elem = e;
									index = i
								}else{
									e.active = false
									elem = e;
									index = i
								}
							})
							this.$set(this.navSubTitData,index,elem)
						}
					})				 
					let filterPath2 = [
						'/operateMgmt/costFill',
						'/operateMgmt/flowFill',
						'/operateMgmt/businessFill',
						'/operateMgmt/costView',
						'/operateMgmt/flowView',
						'/operateMgmt/businessView',
					]
					filterPath2.forEach( e=>{
						if(e == val.path) {
							let elem = {};
							let index = 0;
							this.navSubTitData.forEach((e,i)=>{
								if(e.path == '/operateMgmt/mixFill') {
									e.active = true
									elem = e;
									index = i
								}else{
									e.active = false
									elem = e;
									index = i
								}
							})
							this.$set(this.navSubTitData,index,elem)
						}
					})
				},
				// 深度观察监听
				deep: true
			}
		},
		created() {
			
		},
		computed: {
			navbarID() {
				return this.$store.state.app.navbarID;
			}
		},
		methods:{
			signBg(path) {	
				this.navSubTitData.forEach((e,i)=>{
					let elem = {};
					if(path == e.path) {
						e.active = true;
						elem = e;
					}else{
						e.active = false;
						elem = e;
					}
					this.$set(this.navSubTitData,i,elem)
				})
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