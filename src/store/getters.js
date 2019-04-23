
const getters = {
  viewId: state => state.app.viewId,
	seviceareaVisitHistory: state => state.app.seviceareaVisitHistory,  
	token: state => state.user.token,    //用户令牌
	  
  permission_routers: state => {
      return  state.permission.routers;
  }, 
  addRouters: state => state.permission.addRouters
};
export default getters
