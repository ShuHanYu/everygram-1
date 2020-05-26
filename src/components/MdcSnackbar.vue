<template>
	<div class="mdc-snackbar" :class="[typeClass]">
		<div class="mdc-snackbar__surface">
			<div
				class="mdc-snackbar__label"
				role="status"
				aria-live="polite"
			>
				{{ message }}
			</div>
			<div class="mdc-snackbar__actions">
				<button type="button" class="mdc-button mdc-snackbar__action">
					<div class="mdc-button__ripple"></div>
					<span class="mdc-button__label">
						{{ buttonText }}
					</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { MDCSnackbar } from '@material/snackbar';
export default {
	props: {
		message: {
			type: String,
			required: true,
		},
		buttonText: {
			type: String,
			default: 'OK',
		},
		type: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			mdcSnackbar: null,
		};
	},
	computed: {
		typeClass() {
			return _.includes(['stacked', 'leading'], this.type) ? `mdc-snackbar--${ this.type }` : null;
		},
	},
	mounted() {
		this.mdcSnackbar = new MDCSnackbar(this.$el);
		this.mdcSnackbar.open();
		this.$el.addEventListener('MDCSnackbar:closed', () => {
			this.$emit('MDCSnackbar:closed');
		});
	},
	destroyed() {
		this.mdcSnackbar.destroy();
	},
};
</script>
