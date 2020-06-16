import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import data from '../data/en.json';

window.onload = () => {
	var mySlideshowSwiper = new Swiper('.hero-container', {
		direction: 'horizontal',
		loop: true,

		autoplay: {
			delay: 5000,
		},

		pagination: {
			el: '.hero-pagination',
			clickable: true,
			type: 'bullets',
		},

		navigation: {
			nextEl: '.hero-button-next',
			prevEl: '.hero-button-prev',
		},

		scrollbar: {
			el: '.hero-scrollbar',
		},
	});

	var serviceSwipers = [];

	data.services.services.forEach((service) => {
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

	data.products.products.forEach((product) => {
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
