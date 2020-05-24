<template>
	<MdcTextFieldHelperText v-if="msg" :persistent="true" :validation="true">
		{{ msg }}
	</MdcTextFieldHelperText>
</template>

<script>
import MdcTextFieldHelperText from '@components/MdcTextFieldHelperText';
export default {
	components: {
		MdcTextFieldHelperText,
	},
	props: {
		msg: {
			type: String,
			default: null,
		},
	},
};
</script>
