<template>
	<div class="editable-text-field">
		<MdcTextField
			type="text"
			ref="textField"
			class="editable-text-field__text-field"
			:label="label"
			:placeholder="placeholder"
			:value="isEditing ? newValue : value"
			:disabled="!isEditing || isSaving"
			@input="onInput"
			@keypress.enter="onClickSave"
		/>
		<MdcCircularProgress v-if="isSaving" class="editable-text-field__circular-progress mdc-circular-progress--small" />
		<template v-else-if="isEditing">
			<MdcIconButton
				class="editable-text-field__action-button text-danger"
				@click.native="onClickCancel"
			>
				close
			</MdcIconButton>
			<MdcIconButton
				class="editable-text-field__action-button text-success"
				@click.native="onClickSave"
			>
				check
			</MdcIconButton>
		</template>
		<template v-else>
			<MdcIconButton class="editable-text-field__action-button" @click.native="onClickEdit">edit</MdcIconButton>
		</template>
	</div>
</template>

<script>
import MdcCircularProgress from '@components/MdcCircularProgress';
import MdcIconButton from '@components/MdcIconButton';
import MdcTextField from '@components/MdcTextField';
export default {
	components: {
		MdcCircularProgress,
		MdcIconButton,
		MdcTextField,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: null,
		},
		placeholder: {
			type: String,
			default: ' ',
		},
		onSave: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			newValue: '',
			isEditing: false,
			isSaving: false,
		};
	},
	methods: {
		onClickCancel() {
			this.isEditing = false;
		},
		onClickEdit() {
			this.newValue = this.value;
			this.isEditing = true;
			this.$nextTick(() => {
				this.$refs.textField.focus();
			});
		},
		onInput(value) {
			this.newValue = value;
		},
		async onClickSave() {
			this.newValue = _.trim(this.newValue);
			if(this.value === this.newValue) {
				this.isEditing = false;
				return;
			}
			try {
				this.isSaving = true;
				await this.onSave(this.newValue);
			} catch (e) {
				console.log('catch error', e);
			} finally {
				this.isSaving = false;
				this.isEditing = false;
			}
		},
	},
};
</script>
