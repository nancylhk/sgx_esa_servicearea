import Vue from 'vue';
import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import Cookies from 'js-cookie';
export default {
	// 测试环境
	// baseUrl:"http://192.168.2.195:9006/",

	// 开发环境
	//baseUrl: "//http://192.168.2.195:9006/",

	/**
	 * 统一接口处理：get请求方法封装。this.$http.get(url, [options])
	 * @param url { String } -必选 接口url
	 * @param options { Object } -必选 含官方的所有options对象。传参为{params:{key:11}}
	 * @param sucCb { Function } -必选 成功回调
	 * @param errorCb { Function } -可选 失败回调
	 * @param isLoading { Boolean } -可选 是否显示加载状态
	 * @param isLogin { Boolean } -可选 是否登陆信息
	 */
	get: function(url, options = {}, sucCb, errorCb, isLoading = true, isLogin) {
		if(!url) {
			return false;
		}
		//遮罩层
		if(isLoading) {
			var loadingInstance = Loading.service({
				text: "加载中,请稍后..."
			});
		}
		axios.get(url, options).then((response) => {
			// 响应成功回调
			if(response.data.errorCode) {
				Message({
					showClose: true,
					message: response.data.errorDescription,
					type: 'error'
				});
				if(response.data.errorCode == "00000000012") {
					location.href = "/user/redirectToLogin";
				}
			} else {
				sucCb(response);
			}
			if(isLoading) {
				loadingInstance.close();
			}
		}, (response) => {
			errorCb(response);
			//              Message({
			//                  showClose: true,
			//                  message: response.data.errorDescription,
			//                  type: 'error'
			//              });
			if(isLoading) {
				setTimeout(() => {
					loadingInstance.close();
				}, 2000);
			}
		})
	},

	/**
	 * 统一接口处理：post请求方法封装。this.$http.get(url, [options])
	 * @param url { String } -必选 接口url
	 * @param body { Object } -必选 含官方的所有body对象，可为null。传参时不需要参数名，例如body为{key:11}
	 * @param options { Object } -必选 含官方的所有options对象，可为null。传参为{params:{key:11}}
	 * @param sucCb { Function } -必选 成功回调
	 * @param errorCb { Function } -可选 失败回调
	 * @param isLoading { Boolean } -可选 是否显示加载状态
	 * @param isLogin { Boolean } -可选 是否登陆信息（
	 */
	post: function(url, body, options, sucCb, errorCb, isLoading = true, isLogin) {
		if(!url) {
			// console.log('接口url不能为空！');
			return false;
		}

		//遮罩层
		if(isLoading) {
			var loadingInstance = Loading.service();
		}
		axios.post(url, body, options).then((response) => {
			// 响应成功回调
			if(response.data.errorCode) {
				Message({
					showClose: true,
					message: response.data.errorDescription,
					type: 'error'
				});
				if(response.data.errorCode == "00000000012") {
					location.href = "/user/redirectToLogin";
				}
			} else {
				sucCb(response);
			}
			if(isLoading) {
				loadingInstance.close();
			}

		}, (response) => {
			// 响应错误回调
			//console.log('失败回调')
			errorCb(response);
			if(isLoading) {
				loadingInstance.close();
			}
		})
	},

};