const CONSTANTS = {
	PASSWORD_RULES: 'required|alpha_num|min:6',
};

export const constant = (key) => {
	return CONSTANTS[key];
};
