<template>
	<div>
		Home
		<button v-if="isSignedIn" @click="signOut">Sign out</button>
		<RouterLink v-else :to="{ name: 'Login' }">Start</RouterLink>
		<button v-if="isReadyToInstall && isShowInstallBtn" @click="installPWA">install PWA</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isShowInstallBtn: true,
		};
	},
	computed: {
		...mapState([
			'isReadyToInstall',
			'installPrompt',
		]),
		...mapGetters('user', [
			'isSignedIn',
		]),
	},
	methods: {
		installPWA() {
			// Hide the app provided install promotion
			this.isShowInstallBtn = false;
			// Show the install prompt
			this.installPrompt.prompt();
			// Wait for the user to respond to the prompt
			this.installPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the install prompt');
				} else {
					console.log('User dismissed the install prompt');
				}
			})
		},
		...mapActions('user', [
			'signOut'
		]),
	},
};
</script>
