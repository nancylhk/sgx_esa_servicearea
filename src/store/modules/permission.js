const permission = {
  state: {
    routers:{
    	  "/index/homepage":true,
	      "/malfunction/malfntime":true,
	      "/equipment/equipqualit":true, 
	      "/malfunction/malfnroad":true,
	      "/equipment/equipsum":true
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers;
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', data); 
        resolve();
      })
    }
  }
};

export default permission;
