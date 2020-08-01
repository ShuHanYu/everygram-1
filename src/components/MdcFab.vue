<template>
	<button class="mdc-fab">
		<div class="mdc-fab__ripple"></div>
		<span v-if="icon" class="material-icons-outlined mdc-fab__icon">{{ icon }}</span>
		<span v-if="label" class="mdc-fab__label">{{ label }}</span>
	</button>
</template>

<script>
import { MDCRipple } from '@material/ripple';

export default {
	props: {
		icon: {
			type: String,
			default: null,
		},
		label: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			fab: null,
		};
	},
	mounted() {
		this.fab = new MDCRipple(this.$el);
	},
	destroyed() {
		this.fab.destroy();
	},
};
</script>
