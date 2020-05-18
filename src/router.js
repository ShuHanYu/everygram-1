import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home';
import Login from '@views/Login';
import Main from '@views/Main';
import NotFound from '@views/NotFound';
import DemoHome from '@demo/DemoHome';
import DemoMain from '@demo/DemoMain';
Vue.use(VueRouter);
const DEFAULT_TITLE = 'everygram';

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			unsubscribe();
			resolve(user);
		}, reject);
	})
};

const router =  new VueRouter({
	routes: [
		{
			path: '/',
			name: 'Main',
			component: Main,
			meta: {
				title: 'Loading - ' + DEFAULT_TITLE,
			},
			beforeEnter: async (to, from, next) => {
				if (await getCurrentUser()) {
					next();
				} else {
					next({
						// name: 'Home',
						name: 'NotFound',
					});
				}
			},
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			meta: {
				title: 'Home - ' + DEFAULT_TITLE,
			},
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: 'Login - ' + DEFAULT_TITLE,
			},
			beforeEnter: async (to, from, next) => {
				if (await getCurrentUser()) {
					next({
						name: 'Main',
						replace: true,
					});
				} else {
					next();
				}
			},
		},
		{
			path: '/demo/home' ,
			name: 'DemoHome',
			component: DemoHome,
			meta: {
				title: 'Demo Home - ' + DEFAULT_TITLE,
			},
		},
		{
			path: '/demo/main' ,
			name: 'DemoMain',
			component: DemoMain,
			meta: {
				title: 'Demo Main - ' + DEFAULT_TITLE,
			},
		},
		{
			path: '*' ,
			name: 'NotFound',
			component: NotFound,
			meta: {
				title: DEFAULT_TITLE,
			},
		},
	],
	// mode: 'history',
});

router.afterEach((to, from) => {
	Vue.nextTick(() => {
		document.title = to.meta.title || DEFAULT_TITLE;
	});
});

export default router;
