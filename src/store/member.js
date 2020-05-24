import { errorMessageLang } from '@libs/lang';

const state = {
	member: null,
	memberRef: null,
};

const getters = {

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
	async createMember(context, payload) {
		if(context.state.member) {
			throw 'member exist';
		}
		try {
			await context.state.memberRef.set({
				...payload,
				userAgent: window.navigator.userAgent,
			});
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async getMember(context) {
		try {
			const memberSnapshot = await context.state.memberRef.get();
			if(!memberSnapshot.exists) {
				return;
			}
			context.commit('setMember', memberSnapshot.data());
		} catch (e) {
			console.log(e);
			throw errorMessageLang(e.code);
		}
	},
	async init(context) {
		const user = context.rootState.user.user;
		if(!user) {
			throw 'user not defined';
		}

		context.commit('setMemberRef', context.rootState.db.collection('member').doc(user.uid));
		await context.dispatch('getMember');
		if(!context.state.member) {
			await context.dispatch('createMember');
			await context.dispatch('getMember');
		}
	},
	onSignOut(context) {
		context.commit('setMemberRef', null);
		context.commit('setMember', null);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
