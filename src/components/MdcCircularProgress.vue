<template>
	<div class="mdc-circular-progress" role="progressbar" aria-label="Example Progress Bar" aria-valuemin="0" aria-valuemax="1">
		<div class="mdc-circular-progress__determinate-container">
			<svg class="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
				<circle class="mdc-circular-progress__determinate-circle" cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="113.097"/>
			</svg>
		</div>
		<div class="mdc-circular-progress__indeterminate-container">
			<div class="mdc-circular-progress__spinner-layer">
				<div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
					<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
						<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549"/>
					</svg>
				</div><div class="mdc-circular-progress__gap-patch">
				<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
					<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549"/>
				</svg>
			</div><div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
				<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
					<circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549"/>
				</svg>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import { MDCCircularProgress } from '@material/circular-progress';
export default {
	props: {
		determinate: {
			type: Boolean,
			default: false,
		},
		progress: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			mdcCircularProgress: null,
		};
	},
	watch: {
		progress() {
			this.mdcCircularProgress.progress = this.progress;
		},
	},
	mounted() {
		this.mdcCircularProgress = new MDCCircularProgress(this.$el);
		this.mdcCircularProgress.determinate = this.determinate;
		this.mdcCircularProgress.progress = this.progress;
	},
	destroyed() {
		this.mdcCircularProgress.destroy();
	},
}
</script>
