<template>
	<div>
		Main
		<button @click="onClickSignOut">Sign out</button>
	</div>
</template>

<script>
export default {
	methods: {
		async onClickSignOut() {
			try {
				await this.signOut();
				await this.$router.push({
					name: 'Home',
				});
			} catch (e) {
				console.error(e);
			}
		},
		...mapActions('user', [
			'signOut'
		]),
	},
};
</script>
