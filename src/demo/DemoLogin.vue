<template>
	<div class="login">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-6 col-xl-5 d-none d-lg-block">
					<div class="login__title">
						<h1 class="text-white mt-0">Start managing your gears with Everygram</h1>
						<img src="static/images/illustration/login.png" alt="" class="login__illustration">
					</div>
				</div>
				<div class="col-md-8 col-lg-6 col-xl-5 offset-xl-1 mx-auto">
					<!-- Login -->
					<div class="login__form">
						<img src="static/images/logo-vertical.svg" alt="" class="login__logo mb-5">
						<div class="mb-4">
							<label class="mdc-text-field mdc-text-field--filled">
								<span class="mdc-text-field__ripple"></span>
								<input class="mdc-text-field__input" type="email">
								<span class="mdc-floating-label">Email</span>
								<span class="mdc-line-ripple"></span>
							</label>
						</div>
						<div class="mb-4">
							<label class="mdc-text-field mdc-text-field--filled">
								<span class="mdc-text-field__ripple"></span>
								<input class="mdc-text-field__input" type="password">
								<span class="mdc-floating-label">Password</span>
								<span class="mdc-line-ripple"></span>
							</label>
						</div>
						<div class="mb-1">
							<MdcButton class="mdc-button--raised w-100">登入</MdcButton>
						</div>
						<div class="text-center mb-2">
							<MdcButton class="mdc-button--text">註冊會員</MdcButton>
							<span class="text-muted">|</span>
							<MdcButton class="mdc-button--text">忘記密碼</MdcButton>
						</div>
						<div class="mb-3 text-center text-muted">或</div>
						<div>
							<MdcButton class="mdc-button--outlined w-100">
								<img slot="icon"  src="static/images/social-google.svg" alt="" class="mdc-button__icon">
								使用 Google 登入
							</MdcButton>
						</div>
					</div>
					
					<!-- Sign Up -->
					<!-- <div class="login__form">
						<div class="mb-4">
							<label class="mdc-text-field mdc-text-field--filled">
								<span class="mdc-text-field__ripple"></span>
								<input class="mdc-text-field__input" type="text">
								<span class="mdc-floating-label">Name</span>
								<span class="mdc-line-ripple"></span>
							</label>
						</div>
						<div class="mb-4">
							<label class="mdc-text-field mdc-text-field--filled">
								<span class="mdc-text-field__ripple"></span>
								<input class="mdc-text-field__input" type="email">
								<span class="mdc-floating-label">Email</span>
								<span class="mdc-line-ripple"></span>
							</label>
						</div>
						<div class="mb-4">
							<label class="mdc-text-field mdc-text-field--filled">
								<span class="mdc-text-field__ripple"></span>
								<input class="mdc-text-field__input" type="password">
								<span class="mdc-floating-label">Password</span>
								<span class="mdc-line-ripple"></span>
							</label>
						</div>
						<div class="mb-2">
							<MdcButton class="mdc-button--raised w-100">註冊</MdcButton>
						</div>
						<div>
							<MdcButton class="mdc-button--text">
								<i slot="icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
								返回登入
							</MdcButton>
						</div>
					</div> -->

					<!-- Forgot Password -->
					<!-- <div class="login__form">
						<div class="mb-4">
							<label class="mdc-text-field mdc-text-field--filled">
								<span class="mdc-text-field__ripple"></span>
								<input class="mdc-text-field__input" type="email">
								<span class="mdc-floating-label">Email</span>
								<span class="mdc-line-ripple"></span>
							</label>
						</div>
						<div class="mb-2">
							<MdcButton class="mdc-button--raised w-100">寄送密碼重設信件</MdcButton>
						</div>
						<div>
							<MdcButton class="mdc-button--text">
								<i slot="icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
								返回登入
							</MdcButton>
						</div>
					</div> -->

					<!-- 註冊成功 -->
					<!-- <div class="login__form">
						<h3>註冊成功！</h3>
						<p>請先至電子信箱點選驗證連結以完成註冊流程</p>
						<div class="mb-4">
							<span class="align-middle">沒有收到驗證信嗎？ </span>
							<MdcButton class="mdc-button--text">重新發送</MdcButton>
						</div>
						<div>
							<MdcButton class="mdc-button--text">
								<i slot="icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
								返回登入
							</MdcButton>
						</div>
					</div> -->
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
import MdcButton from '@components/MdcButton';
import {MDCTextField} from '@material/textfield';

export default {
	components: {
		MdcButton,
		MDCTextField,
	},
	mounted() {
		const textFields = document.querySelectorAll('.mdc-text-field');
		textFields.forEach(element => {
			const textField = new MDCTextField(element);
		});
	},
};
</script>
