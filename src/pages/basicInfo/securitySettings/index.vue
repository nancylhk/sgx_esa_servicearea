<template>
	<div class="app-container">
		<h5 class="app-crumb">
			<em class="app-crumb-line"></em>
			<span  @click="toShow('listComp')" v-bind:class="{cp: arrowIsShow }">安全设置</span>
			<span v-show="arrowIsShow"><em class="next-arrow"></em>{{subTit}}</span>
		</h5>
			<component :is="whichIsShow" v-on:changeComp="toShow"></component>
	</div>
</template>

<script>
	import listComp from './list';
	import modifyPswComp from './modifyPsw';
	import modifyPhoneComp from './modifyPhone';
	export default {
		data() {
			return {
				whichIsShow: 'listComp',
				arrowIsShow: false,
				subTit: '',
				includedComponents:'listComp'
			}
		},
		methods: {
			toShow(value, name) {
				this.whichIsShow = value;
				this.subTit = name;
				if(value == 'listComp' ){
					this.arrowIsShow = false;
					this.includedComponents ='listComp';
				}else{
					if(value == 'viewComp') {
						this.includedComponents = 'listComp';
					} else {
						this.includedComponents = 'no';
					}
					this.arrowIsShow = true;
				}
			}
		},
		components: {
			listComp,
			modifyPswComp,
			modifyPhoneComp
		},
	}
</script>

<style lang="scss">
	.next-arrow {
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(../../../assets/images/next.png) no-repeat;
		vertical-align: middle;
		margin: 0 5px;
	}
</style>