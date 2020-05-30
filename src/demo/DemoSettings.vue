<template>
	<div class="settings">
		<div class="container-xl">
			<div class="row">
				<div class="col-lg-5">
					<div
						class="avatar settings__profile-avatar"
						style="background-image: url(https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/44521390_2446796028670090_1705224010763075584_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQl9SiIa6nmBF5CuI5qYve3a7aA6f-xUaFxA8cJ0BFR9O1yA2frgoZ0jfn6IqC_OzmQ&_nc_ht=scontent.ftpe7-3.fna&oh=9c92eecac1f5af4dd1a888577d458d20&oe=5EE89297);"
					>
						<i class="material-icons-outlined settings__profile-camera">photo_camera</i>
						<input type="file">
					</div>
					<div class="board">
						<div class="settings__profile-header"></div>
						<div class="board__body">
							<div v-if="mode === 'viewMode'" class="settings__profile-name mb-4">
								<MdcTextField
									type="text"
									label="名稱"
									value="LIN PEI ZHEN"
									disabled
								/>
								<button class="mdc-icon-button material-icons-outlined" @click="mode = 'editName'">edit</button>
							</div>
							<div v-if="mode === 'editName'" class="settings__profile-name settings__profile-name--editing mb-4">
								<MdcTextField
									type="text"
									label="名稱"
									value="LIN PEI ZHEN"
								/>
								<button class="mdc-icon-button material-icons-outlined text-danger" @click="mode = 'viewMode'">close</button>
								<button class="mdc-icon-button material-icons-outlined text-success" @click="mode = 'viewMode'">check</button>
							</div>
							<div class="mb-4">
								<MdcTextField
									type="text"
									label="Email"
									value="everygram@text.com"
									disabled
								>
									<template #trailingIcon>
										<img src="static/images/social-google.svg" alt="">
									</template>
								</MdcTextField>
							</div>
							<div class="text-center">
								<MdcButton class="mdc-button--outlined" @click.native="showDialog">更改密碼</MdcButton>
								<MdcButton class="mdc-button--outlined">登出</MdcButton>
							</div>
							<div class="mdc-dialog" ref="changePasswordDialog">
								<div class="mdc-dialog__container">
									<div class="mdc-dialog__surface"
										role="alertdialog"
										aria-modal="true"
										aria-labelledby="my-dialog-title"
										aria-describedby="my-dialog-content"
									>
										<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
										<h2 class="mdc-dialog__title" id="my-dialog-title"><!--
										-->更改密碼<!--
									--></h2>
										<div class="mdc-dialog__content" id="my-dialog-content">
											<div class="mb-4">
												<MdcTextField
													type="password"
													label="舊密碼"
												/>
											</div>
											<div>
												<MdcTextField
													type="password"
													label="新密碼"
												/>
											</div>
										</div>
										<div class="mdc-dialog__actions">
											<MdcButton class="mdc-dialog__button" data-mdc-dialog-action="close">取消</MdcButton>
											<MdcButton class="mdc-dialog__button" data-mdc-dialog-action="accept">儲存</MdcButton>
										</div>
									</div>
								</div>
								<div class="mdc-dialog__scrim"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-7">
					<div class="board settings__board">
						<ul class="mdc-list">
							<li class="mdc-list-item" tabindex="0">
								<span class="mdc-list-item__text">裝備類別設定</span>
								<span class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">arrow_right</span>
							</li>
						</ul>
					</div>
					<div class="board settings__board">
						<ul class="mdc-list">
							<li class="mdc-list-item" tabindex="0">
								<span class="mdc-list-item__text">
									<span class="text-muted">系統語言 -</span> 中文
								</span>
								<span class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">arrow_drop_down</span>
								<select>
									<option selected>中文</option>
									<option>English</option>
								</select>
							</li>
							<li class="mdc-list-item">
								<span class="mdc-list-item__text">
									<span class="text-muted">預設單位 -</span> 公制
								</span>
								<span class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">arrow_drop_down</span>
								<select>
									<option selected>公制</option>
									<option>英制</option>
								</select>
							</li>
							<li class="mdc-list-item">
								<span class="mdc-list-item__text">
									<span class="text-muted">日期格式 -</span> YYYY/MM/DD
								</span>
								<span class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">arrow_drop_down</span>
								<select>
									<option selected>YYYY/MM/DD</option>
									<option>MM/DD/YYYY</option>
									<option>DD/MM/YYYY</option>
								</select>
							</li>
							<li class="mdc-list-item">
								<span class="mdc-list-item__text">
									<span class="text-muted">預設幣別 -</span> TWD
								</span>
								<span class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">arrow_drop_down</span>
								<select>
									<option selected>TWD</option>
									<option>USD</option>
									<option>JPY</option>
									<option>KRW</option>
								</select>
							</li>
						</ul>
					</div>
					<div class="board settings__board">
						<ul class="mdc-list">
							<li class="mdc-list-item" tabindex="0">
								<span class="mdc-list-item__text">給予意見與回饋</span>
								<span class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">open_in_new</span>
							</li>
							<li class="mdc-list-item">
								<span class="mdc-list-item__text">Buy me a coffee</span>
								<span class="mdc-list-item__meta material-icons material-icons-outlined" aria-hidden="true">free_breakfast</span>
							</li>
						</ul>
					</div>
					<div class="board">
						<div class="board__body">
							PWA
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { MDCDialog } from '@material/dialog';
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';
import MdcButton from '@components/MdcButton';
import MdcTextField from '@components/MdcTextField';

export default {
	components: {
		MdcButton,
		MdcTextField,
	},
	data() {
		return {
			mode: 'viewMode',
			menu: null,
			mdcDialog: null,
		};
	},
	mounted() {
		document.querySelectorAll('.mdc-list').forEach((listEl) => {
			const list = new MDCList(listEl);
			const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
		});

		document.querySelectorAll('.mdc-icon-button').forEach((iconBtn) => {
			const iconButtonRipple = new MDCRipple(iconBtn);
			iconButtonRipple.unbounded = true;
		});	

		document.querySelectorAll('.mdc-button').forEach((btn) => {
			const btnRipple = new MDCRipple(btn);
		});

		this.mdcDialog = new MDCDialog(this.$refs.changePasswordDialog);
	},
	methods: {
		showDialog() {
			this.mdcDialog.open();
		},
	},
};
</script>
