<template>
	<div class="settings">
		<div class="container-xl">
			<div class="row">
				<div class="col-xl-5">

					<Board>
						<div slot="header" class="settings__profile-header">
							<div
								class="avatar settings__profile-avatar"
								:style="{ 'background-image': `url(${ constant('DEFAULT_MEMBER_PHOTO_URL') }` }"
							>
								<i class="material-icons-outlined settings__profile-camera">photo_camera</i>
								<input type="file">
							</div>
						</div>
						<template #body>
							<EditableTextField
								label="名稱"
								:value="displayName"
								:on-save="onSaveDisplayName"
								class="mb-4"
							/>
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
								<MdcButton class="mdc-button--outlined my-2" @click.native="onClickChangePassword">更改密碼</MdcButton>
								<MdcButton class="mdc-button--outlined my-2">登出</MdcButton>
							</div>
						</template>
					</Board>
				</div>
				<div class="col-xl-7">
					<Board class="settings__board">
						<MdcList>
							<MdcListItem>
								<template #text>裝備類別設定</template>
								<template #icon>arrow_right</template>
								<RouterLink :to="{ name: 'DemoSettingsCategories' }" />
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
		<ChangePasswordDialog ref="changePasswordDialog" />
	</div>
</template>

<script>
import Board from '@components/Board';
import ChangePasswordDialog from '@components/Settings/ChangePasswordDialog';
import EditableTextField from '@components/EditableTextField';
import MdcButton from '@components/MdcButton';
import MdcList from '@components/MdcList';
import MdcListItem from '@components/MdcListItem';
import MdcListItemSelect from '@components/MdcListItemSelect';
import MdcTextField from '@components/MdcTextField';

export default {
	components: {
		Board,
		ChangePasswordDialog,
		EditableTextField,
		MdcButton,
		MdcList,
		MdcListItem,
		MdcListItemSelect,
		MdcTextField,
	},
	data() {
		return {
			mode: 'viewMode',
			displayName: 'LIN PEIZHEN',
			language: 'zh-tw',
			unitSystem: 'metric',
			dateFormat: 'YYYY/MM/DD',
			currency: 'TWD',
		};
	},
	methods: {
		onClickChangePassword() {
			this.$refs.changePasswordDialog.open();
		},
		async onSaveDisplayName(newDisplayName) {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
					this.displayName = newDisplayName;
				}, 1500);
			});
		},
	},
};
</script>
