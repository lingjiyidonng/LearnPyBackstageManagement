import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const courseList = r => require.ensure([], () => r(require('@/page/courseList')), 'courseList');
const Level1 = r => require.ensure([], () => r(require('@/page/Level1')), 'Level1');
const Level2 = r => require.ensure([], () => r(require('@/page/Level2')), 'Level2');
const Level3 = r => require.ensure([], () => r(require('@/page/Level3')), 'Level3');
const RecommendableProjects = r => require.ensure([], () => r(require('@/page/RecommendableProjects')), 'RecommendableProjects');
const InternetWrom = r => require.ensure([], () => r(require('@/page/InternetWrom')), 'InternetWrom');
const NetworkDevelopment = r => require.ensure([], () => r(require('@/page/NetworkDevelopment')), 'NetworkDevelopment');
const Robot = r => require.ensure([], () => r(require('@/page/Robot')), 'Robot');
const DataScience = r => require.ensure([], () => r(require('@/page/DataScience')), 'DataScience');
const MachineLearning = r => require.ensure([], () => r(require('@/page/MachineLearning')), 'MachineLearning');
const OpenCV = r => require.ensure([], () => r(require('@/page/OpenCV')), 'OpenCV');
const DeepLearning = r => require.ensure([], () => r(require('@/page/DeepLearning')), 'DeepLearning');
const Other = r => require.ensure([], () => r(require('@/page/Other')), 'Other');
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
			path: '/Level2',
			component: Level2,
		},{
			path: '/Level3',
			component: Level3,
		},{
			path: '/RecommendableProjects',
			component: RecommendableProjects,
		},{
			path: '/InternetWrom',
			component: InternetWrom,
		},{
			path: '/NetworkDevelopment',
			component: NetworkDevelopment,
		},{
			path: '/Robot',
			component: Robot,
		},{
			path: '/DataScience',
			component: DataScience,
		},{
			path: '/MachineLearning',
			component: MachineLearning,
		},{
			path: '/OpenCV',
			component: OpenCV,
		},{
			path: '/DeepLearning',
			component: DeepLearning,
		},{
			path: '/Other',
			component: Other,
		},{
			path: '/CodeReview',
			component: CodeReview,
		}]
	}
]

const router = new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

router.beforeEach((to, from, next) => {
	if (to.path === '/') {    //若要跳转的页面是登录界面
	  next();     //直接跳转
	}
	else if (to.path != '/'){   //若要跳转的页面是个人界面
	  let token = localStorage.getItem('token');    //获取本地存储的token值
	  if (token===null||token===''){    //若token为空则验证不成功，跳转到登录页面
		next('/');
	  }
	  else{           //不为空则验证成功
		next();
	  }
	}
	else{
	  next();
	}
  });
  export default  router;
