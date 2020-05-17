<template>
	<div class="main">
		<aside class="mdc-drawer">
			<div class="mdc-drawer__header">
				<div class="drawer-header">
					<div class="avatar drawer-header__avatar" style="background-image: url(https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/44521390_2446796028670090_1705224010763075584_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQl9SiIa6nmBF5CuI5qYve3a7aA6f-xUaFxA8cJ0BFR9O1yA2frgoZ0jfn6IqC_OzmQ&_nc_ht=scontent.ftpe7-3.fna&oh=9c92eecac1f5af4dd1a888577d458d20&oe=5EE89297);"></div>
					<div class="flex-remain">
						<div class="drawer-header__title">林佩禎</div>
						<div class="drawer-header__subtitle">peizhenlin@text.com</div>
					</div>
				</div>
			</div>
			<div class="mdc-drawer__content">
				<nav class="mdc-list">
				<a class="mdc-list-item mdc-list-item--activated">
					<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">category</i>
					<span class="mdc-list-item__text">裝備清單</span>
				</a>
				<a class="mdc-list-item">
					<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">landscape</i>
					<span class="mdc-list-item__text">行程裝備</span>
				</a>
				<a class="mdc-list-item">
					<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">collections_bookmark</i>
					<span class="mdc-list-item__text">常用裝備組合</span>
				</a>
				<a class="mdc-list-item">
					<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">favorite_border</i>
					<span class="mdc-list-item__text">願望清單</span>
				</a>
				<a class="mdc-list-item">
					<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">archive</i>
					<span class="mdc-list-item__text">已封存</span>
				</a>
				<a class="mdc-list-item">
					<i class="material-icons-outlined mdc-list-item__graphic" aria-hidden="true">settings</i>
					<span class="mdc-list-item__text">設定</span>
				</a>
				</nav>
			</div>
		</aside>

		<div class="mdc-drawer-scrim"></div>

		<div class="mdc-drawer-app-content">
			<header class="mdc-top-app-bar">
				<div class="mdc-top-app-bar__row">
					<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
						<button class="material-icons-outlined mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
						<span class="mdc-top-app-bar__title">Dismissible Drawer</span>
					</section>
				</div>
			</header>
			<main class="main__content">
				
			</main>
		</div>
	</div>
</template>

<script>
import MdcButton from '@components/MdcButton';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCDrawer} from "@material/drawer";
import {MDCList} from "@material/list";

export default {
	components: {
		MdcButton,
	},
};
</script>
