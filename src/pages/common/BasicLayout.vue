<template>
	<div>
		<div class="header-container">
			<Head-top></Head-top>
		</div>
		<div class="app-wrapper">
			<div class="nav-wrapper">
				<Navbar></Navbar>
			</div>
			<div class="main-container">
				<App-main/>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import HeadTop from './HeadTop';
	import AppMain from './AppMain';
	import Navbar from './Navbar';
	export default {
		name: 'layoutSec',
		data() {
			return {
				
			}
		},
		components: {
			HeadTop,
			AppMain,
			Navbar
		},
		
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/style/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: absolute;
	    height: 90%;
	    width: 100%;
	    top: 0;
	    bottom: 0;
		.sidebar-wrapper {
			width: 180px;
			position: fixed;
			top: 50px;
			bottom: 0;
			left: 0;
			z-index: 10;
			overflow: hidden;
		}
		.sidebar-container {
			position: absolute;
			top: 0px;
			bottom: 0;
			left: 0;
			right: 0px;
			overflow-y: hidden;
			min-height: 100%;
			color: #fff;
		}
		.main-container {
			position: relative;
			top: 50px;
			min-height: 100%;
			margin-left: 180px;
		}
	}
</style>