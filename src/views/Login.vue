<template>
	<div>
		<h1>Login</h1>
		<button @click="onClickSignInWithGoogle">Google Sign In</button>
		<hr>
		<div>
			<div>
				<label>
					Email
					<input type="email" v-model="signInEmail">
				</label>
			</div>
			<div>
				<label>
					Password
					<input type="password" v-model="signInPassword">
				</label>
			</div>
			<button @click="onClickSignIn">Sign In</button>
		</div>
		<hr>
		<div>
			<div>
				<label>
					Email
					<input type="email" v-model="signUpEmail">
				</label>
			</div>
			<div>
				<label>
					Password
					<input type="password" v-model="signUpPassword">
				</label>
			</div>
			<button @click="onClickSignUp">Sign Up</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			signUpEmail: '',
			signUpPassword: '',
			signInEmail: '',
			signInPassword: '',
		};
	},
	methods: {
		async onClickSignUp() {
			try {
				await this.signUpWithEmail({
					email: this.signUpEmail,
					password: this.signUpPassword,
				});
				this.onSignedIn();
			} catch (e) {
				console.error(e);
			}
		},
		async onClickSignIn() {
			try {
				await this.signInWithEmail({
					email: this.signInEmail,
					password: this.signInPassword,
				});
				this.onSignedIn();
			} catch (e) {
				console.error(e);
			}
		},
		async onClickSignInWithGoogle() {
			try {
				await this.signInWithGoogle();
				this.onSignedIn();
			} catch (e) {
				console.error(e);
			}
		},
		onSignedIn() {
			this.$router.push({
				name: 'Main',
			});
		},
		...mapActions('user', [
			'signInWithGoogle',
			'signUpWithEmail',
			'signInWithEmail',
		]),
	},
};
</script>
