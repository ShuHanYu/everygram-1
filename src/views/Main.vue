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
				await this.$router.push('/home');
			} catch (e) {
				console.error(e);
			}
		},
		...mapActions([
			'signOut'
		]),
	},
};
</script>
