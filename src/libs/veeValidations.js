// configuration
import { configure } from 'vee-validate';
configure({
	mode: 'eager',
	bails: true,
	skipOptional: true,
	useConstraintAttrs: true,
	classes: {},
});

// localization
import { localize } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';
localize('zh_TW', zh_TW);

// rules
import { extend } from 'vee-validate';

import { required } from 'vee-validate/dist/rules';
extend('required', required);

import { email } from 'vee-validate/dist/rules';
extend('email', email);

import { min } from 'vee-validate/dist/rules';
extend('min', min);
