<template>
	<div class="main">
		<slot name="header"></slot>
		<div ref="mdcDrawerAppContent" class="mdc-drawer-app-content">
			<main ref="mainContent" class="main__content">
				<slot></slot>
			</main>
		</div>
	</div>
</template>
