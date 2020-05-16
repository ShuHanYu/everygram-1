<template>
	<button class="mdc-button mdc-button--touch">
		<div class="mdc-button__ripple"></div>
		<span class="mdc-button__label">
			<slot></slot>
		</span>
		<div class="mdc-button__touch"></div>
	</button>
</template>

<script>
import { MDCRipple } from '@material/ripple/index';
export default {
	mounted() {
		const ripple = new MDCRipple(this.$el);
	},
};
</script>
