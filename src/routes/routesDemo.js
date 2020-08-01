import DemoHome from '@demo/DemoHome';
import DemoLogin from '@demo/DemoLogin';
import DemoMain from '@demo/DemoMain';
import DemoGears from '@demo/DemoGears';
import DemoTrips from '@demo/DemoTrips';
import DemoCollections from '@demo/DemoCollections';
import DemoWishes from '@demo/DemoWishes';
import DemoArchives from '@demo/DemoArchives';
import DemoSettings from '@demo/DemoSettings';
import DemoSettingsCategories from '@demo/DemoSettingsCategories';
import DemoComponents from '@demo/DemoComponents';

export default [
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
				alias: '/demo/gears',
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
		path: '/demo/settings/categories',
		name: 'DemoSettingsCategories',
		component: DemoSettingsCategories,
		meta: {
			title: 'Demo Settings Categories',
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
];
