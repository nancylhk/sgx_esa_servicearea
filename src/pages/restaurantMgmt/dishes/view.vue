<template>
	<div class="app-form mt20 ml40">
		<section >
			<p class="basic-info"><label>菜品名称：</label><span>{{dishInfo.dishName}}</span></p>
			<p class="basic-info"><label>条形码：</label><span>{{dishInfo.barCode}}</span></p>
			<p class="basic-info"><label>出售类型：</label><span>{{dishInfo.dishType}}</span></p>
			<p class="basic-info"><label>零售价：</label><span>{{dishInfo.price}}元 / {{dishInfo.priceUnit}}</span></p>
			<p class="basic-info"><label>等级：</label><span>{{dishInfo.dishLevel}}</span></p>
			<p class="basic-info"><label>规格：</label><span>{{dishInfo.specification}}</span></p>
			<p class="basic-info"><label>保质期：</label><span>{{dishInfo.guaranteePeriodNum + dishInfo.guaranteePeriod}}</span></p>
			<p class="basic-info"><label>销售餐厅：</label><span v-for="(item,index) in dishInfo.restaurants">{{item}}<i v-show="index < dishInfo.restaurants.length-1">、</i></span></p>
			<p class="basic-info"><label>备注：</label><span>{{dishInfo.commont}}</span></p>
		</section>
	</div>
</template>
<script>
	export default {
		name: 'sectionView',
		data() {
			return {
				dishInfo:'',
			}
		},
		mounted(){
			var self = this;

			self.getInfo();
		},
//		computed: {
//		    restaurantNames() {
//		        return this.dishInfo.restaurants.map(i => i.restaurantName).join('、');
//		    }
//		},
		methods: {
			getInfo(){
				var self = this;
				this.$http.get(this.api.getDishInfo,{
					params: {
						accessToken: self.$store.state.user.token,
						dishID:this.$store.state.app.viewId,
					}
				},function(response){
					if(response.status == 200) {
						self.dishInfo = response.data;
						//self.specificationName = self.dishInfo.specificationID.specificationName;
						//self.periodName = self.dishInfo.periodID.periodName;
					}
				},function(response){
	                //失败回调
	            })
			},
		},
	}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-form .basic-info label {
    width: 115px;
  }
</style>