<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span  @click="toShow('sectionList')" v-bind:class="{cp: arrowIsShow }">菜品管理</span>
			<span v-show="arrowIsShow"><em class="next-arrow"></em>{{subTit}}</span>
		</h5>
		<keep-alive :include="includedComponents">
			<component :is="whichIsShow" v-on:changeComp="toShow"></component>
		</keep-alive>
	</div>
</template>

<script>
	import sectionList from './list';
	import sectionAdd from './add';
	import sectionView from './view';
	import sectionUpdate from './update';
	export default {
		data() {
			return {
				whichIsShow: 'sectionList',
				arrowIsShow:false,
				subTit:'',
				includedComponents:'sectionList'
			}
		},
		methods: {
			toShow(value,name){
				this.whichIsShow = value;
				this.subTit = name;
				if(value == 'sectionList' ){
					this.arrowIsShow = false;
					this.includedComponents ='sectionList';
				}else{
					if(value == 'sectionView') {
						this.includedComponents = 'sectionList';
					} else {
						this.includedComponents = 'no';
					}
					this.arrowIsShow = true;
				}
			}
		},
		components: {
			sectionList,
			sectionAdd,
			sectionView,
			sectionUpdate
		},
	}
</script>

<style lang="scss">
	.next-arrow{
		display: inline-block;
		width:16px;
		height: 16px;
		background: url(../../../assets/images/next.png) no-repeat;
		vertical-align: middle;
    	margin:0 5px;
	}
</style>