<template>
	<div class="not-found">
		<h1>Everygram!</h1>
		<div>Every gram counts!</div>
		<img :src="notFoundImg" alt="campfire" class="not-found__img">
		<h2>coming soon</h2>
		<MdcButton @click.native="viewOnGithub">
			<i class="lab la-github"></i>
			View on GitHub
		</MdcButton>
	</div>
</template>

<script>
import notFoundImg from '@assets/img/undraw_campfire_s6y4.svg';
import MdcButton from '@components/MdcButton'
export default {
	components: {
		MdcButton,
	},
	data() {
		return {
			notFoundImg,
		};
	},
	methods: {
		viewOnGithub() {
			window.location = 'https://github.com/LeeBoYin/everygram';
		},
	},
};
</script>
