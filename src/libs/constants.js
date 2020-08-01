const CONSTANTS = {
	PASSWORD_RULES: 'required|alpha_num|min:6',
	DEFAULT_MEMBER_PHOTO_URL: '/static/images/placeholder-user.jpg',
};

export const constant = (key) => {
	return CONSTANTS[key];
};
