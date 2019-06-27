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
						<!-- <el-tab-pane label="餐厅管理">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '05'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane> -->
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
						<!-- <el-tab-pane label="报表数据采集">
							<ul class="product-list">
								<router-link v-for="(nav,index) in navItem" :to="{path:nav.path,query: {barId:nav.parentId}}" :key="nav.path" v-if="nav.parentId == '13'">
									<li class="mt15" @click="changeParentId(nav.parentId)">
										<h5>{{nav.title}}</h5>
										<p>{{nav.description}}</p>
									</li>
								</router-link>
							</ul>
						</el-tab-pane> -->
					</el-tabs>
				</div>
			</div>
		</div>
		<div class="header-info">
			<input class="header-search" />
			<span class="ml40"><em class="user-logo"></em>欢迎您,陈雪颖</span>
			<span class="ml20 cp" @click="logout">注销</span>
		</div>
	</div>

</template>

<script>
import Cookies from 'js-cookie';
import navItem from '../../global/navItem';
	export default {
		data() {
			return {
				topBarIsShow: false,
				tabPosition: 'left',
				navItem:navItem.navItem	
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
			},
			logout() {
				this.$store.dispatch('LogOut');
				Cookies.remove('_rest_token'); 
				window.location.href = 'http://139.198.190.189:10028/start/index.html#/'
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