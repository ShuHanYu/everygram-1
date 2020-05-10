const state = {
	user: null,
};
const getters = {
	isSignedIn(state) {
		return !!state.user;
	},
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
				console.log('user is signed in');
				context.commit('setUser', user);
			} else {
				// User is signed out.
				console.log('user is signed out');
				context.commit('setUser', null);
			}
		});

		// signInWithGoogle redirect result
		firebase.auth().getRedirectResult().then((result) => {
			console.log('getRedirectResult success', result);
			context.commit('setUser', result.user);
		}).catch((error) => {
			console.error('getRedirectResult fail', error);
		});
	},
	signInWithGoogle(context) {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	},
	signUpWithEmail(context, payload) {
		console.log(payload);
		firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((result) => {
			console.log('sign up success');
			context.commit('setUser', result.user);
		}).catch((e) => {
			console.log('sign up fail');
			console.log(e);
		});
	},
	signInWithEmail(context, payload) {
		console.log(payload);
		firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then((result) => {
			console.log('sign in success');
			context.commit('setUser', result.user);
		}).catch((e) => {
			console.log('sign in fail');
			console.log(e);
		});
	},
	signOut() {
		return firebase.auth().signOut();
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
