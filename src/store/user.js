import { errorMessageLang } from '@libs/lang';

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
		state.user = user;
	}
};

const actions = {
	async onSignIn(context, user) {
		context.commit('setUser', user);
		await context.dispatch('member/init', null, { root: true });
	},
	async sendPasswordResetEmail(context, email) {
		try {
			await firebase.auth().sendPasswordResetEmail(email);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async signInWithEmail(context, payload) {
		try {
			await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		try {
			await firebase.auth().signInWithPopup(provider);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async signUpWithEmail(context, payload) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
			await context.dispatch('updateProfile', {
				displayName: payload.name,
			});
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async updateProfile(context, payload) {
		if(!context.state.user) {
			throw 'user not exist';
		}
		try {
			await context.state.user.updateProfile(_.pick(payload, ['displayName', 'photoURL']));
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
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
	onSignOut(context) {
		context.commit('setUser', null);
		context.dispatch('member/onSignOut', null, { root: true });
	},
	signOut() {
		return firebase.auth().signOut();
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
