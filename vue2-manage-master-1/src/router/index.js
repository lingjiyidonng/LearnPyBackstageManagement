import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const courseList = r => require.ensure([], () => r(require('@/page/courseList')), 'courseList');
const Level1 = r => require.ensure([], () => r(require('@/page/Level1')), 'Level1');
const RecommendableProjects = r => require.ensure([], () => r(require('@/page/RecommendableProjects')), 'RecommendableProjects');
const CodeReview = r => require.ensure([], () => r(require('@/page/CodeReview')), 'CodeReview');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '/userList',
			component: userList,		
		},{
			path: '/courseList',
			component: courseList,

		},{
			path: '/Level1',
			component: Level1,
		},{
			path: '/RecommendableProjects',
			component: RecommendableProjects,
		},{
			path: '/CodeReview',
			component: CodeReview,
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
