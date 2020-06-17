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

const header = document.getElementsByTagName('HEADER')[0];
const body = document.getElementsByTagName('BODY')[0];
const main = document.getElementsByTagName('MAIN')[0];
const button = document.getElementsByClassName('navigation-container')[0];

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

				pagination: {
					el: '.services-pagination',
					clickable: true,
					type: 'fraction',
					renderFraction: function (currentClass, totalClass) {
						return (
							'<span class="' +
							currentClass +
							'"></span>' +
							' / ' +
							'<span class="' +
							totalClass +
							'"></span>'
						);
					},
				},

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

				pagination: {
					el: '.products-pagination',
					clickable: true,
					type: 'fraction',
					renderFraction: function (currentClass, totalClass) {
						return (
							'<span class="' +
							currentClass +
							'"></span>' +
							' / ' +
							'<span class="' +
							totalClass +
							'"></span>'
						);
					},
				},

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
	body.classList.toggle('fixed');
};

window.addEventListener('resize', changeMainPadding);
window.addEventListener('load', initSwipers);
window.addEventListener('load', changeMainPadding);
button.addEventListener('click', handleMobileMenuClick);
