<template>
	<div class="mdc-dialog">
		<div class="mdc-dialog__container">
			<div
				class="mdc-dialog__surface"
				role="alertdialog"
				aria-modal="true"
			>
				<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
				<h2 v-if="title" class="mdc-dialog__title" id="my-dialog-title">{{ title }}</h2>
				<div ref="content" class="mdc-dialog__content">
					<slot></slot>
				</div>
				<div v-if="$slots.actions" class="mdc-dialog__actions">
					<slot name="actions"></slot>
				</div>
			</div>
		</div>
		<div class="mdc-dialog__scrim"></div>
	</div>
</template>

<script>
import { MDCDialog } from '@material/dialog';
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			mdcDialog: null,
		};
	},
	mounted() {
		this.mdcDialog = new MDCDialog(this.$el);
		this.bindEvents();
	},
	destroyed() {
		this.mdcDialog.destroy();
	},
	methods: {
		bindEvents() {
			// Making dialogs accessible
			this.mdcDialog.listen('MDCDialog:opening', () => {
				this.$emit('opening');
			});
			this.mdcDialog.listen('MDCDialog:opened', () => {
				this.$refs.content.setAttribute('aria-hidden', 'true');
				this.$emit('opened');
			});
			this.mdcDialog.listen('MDCDialog:closing', () => {
				this.$refs.content.removeAttribute('aria-hidden');
				this.$emit('closing');
			});
			this.mdcDialog.listen('MDCDialog:closed', () => {
				this.$emit('closed');
			});
		},
		open() {
			this.mdcDialog.open();
		},
		close(action) {
			this.mdcDialog.close(action);
		},
	},
};
</script>
