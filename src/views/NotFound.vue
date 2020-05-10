<template>
	<div class="not-found">
		<h1>Oops!</h1>
		<img src="/static/undraw_campfire_s6y4.svg" alt="campfire">
		<RouterLink to="/">Back to Home</RouterLink>
	</div>
</template>

<script>
export default {
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
