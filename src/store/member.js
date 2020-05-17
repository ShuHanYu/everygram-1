const state = {
	member: null,
	memberRef: null,
};

const getters = {
	isInitialized(state) {
		return !!state.member;
	},
};

const mutations = {
	setMember(state, member) {
		state.member = member;
	},
	setMemberRef(state, memberRef) {
		state.memberRef = memberRef;
	},
};

const actions = {
	async init(context) {
		if(context.getters.isInitialized) {
			return;
		}
		const user = context.rootState.user.user;
		if(!user) {
			return;
		}

		context.commit('setMemberRef', context.rootState.db.collection('member').doc(user.uid));
		await context.dispatch('getMember');
		if(!context.state.member) {
			await context.dispatch('createMember');
			await context.dispatch('getMember');
		}
	},
	async createMember(context) {
		await context.state.memberRef.set({
			userAgent: window.navigator.userAgent,
		}).then(() => {
			console.log('member created');
		}).catch((error) => {
			console.error("Error creating member: ", error);
			throw error;
		});
	},
	async getMember(context) {
		await context.state.memberRef.get().then((memberSnapshot) => {
			if(!memberSnapshot.exists) {
				console.log('Member not exist');
				return;
			}
			context.commit('setMember', memberSnapshot.data());
		}).catch((error) => {
			console.error('Error getting member:', error);
		});
	},
	updateMember(context) {

	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
