import locale from '@/locale.json';

export const lang = (key = '', replacements = []) => {
	let string = locale[key];
	if(_.isNil(string)) {
		return key;
	}
	_.forEach(replacements, replacement => {
		string = _.replace(string, '%s', replacement);
	});
	return string;
};

export const errorMessageLang = (code) => {
	return lang(`error-${ code }`);
};
