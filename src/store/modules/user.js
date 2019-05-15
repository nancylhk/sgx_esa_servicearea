import Cookies from 'js-cookie';
import axios from 'axios';
import { Message } from 'element-ui';
const user = {
	state: {
		uid: Cookies.get('userId'),
		token: Cookies.get('_rest_token'),
		//timeStamp : Cookies.get('restTimeStamp'),
		userInfo: null,
	},
	mutations: {
		SET_UID: (state, uid) => {
			state.uid = uid;
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo;
		},
//		SET_TIMESTAMP: (state, timeStamp) => {
//			state.timeStamp = timeStamp;
//		},
		LOGIN_SUCCESS: () => {
			console.log('login success')
		},
	},

	actions: {
		// 账户登录
		LoginByAccount({commit}, userInfo) {
			var self = this;
			Cookies.set('_rest_token', userInfo, {expires: 1 / 3}); 
			commit('SET_TOKEN', userInfo);
			//let timeStamp = new Date().getTime();
			//commit('SET_TIMESTAMP', timeStamp);
		
		},
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', '')
				Cookies.remove('_rest_token'); 
				resolve()
			})
		},
		// 获取用户信息
//		GetInfo({
//			dispatch,
//			commit,
//			state
//		}) {
//			return new Promise((resolve, reject) => {
//
//				axios.get('http://localhost:8081/static/mock/userInfo.json').then((res) => {
//					if(res.status == 200) {
//						if(res.data.resultCode == 0) {
//							var res = res.data.data;
//							commit('SET_TOKEN', res.token);
//							//设置userInfo
//							commit('SET_USERINFO', res);
//							//获取到信息时同时设置用户菜单权限
//							// store.dispatch('GenerateRoutes', res.permissions); 等同于
//							//dispatch('GenerateRoutes', res.permissions);
//							resolve();
//						} else {
//
//						}
//					}
//				}, function(res) {
//					reject(res);
//				})
//
//			});
//		},
	}
};

export default user;