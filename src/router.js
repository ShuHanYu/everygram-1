import Vue from 'vue';
import VueRouter from 'vue-router';
// pages
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
// Demo pages
import DemoHome from '@demo/DemoHome';
import DemoLogin from '@demo/DemoLogin';
import DemoMain from '@demo/DemoMain';
import DemoComponents from '@demo/DemoComponents';

Vue.use(VueRouter);

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
						title: 'Gears',
					},
				},
				{
					path: '/trips',
					name: 'Trips',
					component: Trips,
					meta: {
						title: 'Trips',
					},
				},
				{
					path: '/collections',
					name: 'Collections',
					component: Collections,
					meta: {
						title: 'Collections',
					},
				},
				{
					path: '/wishes',
					name: 'Wishes',
					component: Wishes,
					meta: {
						title: 'Wishes',
					},
				},
				{
					path: '/archives',
					name: 'Archives',
					component: Archives,
					meta: {
						title: 'Archives',
					},
				},
				{
					path: '/settings',
					name: 'Settings',
					component: Settings,
					meta: {
						title: 'Settings',
					},
				},
			],
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			meta: {
				title: 'Home',
			},
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: 'Login',
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
				title: 'Demo Home',
			},
		},
		{
			path: '/demo/login' ,
			name: 'DemoLogin',
			component: DemoLogin,
			meta: {
				title: 'Demo Login',
			},
		},
		{
			path: '/demo/main' ,
			name: 'DemoMain',
			component: DemoMain,
			meta: {
				title: 'Demo Main',
			},
		},
		{
			path: '/demo/components' ,
			name: 'DemoComponents',
			component: DemoComponents,
			meta: {
				title: 'Demo Components',
			},
		},
		{
			path: '*' ,
			name: 'NotFound',
			component: NotFound,
		},
	],
	// mode: 'history',
});

router.afterEach((to) => {
	Vue.nextTick(() => {
		document.title = to.meta.title ? `${ to.meta.title } - everygram` : 'everygram';
	});
});

export default router;
