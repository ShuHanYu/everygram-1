<template>
	<component :is="el" class="mdc-button mdc-button--touch">
		<div class="mdc-button__ripple"></div>
			<slot name="icon"></slot>
		<span class="mdc-button__label">
			<slot></slot>
		</span>
		<div class="mdc-button__touch"></div>
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
	},
	mounted() {
		const ripple = new MDCRipple(this.$el);
	},
};
</script>
