<template>
	<div class="main">
		<header ref="mdcTopAppBar" class="mdc-top-app-bar">
			<div class="mdc-top-app-bar__row">
				<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
					<button class="material-icons-outlined mdc-top-app-bar__navigation-icon mdc-icon-button">arrow_back_ios</button>
					<span class="mdc-top-app-bar__title">裝備類別設定</span>
				</section>
			</div>
		</header>
		<div ref="mdcDrawerAppContent" class="mdc-drawer-app-content">
			<main ref="mainContent" class="main__content">
				<div class="container">
					<div class="row">
						<div class="col-lg-6 mx-auto">
							<div class="d-none d-lg-block">
								<MdcButton el="a" class="mdc-button--text" href="/demo/settings">
									<i slot="icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
									返回
								</MdcButton>
								<h2 class="mt-2 px-3">裝備類別設定</h2>
							</div>

							<div class="board">
								<ul class="mdc-list mdc-list--non-interactive">
									<li v-for="(category, idx) in categories" :key="idx" class="mdc-list-item" tabindex="-1">
										<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span>
										<span class="mdc-list-item__text d-flex align-items-center">
											<i class="material-icons-outlined">{{ category.icon }}</i>
											<span class="ml-4">{{ category.name }}</span>
										</span>
										<span class="mdc-list-item__meta">
											<button class="mdc-icon-button material-icons-outlined" @click="showEditDialog">edit</button>
											<button class="mdc-icon-button material-icons-outlined" @click="showDeleteDialog">delete</button>
										</span>
									</li>
								</ul>
								<div class="mdc-dialog" ref="editDialog">
									<div class="mdc-dialog__container">
										<div class="mdc-dialog__surface"
											role="alertdialog"
											aria-modal="true"
											aria-labelledby="my-dialog-title"
											aria-describedby="my-dialog-content"
										>
											<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
											<h2 class="mdc-dialog__title" id="my-dialog-title"><!--
											-->編輯類別<!--
										--></h2>
											<div class="mdc-dialog__content" id="my-dialog-content">
												<div class="mb-4">
													<MdcTextField
														type="text"
														label="類別名稱"
														value="背包"
														:required="true"
													/>
												</div>
												<div class="row no-gutters">
													<div class="col-auto" v-for="(categoryIcon, idx) in categoryIcons" :key="idx">
														<label class="icon-radio">
															<input type="radio" name="category_icon">
															<i class="material-icons-outlined icon-radio__icon">{{ categoryIcon.icon }}</i>
														</label>
													</div>
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
								<div class="mdc-dialog" ref="deleteDialog">
									<div class="mdc-dialog__container">
										<div class="mdc-dialog__surface"
											role="alertdialog"
											aria-modal="true"
											aria-labelledby="my-dialog-title"
											aria-describedby="my-dialog-content"
										>
											<div class="mdc-dialog__content" id="my-dialog-content">
												確定要刪除「背包」類別嗎？
												<br>
												<small class="text-muted">該類別的裝備不會被刪除，而是會變成未分類。</small>
											</div>
											<div class="mdc-dialog__actions">
												<MdcButton class="mdc-dialog__button" data-mdc-dialog-action="close">取消</MdcButton>
												<MdcButton class="mdc-dialog__button" data-mdc-dialog-action="accept">
													<div class="text-danger">刪除</div>
												</MdcButton>
											</div>
										</div>
									</div>
									<div class="mdc-dialog__scrim"></div>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div class="fab--sticky">
					<button class="mdc-fab mdc-fab--extended" @click="showEditDialog">
						<div class="mdc-fab__ripple"></div>
						<span class="material-icons-outlined mdc-fab__icon">add</span>
						<span class="mdc-fab__label">新增類別</span>
					</button>
				</div>
			</main>
		</div>
	</div>
</template>

<script>
import { MDCDialog } from '@material/dialog';
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
			editDialog: null,
			deleteDialog: null,
			categories: [
				{
					name: '背包',
					icon: 'card_giftcard',
				},
				{
					name: '睡眠系統',
					icon: 'local_hotel',
				},
				{
					name: '炊事系統',
					icon: 'outdoor_grill',
				},
				{
					name: '飲水',
					icon: 'free_breakfast',
				},
				{
					name: '底層上衣',
					icon: 'card_giftcard',
				},
				{
					name: '褲子',
					icon: 'card_giftcard',
				},
				{
					name: '外套',
					icon: 'card_giftcard',
				},
				{
					name: '配件',
					icon: 'watch',
				},
				{
					name: '電子產品',
					icon: 'devices_other',
				},
				{
					name: '其他',
					icon: 'more_horiz',
				},
			],
			categoryIcons: [
				{
					icon: 'offline_bolt',
				},
				{
					icon: 'battery_charging_full',
				},
				{
					icon: 'devices_other',
				},
				{
					icon: 'watch',
				},
				{
					icon: 'healing',
				},
				{
					icon: 'category',
				},
				{
					icon: 'local_dining',
				},
				{
					icon: 'map',
				},
				{
					icon: 'whatshot',
				},
				{
					icon: 'outdoor_grill',
				},
				{
					icon: 'fireplace',
				},
				{
					icon: 'emoji_food_beverage',
				},
				{
					icon: 'cake',
				},
				{
					icon: 'near_me',
				},
				{
					icon: 'local_play',
				},
				{
					icon: 'local_mall',
				},
				{
					icon: 'local_mall',
				},
				{
					icon: 'local_mall',
				},
				{
					icon: 'local_mall',
				},
				{
					icon: 'local_mall',
				},
				{
					icon: 'local_mall',
				},
				{
					icon: 'local_mall',
				},
				{
					icon: 'local_mall',
				},
			]
		};
	},
	mounted() {
		document.querySelectorAll('.mdc-icon-button').forEach((iconBtn) => {
			const iconButtonRipple = new MDCRipple(iconBtn);
			iconButtonRipple.unbounded = true;
		});

		document.querySelectorAll('.mdc-button').forEach((btn) => {
			const btnRipple = new MDCRipple(btn);
		});

		this.editDialog = new MDCDialog(this.$refs.editDialog);

		this.deleteDialog = new MDCDialog(this.$refs.deleteDialog);

		const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
	},
	methods: {
		showEditDialog() {
			this.editDialog.open();
		},
		showDeleteDialog() {
			this.deleteDialog.open();
		},
	},
};
</script>
