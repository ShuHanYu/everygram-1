// firebase
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../firebase.config';
export const project = firebase.initializeApp(firebaseConfig);

// vue
import Vue from 'vue';
import router from '@/router';
import store from '@/store';

// vee validation
import '@libs/veeValidations';

// lang
import { lang, errorMessageLang } from '@libs/lang';

// use _ in all of vue component template
Object.defineProperty(Vue.prototype, '_', { value: _ });
Object.defineProperty(Vue.prototype, 'lang', { value: lang });
Object.defineProperty(Vue.prototype, 'errorMessageLang', { value: errorMessageLang });
Object.defineProperty(Vue.prototype, 'constant', { value: constant });

// plugins
import snackbar from '@plugins/snackbar';
Vue.use(snackbar);

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
				// Prevent the mini info bar from appearing on mobile
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
					// iOS standalone
					this.$store.commit('setDisplayMode', 'standalone');
				} else if (matchMedia('(display-mode: standalone)').matches) {
					// other standalone
					this.$store.commit('setDisplayMode', 'standalone');
				} else {
					this.$store.commit('setDisplayMode', 'browser');
				}
			});
		},
	}
});

// register service worker
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		runtime.register();
	});
}
