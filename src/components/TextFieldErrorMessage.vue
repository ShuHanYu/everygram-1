<template>
	<MdcTextFieldHelperText v-if="message" :persistent="true" :validation="true">
		{{ message }}
	</MdcTextFieldHelperText>
</template>

<script>
import MdcTextFieldHelperText from '@components/MdcTextFieldHelperText';
export default {
	components: {
		MdcTextFieldHelperText,
	},
	props: {
		message: {
			type: String,
			default: null,
		},
	},
};
</script>
