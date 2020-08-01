<template>
	<component
		:is="el"
		:to="to"
		class="mdc-icon-button material-icons-outlined"
	>
		<slot></slot>
	</component>
</template>

<script>
import { MDCRipple } from '@material/ripple/index';

export default {
	props: {
		el: {
			type: String,
			default: 'button',
		},
		to: {
			// router link to
			default: null,
		},
	},
	data() {
		return {
			mdcIconButton: null,
		};
	},
	mounted() {
		this.mdcIconButton = new MDCRipple(this.$el);
		this.mdcIconButton.unbounded = true;
	},
	destroyed() {
		this.mdcIconButton.destroy();
	},
};
</script>
