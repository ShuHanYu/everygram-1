<template>
	<MdcButton
		class="mdc-dialog__button"
		:data-mdc-dialog-button-default="isDefault"
		:is-loading="isLoading"
	>
		<slot></slot>
	</MdcButton>
</template>

<script>
import MdcButton from '@components/MdcButton';
export default {
	components: {
		MdcButton,
	},
	props: {
		isDefault: {
			type: Boolean,
			default: false,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
