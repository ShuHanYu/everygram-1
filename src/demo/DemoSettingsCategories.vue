<template>
	<FullLayout>
		<template #header>
			<MdcTopAppBar
				:title="'裝備類別設定'"
				navigation-icon="arrow_back_ios"
				@click:navigation="$router.push({ name: 'DemoSettings' })"
			/>
		</template>
		<div class="container">
			<div class="row">
				<div class="col-lg-6 mx-auto">
					<div class="d-none d-lg-block">
						<MdcButton el="router-link" class="mdc-button--text" :to="{ name: 'DemoSettings' }">
							<i slot="icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
							返回
						</MdcButton>
						<h2 class="mt-2 px-3">裝備類別設定</h2>
					</div>
					<Board>
						<MdcList ref="categoryList" class="mdc-list--non-interactive">
							<CategoryListItem
								v-for="(category, index) in categories"
								:key="index"
								:category="category"
								:data-id="index"
								class="sortable-draggable"
								@click:edit="onClickEditCategory(index)"
								@click:delete="onClickDeleteCategory(index)"
							/>
						</MdcList>
					</Board>
				</div>
			</div>
		</div>
		<div class="fab--sticky">
			<button class="mdc-fab mdc-fab--extended" @click="onClickCreateCategory">
				<div class="mdc-fab__ripple"></div>
				<span class="material-icons-outlined mdc-fab__icon">add</span>
				<span class="mdc-fab__label">新增類別</span>
			</button>
		</div>
		<CategoryEditorDialog
			ref="categoryEditorDialog"
			:categories="categories"
		/>
		<CategoryDeleteDialog
			ref="categoryDeleteDialog"
			:categories="categories"
		/>
	</FullLayout>
</template>

<script>
import settingsConfig from '@/settingsConfig';
import { MDCRipple } from '@material/ripple';
import Board from '@components/Board';
import FullLayout from '@components/FullLayout';
import CategoryDeleteDialog from '@components/Settings/CategoryDeleteDialog';
import CategoryEditorDialog from '@components/Settings/CategoryEditorDialog';
import CategoryListItem from '@components/Settings/CategoryListItem';
import MdcButton from '@components/MdcButton';
import MdcList from '@components/MdcList';
import MdcTopAppBar from '@components/MdcTopAppBar';
import Sortable from 'sortablejs';

export default {
	components: {
		Board,
		FullLayout,
		CategoryDeleteDialog,
		CategoryEditorDialog,
		CategoryListItem,
		MdcButton,
		MdcList,
		MdcTopAppBar,
	},
	data() {
		return {
			categories: settingsConfig.default.categories,
		};
	},
	mounted() {
		const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
		Sortable.create(this.$refs.categoryList.$el, {
			sort: true,
			delay: 100,
			delayOnTouchOnly: true,
			animation: 300,
			draggable: ".sortable-draggable",
			ghostClass: "sortable-ghost",
			chosenClass: "sortable-chosen",
			dragClass: "sortable-drag",
			direction: 'vertical',
		});
	},
	methods: {
		onClickCreateCategory() {
			this.$refs.categoryEditorDialog.create();
		},
		onClickEditCategory(index) {
			this.$refs.categoryEditorDialog.edit(index);
		},
		onClickDeleteCategory(index) {
			this.$refs.categoryDeleteDialog.show(index);
		},
	},
};
</script>
