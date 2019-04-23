<template>
	<div class="city-select">
		<el-select v-model="selectedProvince" placeholder="省" name="province">
			<el-option v-for="item in provinces" v-if="item.level === 1" :key="item.value" :value="item" :label="item.label" >
			</el-option>
		</el-select>
		<el-select v-model="selectedCity" placeholder="市" name="city" >
			<el-option v-for="item in cities" :value="item" :label="item.label" :key="item.value">
			</el-option>
		</el-select>
		<el-select v-model="selectedBlock" placeholder="区" name="block">
			<el-option v-for="item in blocks" :value="item" :label="item.label" :key="item.value">
			</el-option>
		</el-select>
	</div>
</template>
<script>
	/**
	 *  省 市 区/县城  三联动选择器
	 */
	import provinces from '../global/area-json.js'
	import Vue from 'vue'
	export default {
		created() {

			this.cities = this.provinces[10].children;
			this.selectedCity = this.cities[0];
			this.blocks = this.cities.children;
			this.selectedBlock = this.blocks[0]
		},
		watch: {
			selectedProvince(newVal, oldVal) {
				// 港澳台数据只有一级,特殊处理
				if(newVal.sheng === '71' || newVal.sheng === '81' || newVal.sheng === '82') {
					this.cities = [newVal]
					this.blocks = [newVal]
				} else {
					this.cities = this.provinces.filter(item => {
						if(item.level === 2 && item.sheng && newVal.sheng === item.sheng) {
							return true
						}
					})
				}
				var _this = this
				// 此时在渲染DOM,渲染结束之后再选中第一个
				Vue.nextTick(() => {
					_this.selectedCity = _this.cities[0]
					_this.$emit('input', _this.info)
				})
			},
			selectedBlock() {
				
			},
			selectedCity(newVal) {
				
			}
		},
		computed: {
			info() {
				return {
					areaId : this.selectedBlock.value,
					detailAddress : this.selectedProvince.label+this.selectedCity.label+this.selectedBlock.label,
				}
			}
		},
		data() {
			return {
				selectedProvince: provinces[10],
				selectedCity: 0,
				selectedBlock: 0,
				cities: 0,
				provinces,
				blocks: 0
			}
		}
	}
</script>
<style scoped>

</style>