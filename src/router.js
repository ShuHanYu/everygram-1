import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/routes/routes';
import routesDemo from '@/routes/routesDemo';

Vue.use(VueRouter);

const router =  new VueRouter({
	routes: _.concat(routesDemo, routes),
	// mode: 'history',
});

// set title
router.afterEach((to) => {
	Vue.nextTick(() => {
		document.title = to.meta.title ? `${ to.meta.title } - everygram` : 'everygram';
	});
});

export default router;
