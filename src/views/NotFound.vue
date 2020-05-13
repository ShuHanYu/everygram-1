<template>
	<div class="not-found">
		<h1>Everygram</h1>
		<div>Every gram counts!</div>
		<img :src="notFoundImg" alt="campfire">
		<h2>coming soon</h2>
	</div>
</template>

<script>
import notFoundImg from '@assets/img/undraw_campfire_s6y4.svg';
export default {
	data() {
		return {
			notFoundImg,
		};
	},
};
</script>

<style scoped>
	.not-found {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f7f7f7;
	}
	img {
		width: 100%;
		max-width: 300px;
		margin: 30px 0;
	}
	a {
		color: #333;
	}
</style>
