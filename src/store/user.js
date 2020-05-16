const state = {
	user: null,
};

const getters = {
};

const mutations = {
	setUser(state, user) {
		console.log('setUser', user);
		state.user = user;
	}
};

const actions = {
	init(context) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// User is signed in.
				context.dispatch('onSignIn', user);
			} else {
				// User is signed out.
				context.dispatch('onSignOut');
			}
		});
	},
	signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const token = result.credential.accessToken;
			// The signed-in user info.
			context.dispatch('onSignIn', result.user);
		}).catch(function(error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			const credential = error.credential;
		});
	},
	signUpWithEmail(context, payload) {
		console.log(payload);
		return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((result) => {
			context.dispatch('onSignIn', result.user);
		}).catch((e) => {
			console.log('sign up fail');
			console.log(e);
		});
	},
	signInWithEmail(context, payload) {
		console.log(payload);
		return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then((result) => {
			context.dispatch('onSignIn', result.user);
		}).catch((e) => {
			console.log('sign in fail');
			console.log(e);
		});
	},
	signOut() {
		return firebase.auth().signOut();
	},
	onSignIn(context, user) {
		console.log('user is signed in');
		context.commit('setUser', user);
	},
	onSignOut(context) {
		console.log('user is signed out');
		context.commit('setUser', null);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
