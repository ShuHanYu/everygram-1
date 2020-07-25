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
					<Board>
						<div slot="header" class="settings__profile-header"></div>
						<template #body>
							<div v-if="mode === 'viewMode'" class="settings__profile-name mb-4">
								<MdcTextField
									type="text"
									label="名稱"
									value="LIN PEI ZHEN"
									disabled
								/>
								<MdcIconButton @click.native="mode = 'editName'">edit</MdcIconButton>
							</div>
							<div v-if="mode === 'editName'" class="settings__profile-name settings__profile-name--editing mb-4">
								<MdcTextField
									type="text"
									label="名稱"
									value="LIN PEI ZHEN"
								/>
								<MdcIconButton class="text-danger" @click.native="mode = 'viewMode'">close</MdcIconButton>
								<MdcIconButton class="text-success" @click.native="mode = 'viewMode'">check</MdcIconButton>
							</div>
							<div class="mb-4">
								<MdcTextField
									type="text"
									label="Email"
									value="everygram@text.com"
									disabled
								>
									<template #trailingIcon>
										<img src="/static/images/social-google.svg" alt="">
									</template>
								</MdcTextField>
							</div>
							<div class="text-center">
								<MdcButton class="mdc-button--outlined" @click.native="showChangePasswordDialog">更改密碼</MdcButton>
								<MdcButton class="mdc-button--outlined">登出</MdcButton>
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
								<RouterLink :to="{ name: 'DemoSettingsCategory' }" />
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
					/>
				</div>
				<div>
					<MdcTextField
						v-model="newPassword"
						type="password"
						label="新密碼"
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
import MdcButton from '@components/MdcButton';
import MdcDialogActionButton from '@components/MdcDialogActionButton';
import MdcDialogConfirm from '@components/MdcDialogConfirm';
import MdcIconButton from '@components/MdcIconButton';
import MdcList from '@components/MdcList';
import MdcListItem from '@components/MdcListItem';
import MdcListItemSelect from '@components/MdcListItemSelect';
import MdcTextField from '@components/MdcTextField';

export default {
	components: {
		Board,
		MdcButton,
		MdcDialogActionButton,
		MdcDialogConfirm,
		MdcIconButton,
		MdcList,
		MdcListItem,
		MdcListItemSelect,
		MdcTextField,
	},
	data() {
		return {
			mode: 'viewMode',
			language: 'zh-tw',
			unitSystem: 'metric',
			dateFormat: 'YYYY/MM/DD',
			currency: 'TWD',
			currentPassword: '',
			newPassword: '',
			isSavingNewPassword: false,
		};
	},
	methods: {
		showChangePasswordDialog() {
			this.currentPassword = this.newPassword = '';
			this.$refs.changePasswordDialog.open();
		},
		onClickCancelChangePassword() {
			this.$refs.changePasswordDialog.close('cancel');
		},
		onClickAcceptChangePassword() {
			this.isSavingNewPassword = true;
			setTimeout(() => {
				this.$refs.changePasswordDialog.close('accept');
				this.isSavingNewPassword = false;
				this.$snackbar({
					message: '更改密碼成功',
				});
			}, 1500);
		},
	},
};
</script>
