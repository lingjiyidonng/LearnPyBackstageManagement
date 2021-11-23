import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	setToken (state,token) {
		state.token =token;
		localStorage.setItem("token",token);     //存储token
	  },
	delToken (state) {
		state.token = '';
		localStorage.removeItem("token");    //删除token
	  }
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			// console.log(err.message)
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
