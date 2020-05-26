import MdcSnackbar from '@components/MdcSnackbar';
export default {
	install(Vue) {
		// append container
		const container = document.createElement('div');
		container.setAttribute('id', 'snackbar-container');
		document.body.appendChild(container);

		Vue.prototype.$snackbar = ({
			message,
			buttonText,
			type,
		}) => {
			const MdcSnackbarClass = Vue.extend(MdcSnackbar);

			// mount component
			const component = new MdcSnackbarClass({
				propsData: {
					message,
					buttonText,
					type,
				},
			});

			component.$mount();

			// append to dom and open
			window.requestAnimationFrame(() => {
				container.appendChild(component.$el);
			});

			component.$once('MDCSnackbar:closed', () => {
				container.removeChild(component.$el);
				component.$destroy();
			});
		};
	},
};
