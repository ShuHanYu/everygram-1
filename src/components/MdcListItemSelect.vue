<template>
	<MdcListItem>
		<template slot="text">
			<span class="text-muted">{{ label }} -</span> {{ selectedOption.text }}
		</template>
		<template #icon>arrow_drop_down</template>
		<select ref="select">
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
				:selected="option.value === value"
			>
				{{ option.text }}
			</option>
		</select>
	</MdcListItem>
</template>

<script>
import MdcListItem from '@components/MdcListItem';
export default {
	components: {
		MdcListItem,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		options: {
			type: Array,
			default: () => [],
		},
		value: {
			type: String,
			default: null,
		},
	},
	computed: {
		selectedOption() {
			return _.find(this.options, ['value', this.value]);
		},
	},
	mounted() {
		this.$refs.select.addEventListener('change', () => {
			this.$emit('input', this.$refs.select.value);
			this.$emit('change', this.$refs.select.value);
		});
	},
};
</script>
