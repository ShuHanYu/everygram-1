import userStore from '@store/user';
const state = {
	db: null,
	isReadyToInstall: false,
	installPrompt: null,
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
	setIsReadyToInstall(state, isReadyToInstall) {
		state.isReadyToInstall = isReadyToInstall;

	},
	setInstallPrompt(state, installPrompt) {
		state.installPrompt = installPrompt;
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
		user: userStore,
	},
};
