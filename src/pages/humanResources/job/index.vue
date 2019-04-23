<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span  @click="toShow('sectionList')" v-bind:class="{cp: arrowIsShow }">岗位</span>
			<span v-show="arrowIsShow"><em class="next-arrow"></em>{{subTit}}</span>
		</h5>
		<keep-alive include="sectionList">
			<component v-bind:is="whichIsShow" v-on:changeComp="toShow"></component>
		</keep-alive>
	</div>
</template>

<script>
	import sectionList from './list';
	import sectionView from './view';
	export default {
		data() {
			return {
				whichIsShow:'sectionList' ,
				arrowIsShow:false,
				subTit:'',
			}
		},
		methods: {
			toShow(value,name){
				this.whichIsShow = value;
				this.subTit = name;
				if(value == 'sectionList' ){
					this.arrowIsShow = false;
				}else{
					this.arrowIsShow = true;
				}
			}
		},
		components: {
			sectionList,
			sectionView,
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