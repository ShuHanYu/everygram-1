import localeEnUs from '@/locale_en-us.json';
import localeZhTw from '@/locale_zh-tw.json';
import store from '@/store';
import settingsConfig from '@/settingsConfig';
import { setValidationLocale } from '@libs/veeValidations';

const locale = {
	'en-us': localeEnUs,
	'zh-tw': localeZhTw,
};

export const lang = (key = '', replacements = []) => {
	const language = _.get(store, ['getters', 'member/memberSettings', 'language']);

	let string = _.get(locale, [language, key]);
	if(_.isNil(string)) {
		return key;
	}
	_.forEach(replacements, replacement => {
		string = _.replace(string, '%s', replacement);
	});
	return string;
};

export const errorMessageLang = (code) => {
	return lang(`error_${ code }`);
};

export const getDefaultLanguage = () => {
	const localLanguageSetting = window.localStorage.getItem('language');
	const navigatorLanguages = _.map(_.get(window, ['navigator', 'languages'], [_.get(window, ['navigator', 'language'])]), lang => lang.toLowerCase());
	const settingsLanguages = _.keys(settingsConfig.language);
	if(_.includes(settingsLanguages, localLanguageSetting)) {
		return localLanguageSetting;
	}
	let defaultLanguage = settingsConfig.default.language;
	for (let i = 0; i < settingsLanguages.length; i++) {
		if(_.indexOf(navigatorLanguages, settingsLanguages[i]) > -1) {
			defaultLanguage = settingsLanguages[i];
			break;
		}
	}
	window.localStorage.setItem('language', defaultLanguage);
	return defaultLanguage;
};

export const updateCurrentLanguage = (language) => {
	window.localStorage.setItem('language', language);
	setValidationLocale(language);
};
