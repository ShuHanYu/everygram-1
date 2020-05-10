import userStore from '@store/user';
const state = {
	db: null,
};
const getters = {

};
const mutations = {
	setDB(state, db) {
		if (location.hostname === "localhost") {
			console.log('db host = localhost:3670');
			db.settings({
				host: "localhost:3670",
				ssl: false
			});
		}
		state.db = db;
	},
};
const actions = {
	init({ commit }) {
		commit('setDB', firebase.firestore());
		console.log('store initialized');
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
