<template>
	<FullLayout>
		<template #header>
			<MdcTopAppBar
				:title="lang('title_settings_categories')"
				navigation-icon="arrow_back_ios"
				@click:navigation="$router.push({ name: 'Settings' })"
			/>
		</template>
		<div class="container">
			<div class="row">
				<div class="col-lg-6 mx-auto">
					<div class="d-none d-lg-block">
						<MdcButton el="router-link" class="mdc-button--text" :to="{ name: 'Settings' }">
							<i slot="icon" class="material-icons material-icons-outlined mdc-button__icon">keyboard_arrow_left</i>
							{{ lang('action_back') }}
						</MdcButton>
						<h2 class="mt-2 px-3">{{ lang('title_settings_categories') }}</h2>
					</div>
					<Board>
						<MdcList class="mdc-list--non-interactive">
							<CategoryListItem
								v-for="(category, index) in memberSettings.categories"
								:key="category.name + index"
								:category="category"
								@click:edit="onClickEditCategory(index)"
								@click:delete="onClickDeleteCategory(index)"
							/>
						</MdcList>
					</Board>
				</div>
			</div>
		</div>
		<div class="fab--sticky">
			<button class="mdc-fab mdc-fab--extended" @click="onClickAddCategory">
				<div class="mdc-fab__ripple"></div>
				<span class="material-icons-outlined mdc-fab__icon">add</span>
				<span class="mdc-fab__label">{{ lang('action_create_category') }}</span>
			</button>
		</div>
		<CategoryEditorDialog ref="categoryEditorDialog" />
	</FullLayout>
</template>

<script>
import Board from '@components/Board';
import CategoryEditorDialog from '@components/Settings/CategoryEditorDialog';
import CategoryListItem from '@components/Settings/CategoryListItem';
import FullLayout from '@components/FullLayout';
import MdcButton from '@components/MdcButton';
import MdcList from '@components/MdcList';
import MdcTopAppBar from '@components/MdcTopAppBar';
export default {
	components: {
		Board,
		CategoryEditorDialog,
		CategoryListItem,
		FullLayout,
		MdcButton,
		MdcList,
		MdcTopAppBar,
	},
	computed: {
		...mapGetters('member', [
			'memberSettings',
		]),
	},
	methods: {
		onClickAddCategory() {
			this.$refs.categoryEditorDialog.create();
		},
		onClickEditCategory(index) {
			this.$refs.categoryEditorDialog.edit(index);
		},
		onClickDeleteCategory() {

		},
	},
}
</script>
