// Import pug
import './index.pug';
// Import styles
import './styles/index.scss';
import 'swiper/css/swiper.min.css';
// Import data
import { services, products } from './data/main.json';
// Import Swiper and modules
import {
	Swiper,
	Scrollbar,
	Navigation,
	Pagination,
	Lazy,
	Autoplay,
} from 'swiper/js/swiper.esm.js';
// Install modules
Swiper.use([Scrollbar, Navigation, Lazy, Pagination, Autoplay]);
// Import scroll lock
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const header = document.getElementsByTagName('HEADER')[0];
const body = document.getElementsByTagName('BODY')[0];
const main = document.getElementsByTagName('MAIN')[0];
const button = document.getElementsByClassName('navigation-container')[0];
const sections = document.querySelectorAll('main > section:not(#imprint)');
const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
let currentSection = undefined;
let currentSectionLink = undefined;

const initSwipers = () => {
	var slideshowSwiper = new Swiper('.hero-container', {
		direction: 'horizontal',
		loop: true,
		preloadImages: false,

		lazy: {
			loadPrevNext: true,
		},

		autoplay: {
			delay: 5000,
		},

		navigation: {
			nextEl: '.hero-button-next',
			prevEl: '.hero-button-prev',
		},

		pagination: {
			el: '.hero-pagination',
			clickable: true,
			type: 'bullets',
		},

		scrollbar: {
			el: '.hero-scrollbar',
		},
	});

	var serviceSwipers = [];

	services.services.forEach((service) => {
		serviceSwipers.push(
			new Swiper(`#${service.id} .services-container`, {
				direction: 'horizontal',
				loop: true,
				preloadImages: false,

				lazy: {
					loadPrevNext: true,
				},

				autoplay: {
					delay: 5000,
				},

				// pagination: {
				// 	el: '.services-pagination',
				// 	clickable: true,
				// 	type: 'fraction',
				// 	renderFraction: function (currentClass, totalClass) {
				// 		return (
				// 			'<span class="' +
				// 			currentClass +
				// 			'"></span>' +
				// 			' / ' +
				// 			'<span class="' +
				// 			totalClass +
				// 			'"></span>'
				// 		);
				// 	},
				// },

				navigation: {
					nextEl: '.services-button-next',
					prevEl: '.services-button-prev',
				},

				scrollbar: {
					el: '.services-scrollbar',
				},
			})
		);
	});

	var productSwipers = [];

	products.products.forEach((product) => {
		productSwipers.push(
			new Swiper(`#${product.id} .products-container`, {
				direction: 'horizontal',
				loop: true,
				preloadImages: false,

				lazy: {
					loadPrevNext: true,
				},

				autoplay: {
					delay: 5000,
				},

				// pagination: {
				// 	el: '.products-pagination',
				// 	clickable: true,
				// 	type: 'fraction',
				// 	renderFraction: function (currentClass, totalClass) {
				// 		return (
				// 			'<span class="' +
				// 			currentClass +
				// 			'"></span>' +
				// 			' / ' +
				// 			'<span class="' +
				// 			totalClass +
				// 			'"></span>'
				// 		);
				// 	},
				// },

				navigation: {
					nextEl: '.products-button-next',
					prevEl: '.products-button-prev',
				},

				scrollbar: {
					el: '.products-scrollbar',
				},
			})
		);
	});
};

const changeMainPadding = () => {
	main.style.paddingTop = header.offsetHeight + 'px';
};

const handleMobileMenuClick = () => {
	header.classList.toggle('open');
	if (!desktopMediaQuery)
		header.classList.contains('open')
			? disableBodyScroll(body)
			: enableBodyScroll(body);
};

const handleScroll = () => {
	let windowScroll = window.pageYOffset || document.documentElement.scrollTop;
	let viewportHeight = Math.max(
		document.documentElement.clientHeight || 0,
		window.innerHeight || 0
	);
	let scrollThreshold = windowScroll + 0.5 * viewportHeight;
	for (let section of sections) {
		if (section.offsetTop > scrollThreshold) {
			if (currentSectionLink) {
				currentSectionLink.classList.remove('current');
			}
			currentSection = section;
			currentSectionLink = document.querySelector(
				`a[href='#${currentSection.id}']`
			);
			currentSectionLink.classList.add('current');
			break;
		}
	}
};

const initScrollHandle = () => {
	const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');

	if (desktopMediaQuery.matches) {
		handleScroll();
		window.addEventListener('scroll', handleScroll);
	}

	desktopMediaQuery.addListener((data) => {
		if (data.matches) {
			window.addEventListener('scroll', handleScroll);
		} else {
			window.removeEventListener('scroll', handleScroll);
		}
	});
};

const showHeroWrappers = () => {
	document
		.querySelectorAll('.hero-slide > .wrapper')
		.forEach((wrapper) => wrapper.classList.remove('hidden'));
};

window.addEventListener('resize', changeMainPadding);
window.addEventListener('load', initSwipers);
//window.addEventListener('load', initScrollHandle);
window.addEventListener('load', changeMainPadding);
window.addEventListener('load', showHeroWrappers);
button.addEventListener('click', handleMobileMenuClick);
