import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs

Vue.config.productionTip = false;

Vue.use(ElementUI);
// globalData:{
// 	token:' ',
// 	'Bearer '+token
	
// }
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})

 
// 请求拦截器
axios.interceptors.request.use(config => {
	//判断是否存在token，如果存在将每个页面的header都添加token
	console.log('请求拦截器');
	console.log(localStorage.getItem("token"))
	  if(store.state.token){
	
		config.headers.common['Authorization']='Bearer '+ localStorage.getItem("token")   //此处的XX-Token要根据登录接口中请求头的名字来写
	  }
	 
	  return config;
	}, error => {
	// 请求错误
	  return Promise.reject(error);
	});
	 
	//respone拦截器
	axios.interceptors.response.use(
	  response => {
		return response;
	  },
	  
	  error => {  //默认除了2XX之外都为错误
		if(error.response){
		  switch(error.response.status){
			case 401:
			  store.commit('delToken');
			  router.replace({ //跳转到登录页面
				path: '/',
				query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
			  });
		  }
		}
		return Promise.reject(error.response);
	  }
);