<template>
	<div class="settings">
		<div class="container-xl">
			<div class="row">
				<div class="col-lg-5">
					<div
						class="avatar settings__profile-avatar"
						:style="{ 'background-image': isUploadingProfilePicture ? '' : `url(${ user.photoURL })` }"
					>
						<i class="material-icons-outlined settings__profile-camera">photo_camera</i>
						<input type="file" @change="onProfilePictureSelected" accept="image/*" title="" />
						<MdcCircularProgress v-if="isUploadingProfilePicture" class="settings__profile-avatar-loading" />
					</div>
					<Board>
						<div slot="header" class="settings__profile-header"></div>
						<template #body>
							<EditableTextField
								type="text"
								name="display-name"
								:label="lang('label_display_name')"
								:value="user.displayName"
								:on-save="onSaveDisplayName"
							/>
							<div class="mb-4">
								<MdcTextField
									type="text"
									:label="lang('label_email')"
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
								>{{ lang('action_change_password') }}</MdcButton>
								<MdcButton
									class="mdc-button--outlined"
									:is-loading="isSigningOut"
									@click.native="onClickSignOut"
								>{{ lang('action_sign_out') }}</MdcButton>
							</div>
						</template>
					</Board>
				</div>
				<div class="col-lg-7">
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>{{ lang('title_settings_categories') }}</template>
								<template #icon>arrow_right</template>
							</MdcListItem>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItemSelect
								:label="lang('label_language')"
								:options="languageOptions"
								v-model="language"
								@change="onSettingChange('language', arguments[0])"
							/>
							<MdcListItemSelect
								:label="lang('label_unit_system')"
								:options="unitSystemOptions"
								v-model="unitSystem"
								@change="onSettingChange('unitSystem', arguments[0])"
							/>
							<MdcListItemSelect
								:label="lang('label_date_format')"
								:options="dateFormatOptions"
								v-model="dateFormat"
								@change="onSettingChange('dateFormat', arguments[0])"
							/>
							<MdcListItemSelect
								:label="lang('label_currency')"
								:options="currencyOptions"
								v-model="currency"
								@change="onSettingChange('currency', arguments[0])"
							/>
						</MdcList>
					</Board>
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>{{ lang('action_give_us_feedback') }}</template>
								<template #icon>open_in_new</template>
							</MdcListItem>
							<MdcListItem>
								<template #text>{{ lang('action_buy_me_a_coffee') }}</template>
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
			:title="lang('title_change_password')"
			:is-accept-on-enter="true"
		>
			<template #default>
				<div class="mb-4">
					<MdcTextField
						v-model="currentPassword"
						type="password"
						:label="lang('label_current_password')"
						name="current-password"
						autocomplete="off"
					/>
				</div>
				<div>
					<MdcTextField
						v-model="newPassword"
						type="password"
						:label="lang('label_new_password')"
						name="new-password"
						autocomplete="off"
					/>
				</div>
			</template>
			<template #actions>
				<MdcDialogActionButton @click.native="onClickCancelChangePassword">
					{{ lang('action_cancel') }}
				</MdcDialogActionButton>
				<MdcDialogActionButton
					:is-loading="isSavingNewPassword"
					:is-default="true"
					@click.native="onClickAcceptChangePassword"
				>
					{{ lang('action_save') }}
				</MdcDialogActionButton>
			</template>
		</MdcDialogConfirm>
	</div>
</template>

<script>
import settingsConfig from '@/settingsConfig.json';
import Compressor from 'compressorjs';
import Board from '@components/Board';
import EditableTextField from '@components/EditableTextField';
import MdcButton from '@components/MdcButton';
import MdcCircularProgress from '@components/MdcCircularProgress';
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
		MdcCircularProgress,
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
			isUploadingProfilePicture: false,
			language: '',
			mode: 'viewMode',
			newDisplayName: '',
			newPassword: '',
			unitSystem: '',
		};
	},
	computed: {
		languageOptions() {
			return _.map(settingsConfig.language, (option, key) => ({
				text: lang(_.get(option, 'langKey')),
				value: key,
			}));
		},
		unitSystemOptions() {
			return _.map(settingsConfig.unitSystem, (option, key) => ({
				text: lang(_.get(option, 'langKey')),
				value: key,
			}));
		},
		dateFormatOptions() {
			return _.map(settingsConfig.dateFormat, (option, key) => ({
				text: lang(_.get(option, 'langKey')),
				value: key,
			}));
		},
		currencyOptions() {
			return _.map(settingsConfig.currency, (option, key) => ({
				text: `${ option.code } ${ lang(_.get(option, 'langKey')) }`,
				value: key,
			}));
		},
		...mapGetters('member', [
			'memberSettings',
		]),
		...mapGetters('user', [
			'user',
			'isUserHasPassword',
		]),
	},
	created() {
		this.setInitialData();
	},
	methods: {
		setInitialData() {
			this.language = this.memberSettings.language;
			this.unitSystem = this.memberSettings.unitSystem;
			this.dateFormat = this.memberSettings.dateFormat;
			this.currency = this.memberSettings.currency;
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
					message: lang('msg_password_changed'),
				});
			} catch (errorMessage) {
				this.$snackbar({
					message: errorMessage,
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
				message: lang('msg_changes_are_saved'),
			});
		},
		async onClickSignOut() {
			try {
				this.isSigningOut = true;
				await this.signOut();
				await this.$router.push({ name: 'SignIn' });
				this.$snackbar({
					message: lang('msg_signed_out'),
				});
			} catch (e) {
				console.log('catch error', e);
			} finally {
				this.isSigningOut = false;
			}
		},
		async onSettingChange(name, value) {
			try {
				await this.updateMember({
					[name]: value,
				});
				this.$snackbar({
					message: lang('msg_changes_are_saved'),
				});
			} catch (errorMessage) {
				this.$snackbar({
					message: errorMessage,
				});
			}
		},
		async onProfilePictureSelected(e) {
			const file = e.target.files[0];
			if (!file || this.isUploadingProfilePicture) {
				return;
			}
			try {
				this.isUploadingProfilePicture = true;
				// compress image
				const compressedFile = await new Promise((resolve) => {
					new Compressor(file, {
						quality: 0.8,
						maxHeight: 300,
						maxWidth: 300,
						success(result) {
							resolve(result);
						},
						error(err) {
							console.log(err.message);
							throw err.message;
						},
					});
				});
				// clear input
				e.target.value = '';
				// upload
				const photoURL = await this.uploadFile({
					path: `member/${ this.user.uid }`,
					file: compressedFile,
					fileName: 'profile_picture',
				});
				// update member data
				await this.onSettingChange('photoURL', photoURL);
			} catch (errorMessage) {
				this.$snackbar({
					message: errorMessage,
				});
			} finally {
				this.isUploadingProfilePicture = false;
			}
		},
		...mapActions('member', [
			'updateMember',
		]),
		...mapActions('storage', [
			'uploadFile',
		]),
		...mapActions('user', [
			'signOut',
			'updatePassword',
			'updateProfile',
		]),
	},
};
</script>
