<template>
    <div id="app" class="fillcontain">
    	<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
    </div>
</template>

<script>
	export default {
	  name: 'app'
	}
</script>

<style lang="scss">
  	@import './style/common';
		.coop .el-form-item__error{
        display: none;
		}
		.upLoadBox{
			margin: 20px ;
			text-align: center;
		}
</style>
