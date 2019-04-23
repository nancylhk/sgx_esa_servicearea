<template>
	<div>
		<div class="header-container">
			<Head-top></Head-top>
		</div>
		<div class="app-wrapper" >
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
	import Sidebar from './Sidebar';

    export default {
      name: 'layout',
      components: {
        HeadTop,
        AppMain,
        Sidebar
      },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   @import "src/style/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        top:50px;
        height: 100%;
        width: 100%;
        background: #f2f2f2;
        .main-container {
        	width:100%;
            min-height: 100%;
			display:inline-block;
			
        }
        .test{
        	
        }
       
        
    }
</style>
