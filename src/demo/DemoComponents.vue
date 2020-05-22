<template>
	<div>
		<div>
			<h2>MdcTextField</h2>
			<MdcTextField placeholder="type something..." />
			<MdcTextField
				value=""
				label="Price"
				placeholder="0,000"
			>
				<template #prefix>
					$
				</template>
				<template #suffix>
					.00
				</template>
				<template #leadingIcon>
					label
				</template>
				<template #trailingIcon>
					shopping_cart
				</template>
			</MdcTextField>
			<MdcTextField value="disabled" disabled />
		</div>
		<div>
			<h2>MdcButton</h2>
			<MdcButton>button</MdcButton>
			<MdcButton class="mdc-button--raised">raised</MdcButton>
			<MdcButton class="mdc-button--outlined">outlined</MdcButton>
			<MdcButton disabled>disabled</MdcButton>
		</div>
	</div>
</template>

<script>
import MdcButton from '@components/MdcButton';
import MdcTextField from '@components/MdcTextField';
export default {
	components: {
		MdcButton,
		MdcTextField,
	},
	data() {
		return {};
	},
}
</script>
