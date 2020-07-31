<template>
	<div class="login__form text-center">
		<RouterLink :to="{ name: 'Home' }" class="login__logo" tabindex="-1">
			<img src="/static/images/logo-vertical.svg" alt="logo">
		</RouterLink>
		<h2>{{ lang('title_reset_password_invalid') }}</h2>
		<p>{{ lang('msg_reset_password_link_invalid') }}</p>
		<div>
			<MdcButton el="router-link" :to="{ name: 'Home' }" class="mdc-button--raised">
				{{ lang('action_back_to_home') }}
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
