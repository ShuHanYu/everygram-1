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
				<div class="mdc-dialog__actions">
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
			mdcDialogConfirm: null,
		};
	},
	mounted() {
		this.mdcDialogConfirm = new MDCDialog(this.$el);
		this.bindEvents();
	},
	destroyed() {
		this.mdcDialogConfirm.destroy();
	},
	methods: {
		bindEvents() {
			// Making dialogs accessible
			this.mdcDialogConfirm.listen('MDCDialog:opening', () => {
			});
			this.mdcDialogConfirm.listen('MDCDialog:opened', () => {
				this.$refs.content.setAttribute('aria-hidden', 'true');
			});
			this.mdcDialogConfirm.listen('MDCDialog:closing', () => {
				this.$refs.content.removeAttribute('aria-hidden');
			});
			this.mdcDialogConfirm.listen('MDCDialog:closed', () => {
			});
		},
		open() {
			this.mdcDialogConfirm.open();
		},
		close(action) {
			this.mdcDialogConfirm.close(action);
		},
	},
};
</script>
