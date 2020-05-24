<template>
	<div class="mdc-text-field-helper-line">
		<div
			ref="helperText"
			:class="{
				'mdc-text-field-helper-text--persistent': persistent,
				'mdc-text-field-helper-text--validation-msg': validation,
			}"
			class="mdc-text-field-helper-text"
			aria-hidden="true"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
export default {
	props: {
		persistent: {
			type: Boolean,
			default: false,
		},
		validation: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			mdcTextFieldHelperText: null,
		};
	},
	mounted() {
		this.mdcTextFieldHelperText = new MDCTextFieldHelperText(this.$refs.helperText);
	},
	destroyed() {
		this.mdcTextFieldHelperText.destroy();
	},
};
</script>
