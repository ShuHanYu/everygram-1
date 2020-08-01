<template>
	<div class="board">
		<slot></slot>
		<div v-if="$slots.header" class="board__header">
			<slot name="header"></slot>
		</div>
		<div v-if="$slots.body" class="board__body">
			<slot name="body"></slot>
		</div>
		<div v-if="$slots.footer" class="board__footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
