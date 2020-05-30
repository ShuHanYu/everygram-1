<template>
	<div>
		Settings
		<div>hi</div>
		<img v-for="image in images" :key="image" :src="image" class="w-100">
		<input type="file" @change="onFileSelected" multiple>
	</div>
</template>

<script>
export default {
	data() {
		return {
			images: [],
		};
	},
	methods: {
		async onFileSelected(e) {
			try {
				const promises = _.map(e.target.files, file => {
					return this.uploadFile({
						path: 'foo/bar',
						file,
						onStateChange({ progress, state }) {
							console.log('progress', progress);
							console.log('state', state);
						},
					});
				});
				await Promise.all(promises).then(values => {
					this.images = values;
				});
			} catch (e) {
				console.log('catch error', e);
			}
			e.target.value = '';
		},
		...mapActions('storage', [
			'uploadFile',
		]),
	},
};
</script>
