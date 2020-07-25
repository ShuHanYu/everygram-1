import { errorMessageLang } from '@libs/lang';
import settingsConfig from '@/settingsConfig';

const state = {
	user: null,
};

const getters = {
	isSignedIn(state) {
		return !!state.user;
	},
	userSettings(state) {
		const settings = _.cloneDeep(settingsConfig.default);
		if(!state.user) {
			return settings;
		}
		return _.assign(settings, _.pick(state.user, _.keys(settings)));
	},
};

const mutations = {
	setUser(state, user) {
		state.user = _.assign({}, user);
	}
};

const actions = {
	async onSignIn(context, user) {
		context.commit('setUser', user);
		await context.dispatch('member/init', null, { root: true });
	},
	async resetPassword(context, payload) {
		try {
			await firebase.auth().confirmPasswordReset(payload.code, payload.newPassword);
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
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
	async updatePassword(context, { currentPassword, newPassword }) {
		const currentUser = firebase.auth().currentUser;
		if(!currentUser) {
			throw 'user not exist';
		}
		try {
			const credential = firebase.auth.EmailAuthProvider.credential(
				currentUser.email,
				currentPassword
			);
			await currentUser.reauthenticateWithCredential(credential);
			await currentUser.updatePassword(newPassword);
		} catch (e) {
			throw errorMessageLang(e.code);
		}
	},
	async updateProfile(context, payload) {
		const currentUser = firebase.auth().currentUser;
		if(!currentUser) {
			throw 'user not exist';
		}
		try {
			await currentUser.updateProfile(_.pick(payload, ['displayName', 'photoURL']));
			context.commit('setUser', currentUser);
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
	async signOut() {
		await firebase.auth().signOut();
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
