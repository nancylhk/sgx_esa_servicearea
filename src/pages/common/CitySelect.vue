<template>
	<div class="city-select">
		<el-select v-model="selectedProvince" placeholder="省" name="province">
			<el-option v-for="item in areaList" v-if="item.level === 1" :key="item.value" :value="item" :label="item.label">
			</el-option>
		</el-select>
		<el-select v-model="selectedCity" placeholder="市" name="city">
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
	import areaList from '../../global/provinces.js'
	import Vue from 'vue'
	export default {
		data() {
			return {
				selectedProvince: 0,
				selectedCity: 0,
				selectedBlock: 0,
				cities: [],
				provinces: [],
				blocks: [],
				areaList,
				selectedProvinceCode: '',
				selectedCityCode: '',
				selectedBlockCode: ''
			}
		},
		props: {
			_selectCity: String,
		},
		computed: {
			info() {
				return {
					areaId: this.selectedBlock.value,
					areaAddress: this.selectedProvince.label + this.selectedCity.label + this.selectedBlock.label,
				}
			}
		},
		created() {
			let self = this;
			if(self._selectCity != '' && self._selectCity != undefined) {
				self.selectedProvinceCode = self._selectCity.substring(0, 2);
				self.selectedCityCode = self._selectCity.substring(2, 4);
				self.selectedBlockCode = self._selectCity.substring(4, 6);
				self.provinces = areaList.filter(item => {
					if(item.provinceId === self.selectedProvinceCode) {
						return true
					}
				})
				self.selectedProvince = self.provinces[0];

			} else {
				self.provinces = areaList.filter(item => {
					if(item.provinceId === "32") {
						return true
					}
				})
				self.selectedProvince = self.provinces[0];

			}

		},
		watch: {
			selectedProvince(newVal, oldVal) {
				// 港澳台数据只有一级,特殊处理
				if(newVal.provinceId === '71' || newVal.provinceId === '81' || newVal.provinceId === '82') {
					this.cities = [newVal]
					this.blocks = [newVal]
				} else {
					this.cities = this.areaList.filter(item => {
						if(item.level === 2 && item.provinceId && newVal.provinceId === item.provinceId) {
							return true
						}
					})
				}
				var _this = this;
				// 此时在渲染DOM,渲染结束之后再选中第一个
				Vue.nextTick(() => {
					if(_this.selectedCityCode == '' || _this.selectedCityCode == undefined) {
						_this.selectedCity = _this.cities[0]
					} else {
						let temp = _this.cities.filter(item => {
							if(item.cityId === _this.selectedCityCode) {
								return true;
							}
						})
						_this.selectedCity = temp[0];
					}
					_this.$emit('input', _this.info);
					_this.selectedCityCode = '';
				})
			},
			selectedCity(newVal) {
				// 选择了一个市,要选择区了 cityId是城市的代表,provinceId
				if(newVal.provinceId === '71' || newVal.provinceId === '81' || newVal.provinceId === '82') {
					this.blocks = [newVal]
					this.cities = [newVal]
				} else {
					this.blocks = this.areaList.filter(item => {
						if(item.level === 3 && item.provinceId && item.provinceId == newVal.provinceId && item.cityId === newVal.cityId && item.label !== '市辖区') {
							return true
						}
					})
				}
				var _this = this;
				Vue.nextTick(() => {
					if(_this.selectedBlockCode == '' || _this.selectedBlockCode == undefined) {
						_this.selectedBlock = _this.blocks[0]
					} else {
						let temp = _this.blocks.filter(item => {
							if(item.districitId === _this.selectedBlockCode) {
								return true;
							}
						})
						_this.selectedBlock = temp[0];
						_this.selectedBlockCode = '';
					}
					
					
					// 触发与 v-model相关的 input事件
					_this.$emit('input', _this.info)
				})
			},
			selectedBlock() {
				var _this = this
				Vue.nextTick(() => {
					// 触发与 v-model相关的 input事件
					_this.$emit('input', _this.info)
				})
			},
		}
	}
</script>
<style scoped>

</style>