import { errorMessageLang, getDefaultLanguage, updateCurrentLanguage } from '@libs/lang';
import settingsConfig from '@/settingsConfig';

const state = {
	member: null,
	memberRef: null,
};

const getters = {
	memberSettings(state) {
		const defaultSettings = _.assign(_.cloneDeep(settingsConfig.default), {
			language: getDefaultLanguage(),
		});
		if(!state.member) {
			return defaultSettings;
		}
		const memberSettings = _.assign({}, defaultSettings, _.pick(state.member, _.keys(defaultSettings)));
		updateCurrentLanguage(memberSettings.language);
		return memberSettings;
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
	async updateMember(context, updateObj) {
		try {
			await context.state.memberRef.update(updateObj);
			await context.dispatch('getMember');
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
