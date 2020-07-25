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
			pageList: [
				{
					name: 'Gears',
					icon: 'category',
					text: '裝備清單',
				},
				{
					name: 'Trips',
					icon: 'landscape',
					text: '行程裝備',
				},
				{
					name: 'Collections',
					icon: 'collections_bookmark',
					text: '常用裝備組合',
				},
				{
					name: 'Wishes',
					icon: 'favorite_border',
					text: '願望清單',
				},
				{
					name: 'Archives',
					icon: 'archive',
					text: '已封存',
				},
				{
					name: 'Settings',
					icon: 'settings',
					text: '設定',
				},
			],
		};
	},
	computed: {
		...mapGetters('user', [
			'user',
		]),
	},
};
</script>
