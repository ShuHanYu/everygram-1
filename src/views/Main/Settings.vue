<template>
	<div>
		Settings
		<div>hi</div>
		<img src="https://firebasestorage.googleapis.com/v0/b/everygram.appspot.com/o/foo%2Fbar%2F05.jpg?alt=media&token=bdb7732b-1a17-466d-a66b-7062015683bf" alt="" class="w-50">
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
