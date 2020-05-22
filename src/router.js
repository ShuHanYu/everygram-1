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
import DemoGears from '@demo/DemoGears';
import DemoTrips from '@demo/DemoTrips';
import DemoCollections from '@demo/DemoCollections';
import DemoWishes from '@demo/DemoWishes';
import DemoArchives from '@demo/DemoArchives';
import DemoSettings from '@demo/DemoSettings';
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
						name: 'Gears',
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
			path: '/demo/main',
			name: 'DemoMain',
			component: DemoMain,
			children: [
				{
					path: '/demo/main',
					alias: 'demo/gears',
					name: 'DemoGears',
					component: DemoGears,
					meta: {
						title: 'Demo Gears',
					},
				},
				{
					path: '/demo/trips',
					name: 'DemoTrips',
					component: DemoTrips,
					meta: {
						title: 'Demo Trips',
					},
				},
				{
					path: '/demo/collections',
					name: 'DemoCollections',
					component: DemoCollections,
					meta: {
						title: 'Demo Collections',
					},
				},
				{
					path: '/demo/wishes',
					name: 'DemoWishes',
					component: DemoWishes,
					meta: {
						title: 'Demo Wishes',
					},
				},
				{
					path: '/demo/archives',
					name: 'DemoArchives',
					component: DemoArchives,
					meta: {
						title: 'Demo Archives',
					},
				},
				{
					path: '/demo/settings',
					name: 'DemoSettings',
					component: DemoSettings,
					meta: {
						title: 'Demo Settings',
					},
				},
			],
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
