<template>
	<div class="main">
		<slot name="header"></slot>
		<div ref="mdcDrawerAppContent" class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
			<main ref="mainContent" class="main__content">
				<slot></slot>
			</main>
		</div>
	</div>
</template>
