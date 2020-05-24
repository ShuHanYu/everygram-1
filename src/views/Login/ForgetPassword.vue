<template>
	<div class="login__form">
		<h2>忘記密碼</h2>
		<ValidationObserver ref="validationObserver" v-slot="{ pristine }">
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
			<AlertInline v-if="pristine && errorMessage" class="text-danger mb-3">
				{{ errorMessage }}
			</AlertInline>
			<div class="mb-2">
				<MdcButton
					class="mdc-button--raised w-100"
				>
					寄送密碼重設信件
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
			email: '',
			isLoading: false,
			errorMessage: null,
		};
	},
};
</script>
