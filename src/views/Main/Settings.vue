<template>
	<div class="settings">
		<div class="container-xl">
			<div class="row">
				<div class="col-lg-5">
					<div
						class="avatar settings__profile-avatar"
						:style="{ 'background-image': `url(${ user.photoURL })` }"
					>
						<i class="material-icons-outlined settings__profile-camera">photo_camera</i>
						<input type="file">
					</div>
					<Board>
						<div slot="header" class="settings__profile-header"></div>
						<template #body>
							<EditableTextField
								label="名稱"
								:value="user.displayName"
								:on-save="onSaveDisplayName"
							/>
							<div class="mb-4">
								<MdcTextField
									type="text"
									label="Email"
									:value="user.email"
									disabled
								>
								</MdcTextField>
							</div>
							<div class="text-center">
								<MdcButton
									v-if="isUserHasPassword"
									class="mdc-button--outlined"
									@click.native="showChangePasswordDialog"
								>更改密碼</MdcButton>
								<MdcButton
									class="mdc-button--outlined"
									:is-loading="isSigningOut"
									@click.native="onClickSignOut"
								>登出</MdcButton>
							</div>
						</template>
					</Board>
				</div>
				<div class="col-lg-7">
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>裝備類別設定</template>
								<template #icon>arrow_right</template>
							</MdcListItem>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItemSelect
								label="系統語言"
								:options="[
									{ value: 'zh-tw', text: '繁體中文' },
									{ value: 'en-us', text: 'English' },
								]"
								v-model="language"
							/>
							<MdcListItemSelect
								label="預設單位"
								:options="[
									{ value: 'metric', text: '公制' },
									{ value: 'imperial', text: '英制' },
								]"
								v-model="unitSystem"
							/>
							<MdcListItemSelect
								label="日期格式"
								:options="[
									{ value: 'YYYY/MM/DD', text: 'YYYY/MM/DD' },
									{ value: 'MM/DD/YYYY', text: 'MM/DD/YYYY' },
									{ value: 'DD/MM/YYYY', text: 'DD/MM/YYYY' },
								]"
								v-model="dateFormat"
							/>
							<MdcListItemSelect
								label="預設幣別"
								:options="[
									{ value: 'TWD', text: 'TWD' },
									{ value: 'USD', text: 'USD' },
									{ value: 'JPY', text: 'JPY' },
									{ value: 'KRW', text: 'KRW' },
								]"
								v-model="currency"
							/>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>給予意見與回饋</template>
								<template #icon>open_in_new</template>
							</MdcListItem>
							<MdcListItem>
								<template #text>Buy me a coffee</template>
								<template #icon>free_breakfast</template>
							</MdcListItem>
						</MdcList>
					</Board>
					<Board>
						<template #body>
							PWA
						</template>
					</Board>
				</div>
			</div>
		</div>
		<MdcDialogConfirm
			ref="changePasswordDialog"
			title="更改密碼"
			:is-accept-on-enter="true"
		>
			<template #default>
				<div class="mb-4">
					<MdcTextField
						v-model="currentPassword"
						type="password"
						label="舊密碼"
						name="current-password"
						autocomplete="off"
					/>
				</div>
				<div>
					<MdcTextField
						v-model="newPassword"
						type="password"
						label="新密碼"
						name="new-password"
						autocomplete="off"
					/>
				</div>
			</template>
			<template #actions>
				<MdcDialogActionButton @click.native="onClickCancelChangePassword">
					取消
				</MdcDialogActionButton>
				<MdcDialogActionButton
					:is-loading="isSavingNewPassword"
					:is-default="true"
					@click.native="onClickAcceptChangePassword"
				>
					儲存
				</MdcDialogActionButton>
			</template>
		</MdcDialogConfirm>
	</div>
</template>

<script>
import Board from '@components/Board';
import EditableTextField from '@components/EditableTextField';
import MdcButton from '@components/MdcButton';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcDialogConfirm from '@components/MdcDialogConfirm';
import MdcList from '@components/MdcList';
import MdcListItem from '@components/MdcListItem';
import MdcListItemSelect from '@components/MdcListItemSelect';
import MdcTextField from '@components/MdcTextField';

export default {
	components: {
		Board,
		EditableTextField,
		MdcButton,
		MdcDialogActionButton,
		MdcDialogConfirm,
		MdcList,
		MdcListItem,
		MdcListItemSelect,
		MdcTextField,
	},
	data() {
		return {
			currency: '',
			currentPassword: '',
			dateFormat: '',
			isSavingNewPassword: false,
			isSigningOut: false,
			language: '',
			mode: 'viewMode',
			newDisplayName: '',
			newPassword: '',
			unitSystem: '',
		};
	},
	computed: {
		...mapState('user', [
			'user',
		]),
		...mapGetters('user', [
			'isUserHasPassword',
			'userSettings',
		]),
	},
	created() {
		this.setInitialData();
	},
	methods: {
		setInitialData() {
			this.language = this.userSettings.language;
			this.unitSystem = this.userSettings.unitSystem;
			this.dateFormat = this.userSettings.dateFormat;
			this.currency = this.userSettings.currency;
		},
		showChangePasswordDialog() {
			this.currentPassword = this.newPassword = '';
			this.$refs.changePasswordDialog.open();
		},
		onClickCancelChangePassword() {
			this.$refs.changePasswordDialog.close('cancel');
		},
		async onClickAcceptChangePassword() {
			try {
				this.isSavingNewPassword = true;
				await this.updatePassword({
					currentPassword: this.currentPassword,
					newPassword: this.newPassword,
				});
				this.$refs.changePasswordDialog.close('accept');
				this.$snackbar({
					message: '更改密碼成功',
				});
			} catch (e) {
				this.$snackbar({
					message: e,
				});
			} finally {
				this.isSavingNewPassword = false;
			}
		},
		async onSaveDisplayName(newDisplayName) {
			if(!newDisplayName) {
				return;
			}
			await this.updateProfile({
				displayName: newDisplayName,
			});
			this.$snackbar({
				message: '變更已儲存',
			});
		},
		async onClickSignOut() {
			try {
				this.isSigningOut = true;
				await this.signOut();
				await this.$router.push({ name: 'SignIn' });
				this.$snackbar({
					message: '您已經登出',
				});
			} catch (e) {
				console.log('catch error', e);
			} finally {
				this.isSigningOut = false;
			}
		},
		...mapActions('user', [
			'signOut',
			'updatePassword',
			'updateProfile',
		]),
	},
};
</script>
