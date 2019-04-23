import Cookies from 'js-cookie';
const app = {
	state: {
		seviceareaVisitHistory: Cookies.get('_rest_visit_history') ? JSON.parse(Cookies.get('_rest_visit_history')) : [],
		viewId: '',
		navbarID: Cookies.get('_rest_bar_ID') || '',
		commonVariable: {},
		moduleID: Cookies.get('_rest_module_ID') || 'sectionList',
	},
	mutations: {
		ADD_VISITED_HISTORY: (state, history) => {
			let index;
			for(var i = 0; i < state.seviceareaVisitHistory.length; i++) {
				if(JSON.stringify(history) == JSON.stringify(state.seviceareaVisitHistory[i])) {
					index = i
					break;
				} else {
					index = false;
				}
			}
			if(index) {
				state.seviceareaVisitHistory.splice(index, 1);
				state.seviceareaVisitHistory.unshift(history);
			} else if(state.seviceareaVisitHistory.length < 8) {
				state.seviceareaVisitHistory.unshift(history);
			} else {
				state.seviceareaVisitHistory.pop();
				state.seviceareaVisitHistory.unshift(history);
			}
			Cookies.set('_rest_visit_history', JSON.stringify(state.seviceareaVisitHistory));
		},
		SET_VIEW_ID: (state, viewId) => {
			state.viewId = viewId;
		},
		SET_NAVBAR_ID: (state, navbarID) => {
			state.navbarID = navbarID;
			Cookies.set('_rest_bar_ID', navbarID);
		},
		SET_MODULE_ID: (state, moduleID) => {
			state.moduleID = moduleID;
			Cookies.set('_rest_module_ID', moduleID);
		},
		SET_COMMON_VARIABLE: (state, commomVariable) => {
			Object.assign(state.commonVariable, commomVariable);
		},
	},
	actions: {
		setViewId: ({
			commit
		}, ID) => {
			commit('SET_VIEW_ID', ID)
		},
		setNavbarId: ({
			commit
		}, ID) => {
			commit('SET_NAVBAR_ID', ID)
		},
		setModuleId: ({
			commit
		}, ID) => {
			commit('SET_MODULE_ID', ID)
		},
		addVisitedHistory: ({
			commit
		}, history) => {
			commit('ADD_VISITED_HISTORY', history)
		},
		setCommonVariable: ({
			commit
		}, commomVariable) => {
			commit('SET_COMMON_VARIABLE', commomVariable)
		}

	}

};

export default app;