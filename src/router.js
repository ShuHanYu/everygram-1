import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home';
import Login from '@views/Login';
import Main from '@views/Main';
import NotFound from '@views/NotFound';
Vue.use(VueRouter);

const getCurrentUser = () => {
	console.log('router getCurrentUser');
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			unsubscribe();
			console.log('router get user:', user);
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
				title: 'Loading - everygram',
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
				title: 'Home - everygram',
			},
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: 'Login - everygram',
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
			path: '*' ,
			name: 'NotFound',
			component: NotFound,
			meta: {
				title: '404 - BYZ',
			},
		},
	],
	// mode: 'history',
});

const DEFAULT_TITLE = 'everygram';
router.afterEach((to, from) => {
	Vue.nextTick(() => {
		document.title = to.meta.title || DEFAULT_TITLE;
	});
});

export default router;
