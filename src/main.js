import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store/';
import http from './global/http.js';
import api from './global/api.js'
import App from './App';
import { getQueryObject } from './utils';
Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.api = api;
router.beforeEach((to, from, next) => {
	let accessToken = getQueryObject().accessToken;
	store.dispatch('LoginByAccount', accessToken)
	next();
})
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})