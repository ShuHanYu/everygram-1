<template>
	<div class="login__form">
		<RouterLink :to="{ name: 'Home' }" class="login__logo" tabindex="-1">
			<img src="/static/images/logo-vertical.svg" alt="logo">
		</RouterLink>
		<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
			<div class="mb-4">
				<ValidationProvider name="New password" :rules="constant('PASSWORD_RULES')" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="newPassword"
						type="password"
						label="New password"
						:required="true"
						:invalid="failed"
						@keypress.enter="onClickReset"
					/>
					<MdcTextFieldHelperText v-if="!errors[0]">
						{{ lang('hint_password_length') }}
					</MdcTextFieldHelperText>
					<TextFieldErrorMessage :message="errors[0]" />
				</ValidationProvider>
			</div>
			<AlertInline v-if="pristine && errorMessage" class="text-danger mb-3">
				{{ errorMessage }}
			</AlertInline>
			<div class="mb-2">
				<MdcButton
					class="mdc-button--raised w-100"
					:is-loading="isLoading"
					@click.native="onClickReset"
				>
					{{ lang('action_reset_password') }}
				</MdcButton>
			</div>
		</ValidationObserver>
		<div class="text-center">
			<MdcButton el="router-link" :to="{ name: 'Home' }">
				{{ lang('action_back_to_home') }}
			</MdcButton>
		</div>
	</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AlertInline from '@components/AlertInline';
import MdcButton from '@components/MdcButton';
import MdcTextField from '@components/MdcTextField';
import MdcTextFieldHelperText from '@components/MdcTextFieldHelperText';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';

export default {
	components: {
		AlertInline,
		MdcButton,
		MdcTextField,
		MdcTextFieldHelperText,
		TextFieldErrorMessage,
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			newPassword: '',
			isLoading: false,
			errorMessage: null,
		};
	},
	mounted() {
		console.log(this.$route);
	},
	methods: {
		async onClickReset() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if(!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isLoading = true;
				await this.resetPassword({
					code: this.$route.query.code,
					newPassword: this.newPassword,
				});
				this.isLoading = false;
				await this.$router.push({
					name: 'SignIn',
				});
				this.$snackbar({
					message: lang('msg_password_reset'),
				});
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
				this.isLoading = false;
			}
		},
		...mapActions('user', [
			'resetPassword',
		]),
	},
};
</script>

<style scoped>

</style>
