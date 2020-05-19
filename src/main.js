// firebase
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../firebase.config';
export const project = firebase.initializeApp(firebaseConfig);

// vue
import Vue from 'vue';
import router from '@/router';
import store from '@/store';

// use _ in all of vue component template
Object.defineProperty(Vue.prototype, '_', { value: _ });

export const EventBus = new Vue();

new Vue({
	el: '#app',
	store,
	router,
	created() {
		this.$store.dispatch('init');
		this.bindEvents();
	},
	methods: {
		bindEvents() {
			// install prompt
			window.addEventListener('beforeinstallprompt', (e) => {
				console.log('showInstallPromotion');
				// Prevent the mini-infobar from appearing on mobile
				e.preventDefault();
				this.$store.dispatch('onInstallReady', e);
			});

			// pwa installed
			window.addEventListener('appinstalled', (e) => {
				console.log('add to home screen installed', e);
			});

			// track how the PWA was launched
			window.addEventListener('load', () => {
				if (navigator.standalone) {
					console.log('Launched: Installed (iOS)');
				} else if (matchMedia('(display-mode: standalone)').matches) {
					console.log('Launched: Installed');
				} else {
					console.log('Launched: Browser Tab');
				}
			});
		},
	}
});

// register service worker
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		const registration = runtime.register();
	});
}
