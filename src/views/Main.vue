<template>
	<div class="main">
		<header ref="mdcTopAppBar" class="mdc-top-app-bar">
			<div class="mdc-top-app-bar__row">
				<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
					<button class="material-icons-outlined mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
					<span class="mdc-top-app-bar__title">everygram</span>
				</section>
			</div>
		</header>
		<aside ref="mdcDrawer" class="mdc-drawer mdc-drawer--modal">
			<div class="mdc-drawer__header">
				<div class="drawer-header">
					<div
						v-if="user.photoURL"
						class="avatar drawer-header__avatar"
						:style="{ 'background-image': `url(${ user.photoURL })` }"
					></div>
					<div class="flex-remain">
						<div class="drawer-header__title">
							{{ user.displayName }}
						</div>
						<div class="drawer-header__subtitle">
							{{ user.email }}
						</div>
					</div>
				</div>
			</div>
			<div class="mdc-drawer__content">
				<nav ref="mdcList" class="mdc-list">
					<RouterLink
						:to="{ name: 'Gears' }"
						class="mdc-list-item mdc-list-item--activated"
						tabindex="0"
					>
						<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">category</i>
						<span class="mdc-list-item__text">裝備清單</span>
					</RouterLink>
					<RouterLink
						:to="{ name: 'Trips' }"
						class="mdc-list-item"
					>
						<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">landscape</i>
						<span class="mdc-list-item__text">行程裝備</span>
					</RouterLink>
					<RouterLink
						:to="{ name: 'Collections' }"
						class="mdc-list-item"
					>
						<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">collections_bookmark</i>
						<span class="mdc-list-item__text">常用裝備組合</span>
					</RouterLink>
					<RouterLink
						:to="{ name: 'Wishes' }"
						class="mdc-list-item"
					>
						<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">favorite_border</i>
						<span class="mdc-list-item__text">願望清單</span>
					</RouterLink>
					<RouterLink
						:to="{ name: 'Archives' }"
						class="mdc-list-item"
					>
						<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">archive</i>
						<span class="mdc-list-item__text">已封存</span>
					</RouterLink>
					<RouterLink
						:to="{ name: 'Settings' }"
						class="mdc-list-item"
					>
						<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">settings</i>
						<span class="mdc-list-item__text">設定</span>
					</RouterLink>
				</nav>
			</div>
		</aside>
		<div class="mdc-drawer-scrim"></div>
		<div ref="mdcDrawerAppContent" class="mdc-drawer-app-content">
			<main ref="mainContent" class="main__content">
				<router-view></router-view>
			</main>
		</div>
	</div>
</template>

<script>
import { MDCList } from "@material/list";
import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
export default {
	computed: {
		...mapState('user', [
			'user',
		]),
	},
	mounted() {
		this.initResponsiveDrawer();
	},
	methods: {
		initResponsiveDrawer() {
			// https://glitch.com/~material-responsive-drawer
			const topAppBarElement = this.$refs.mdcTopAppBar;
			const listEl = this.$refs.mdcList;
			const drawerElement = this.$refs.mdcDrawer;
			const appContentEl = this.$refs.mdcDrawerAppContent;
			const mainContentEl = this.$refs.mainContent;

			const initModalDrawer = () => {
				drawerElement.classList.add("mdc-drawer--modal");
				const drawer = MDCDrawer.attachTo(drawerElement);
				drawer.open = false;

				const topAppBar = MDCTopAppBar.attachTo(topAppBarElement);
				topAppBar.setScrollTarget(mainContentEl);
				topAppBar.listen('MDCTopAppBar:nav', () => {
					drawer.open = !drawer.open;
				});

				listEl.addEventListener('click', (event) => {
					drawer.open = false;
				});

				appContentEl.classList.add('mdc-top-app-bar--fixed-adjust');

				return drawer;
			};

			const initPermanentDrawer = () => {
				drawerElement.classList.remove("mdc-drawer--modal");
				const list = new MDCList(listEl);
				list.wrapFocus = true;
				appContentEl.classList.remove('mdc-top-app-bar--fixed-adjust');
				return list;
			};

			let drawer = window.matchMedia("(max-width: 991px)").matches ?
				initModalDrawer() : initPermanentDrawer();

			// Toggle between permanent drawer and modal drawer at breakpoint
			const resizeHandler = () => {
				if (window.matchMedia("(max-width: 991px)").matches && drawer instanceof MDCList) {
					drawer.destroy();
					drawer = initModalDrawer();
				} else if (window.matchMedia("(min-width: 992px)").matches && drawer instanceof MDCDrawer) {
					drawer.destroy();
					drawer = initPermanentDrawer();
				}
			};
			window.addEventListener('resize', resizeHandler);
		},
	},
};
</script>
