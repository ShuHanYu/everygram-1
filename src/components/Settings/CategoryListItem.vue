<template>
	<li class="mdc-list-item">
		<span class="mdc-list-item__graphic material-icons-outlined" aria-hidden="true">drag_handle</span>
		<span class="mdc-list-item__text d-flex align-items-center">
			<CategoryIcon :icon-type="category.iconType" :icon-name="category.iconName" />
			<span class="ml-4">
				{{ lang(_.get(category, 'langKey', category.name)) }}
			</span>
		</span>
		<span class="mdc-list-item__meta">
			<MdcIconButton @click.native="$emit('click:edit')">edit</MdcIconButton>
			<MdcIconButton @click.native="$emit('click:delete')">delete</MdcIconButton>
		</span>
	</li>
</template>

<script>
import CategoryIcon from '@components/CategoryIcon';
import MdcIconButton from '@components/MdcIconButton';
export default {
	components: {
		CategoryIcon,
		MdcIconButton,
	},
	props: {
		category: {
			type: Object,
			required: true,
		},
	},
};
</script>
