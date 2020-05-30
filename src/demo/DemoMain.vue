<template>
	<MainLayout :user="user" :page-list="pageList" />
</template>

<script>
import MainLayout from '@components/MainLayout';
export default {
	components: {
		MainLayout,
	},
	data() {
		return {
			user: {
				photoURL: 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/44521390_2446796028670090_1705224010763075584_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQl9SiIa6nmBF5CuI5qYve3a7aA6f-xUaFxA8cJ0BFR9O1yA2frgoZ0jfn6IqC_OzmQ&_nc_ht=scontent.ftpe7-3.fna&oh=9c92eecac1f5af4dd1a888577d458d20&oe=5EE89297',
				displayName: 'LIN PEI ZHEN',
			},
			pageList: [
				{
					name: 'DemoGears',
					icon: 'category',
					text: '裝備清單',
				},
				{
					name: 'DemoTrips',
					icon: 'landscape',
					text: '行程裝備',
				},
				{
					name: 'DemoCollections',
					icon: 'collections_bookmark',
					text: '常用裝備組合',
				},
				{
					name: 'DemoWishes',
					icon: 'favorite_border',
					text: '願望清單',
				},
				{
					name: 'DemoArchives',
					icon: 'archive',
					text: '已封存',
				},
				{
					name: 'DemoSettings',
					icon: 'settings',
					text: '設定',
				},
			],
		};
	},
};
</script>
