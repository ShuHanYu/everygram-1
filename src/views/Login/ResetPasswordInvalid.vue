<template>
	<div class="login__form text-center">
		<RouterLink :to="{ name: 'Home' }" class="login__logo" tabindex="-1">
			<img src="static/images/logo-vertical.svg" alt="logo">
		</RouterLink>
		<h2>連結已失效</h2>
		<p>重設密碼連結已失效，請重新寄送</p>
		<div>
			<MdcButton el="router-link" :to="{ name: 'Home' }" class="mdc-button--raised">
				返回首頁
			</MdcButton>
		</div>
	</div>
</template>

<script>
import MdcButton from '@components/MdcButton';
export default {
	components: {
		MdcButton,
	},
}
</script>
