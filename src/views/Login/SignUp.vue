<template>
	<div class="login__form">
		<h2>註冊會員</h2>
		<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
			<div class="mb-4">
				<ValidationProvider name="Name" rules="required" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="name"
						type="text"
						label="Name"
						:required="true"
						:invalid="failed"
					/>
					<TextFieldErrorMessage :msg="errors[0]" />
				</ValidationProvider>
			</div>
			<div class="mb-4">
				<ValidationProvider name="Email" rules="required|email" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="email"
						type="email"
						label="Email"
						:required="true"
						:invalid="failed"
					/>
					<TextFieldErrorMessage :msg="errors[0]" />
				</ValidationProvider>
			</div>
			<div class="mb-4">
				<ValidationProvider name="Password" rules="required|min:6" v-slot="{ failed, errors }">
					<MdcTextField
						v-model="password"
						type="password"
						label="Password"
						:required="true"
						:invalid="failed"
					/>
					<TextFieldErrorMessage :msg="errors[0]" />
				</ValidationProvider>
			</div>
			<AlertInline v-if="pristine && errorMessage" class="text-danger mb-3">
				{{ errorMessage }}
			</AlertInline>
			<div class="mb-2">
				<MdcButton
					class="mdc-button--raised w-100"
					:is-loading="isLoading"
					@click.native="onClickSignUp"
				>
					註冊
				</MdcButton>
			</div>
		</ValidationObserver>
		<div>
			<MdcButton el="router-link" :to="{ name: 'SignIn' }" class="mdc-button--text">
				<i slot="icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
				返回登入
			</MdcButton>
		</div>
	</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AlertInline from '@components/AlertInline';
import MdcButton from '@components/MdcButton';
import MdcTextField from '@components/MdcTextField';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';
export default {
	components: {
		AlertInline,
		MdcButton,
		MdcTextField,
		TextFieldErrorMessage,
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			name: '',
			email: '',
			password: '',
			isLoading: false,
			errorMessage: null,
		};
	},
	methods: {
		async onClickSignUp() {
			this.errorMessage = null;
			try {
				const success = await this.$refs.validationObserver.validate();
				if(!success) {
					return;
				}
				this.$refs.validationObserver.reset();
				this.isLoading = true;
				await this.signUpWithEmail({
					email: this.email,
					password: this.password,
					name: this.name,
				});
				await this.$router.push({
					name: 'Gears',
				});
			} catch (errorMessage) {
				this.errorMessage = errorMessage;
				this.isLoading = false;
			}
		},
		...mapActions('user', [
			'signUpWithEmail',
		]),
	},
};
</script>
