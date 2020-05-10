<template>
	<div>
		<h1>Login</h1>
		<button @click="signInWithGoogle">Google Sign In</button>
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
		onClickSignUp() {
			this.signUpWithEmail({
				email: this.signUpEmail,
				password: this.signUpPassword,
			});
		},
		onClickSignIn() {
			this.signInWithEmail({
				email: this.signInEmail,
				password: this.signInPassword,
			});
		},
		...mapActions([
			'signInWithGoogle',
			'signUpWithEmail',
			'signInWithEmail',
		]),
	},
};
</script>
