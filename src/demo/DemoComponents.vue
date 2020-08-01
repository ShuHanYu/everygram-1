<template>
	<div class="container py-4">
		<div class="py-4">
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
		<div class="py-4">
			<h2>MdcTextFieldHelperText</h2>
			<MdcTextField placeholder="type something..." />
			<MdcTextFieldHelperText :persistent="true">
				Tip: this field is required.
			</MdcTextFieldHelperText>
		</div>
		<div class="py-4">
			<h2>TextFieldErrorMessage</h2>
			<MdcTextField placeholder="type something..." :invalid="true" />
			<TextFieldErrorMessage message="Oops! Something is wrong" />
		</div>
		<div class="py-4">
			<h2>MdcButton</h2>
			<MdcButton>button</MdcButton>
			<MdcButton class="mdc-button--raised">raised</MdcButton>
			<MdcButton class="mdc-button--outlined">outlined</MdcButton>
			<MdcButton disabled>disabled</MdcButton>
			<MdcButton class="mdc-button--outlined" :is-loading="true">No show</MdcButton>
		</div>
		<div class="py-4">
			<h2>Snackbar</h2>
			<MdcButton class="mdc-button--outlined" @click.native="$snackbar({ message: 'Snackbar', buttonText: 'Got it!' })">Snackbar</MdcButton>
			<MdcButton class="mdc-button--outlined" @click.native="$snackbar({ message: 'Stacked Snackbar', buttonText: 'Got it!', type: 'stacked' })">Stacked Snackbar</MdcButton>
			<MdcButton class="mdc-button--outlined" @click.native="$snackbar({ message: 'Leading Snackbar', buttonText: 'Got it!', type: 'leading' })">Leading Snackbar</MdcButton>
		</div>
		<div class="py-4">
			<h2>AlertInline</h2>
			<AlertInline class="text-danger">Oops! Something went wrong!</AlertInline>
			<AlertInline class="text-warning">Caution! Be careful!</AlertInline>
		</div>
		<div class="py-4">
			<h2>CategoryIcons</h2>
			<i v-for="icon in icons" :key="icon" class="material-icons-outlined p-3">{{ icon }}</i>
		</div>
	</div>
</template>

<script>
import AlertInline from '@components/AlertInline';
import MdcButton from '@components/MdcButton';
import MdcTextField from '@components/MdcTextField';
import MdcTextFieldHelperText from '@components/MdcTextFieldHelperText';
import TextFieldErrorMessage from '@components/TextFieldErrorMessage';
export default {
	components: {
		AlertInline,
		MdcButton,
		MdcTextField,
		MdcTextFieldHelperText,
		TextFieldErrorMessage,
	},
	data() {
		return {
			icons: [
				"backpack",
				"airline_seat_individual_suite",
				"foundation",
				"outdoor_grill",
				"checkroom",
				"airline_seat_legroom_reduced",
				"pets",
				"handyman",
				"all_inclusive",
				"explore",
				"watch",
				"phone_iphone",
				"phone_android",
				"camera_roll",
				"camera_alt",
				"healing",
				"local_hospital",
				"sanitizer",
				"soap",
				"clean_hands",
				"sports_mma",
				"wb_incandescent",
				"highlight",
				"electrical_services",
				"work_outline",
				"vpn_key",
				"flag",
				"map",
				"place",
				"color_lens",
				"local_drink",
				"restaurant",
				"free_breakfast",
				"notifications",
				"fireplace",
				"local_fire_department",
				"beach_access",
				"umbrella",
				"filter_hdr",
				"extension",
				"apps",
				"widgets",
				"category",
				"settings",
				"pending",
				"more_horiz",
			]
		};
	},
}
</script>

