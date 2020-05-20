import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home';
import Login from '@views/Login';
import Main from '@views/Main';
import Gears from '@views/main/Gears';
import Trips from '@views/main/Trips';
import Collections from '@views/main/Collections';
import Wishes from '@views/main/Wishes';
import Archives from '@views/main/Archives';
import Settings from '@views/main/Settings';

import NotFound from '@views/NotFound';
import DemoHome from '@demo/DemoHome';
import DemoLogin from '@demo/DemoLogin';
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
			component: Main,
			meta: {
				title: DEFAULT_TITLE,
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
			children: [
				{
					path: '/',
					alias: '/gears',
					name: 'Gears',
					component: Gears,
					meta: {
						title: 'Gears - ' + DEFAULT_TITLE,
					},
				},
				{
					path: '/trips',
					name: 'Trips',
					component: Trips,
					meta: {
						title: 'Trips - ' + DEFAULT_TITLE,
					},
				},
				{
					path: '/collections',
					name: 'Collections',
					component: Collections,
					meta: {
						title: 'Collections - ' + DEFAULT_TITLE,
					},
				},
				{
					path: '/wishes',
					name: 'Wishes',
					component: Wishes,
					meta: {
						title: 'Wishes - ' + DEFAULT_TITLE,
					},
				},
				{
					path: '/archives',
					name: 'Archives',
					component: Archives,
					meta: {
						title: 'Archives - ' + DEFAULT_TITLE,
					},
				},
				{
					path: '/settings',
					name: 'Settings',
					component: Settings,
					meta: {
						title: 'Settings - ' + DEFAULT_TITLE,
					},
				},
			],
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
			path: '/demo/login' ,
			name: 'DemoLogin',
			component: DemoLogin,
			meta: {
				title: 'Demo Login - ' + DEFAULT_TITLE,
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
