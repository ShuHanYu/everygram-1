import memberStore from '@store/member';
import storageStore from '@store/storage';
import userStore from '@store/user';

const state = {
	db: null,
	displayMode: null,
	installPrompt: null,
	isReadyToInstall: false,
};
const getters = {

};

const mutations = {
	setDB(state, db) {
		// if (location.hostname === "localhost") {
		// 	console.log('db host = localhost:3670');
		// 	db.settings({
		// 		host: "localhost:3670",
		// 		ssl: false
		// 	});
		// }
		state.db = db;
	},
	setDisplayMode(state, displayMode) {
		state.displayMode = displayMode;
	},
	setInstallPrompt(state, installPrompt) {
		state.installPrompt = installPrompt;
	},
	setIsReadyToInstall(state, isReadyToInstall) {
		state.isReadyToInstall = isReadyToInstall;

	},
};

const actions = {
	init(context) {
		context.commit('setDB', firebase.firestore());
		context.dispatch('user/init');
		console.log('store initialized');
	},
	onInstallReady(context, installPrompt) {
		context.commit('setInstallPrompt', installPrompt);
		context.commit('setIsReadyToInstall', true);
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
	modules: {
		member: memberStore,
		storage: storageStore,
		user: userStore,
	},
};
