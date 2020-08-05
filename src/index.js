// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime.js";
// jQuery
import $ from "jquery";
// Slick
import 'slick-carousel/slick/slick.js';
// Pug
import './index.pug';
// Styling
import './styles/index.scss';
import './styles/slick/slick.scss';
import './styles/slick/slick-theme.scss';
// Data
import { services, products } from './data/en.json';
// Scroll lock
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// Variables
const header = document.getElementsByTagName('HEADER')[0];
const body = document.getElementsByTagName('BODY')[0];
const main = document.getElementsByTagName('MAIN')[0];
const button = document.getElementsByClassName('navigation-container')[0];
const sections = document.querySelectorAll('main > section:not(#imprint)');
const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
let currentSection = undefined;
let currentSectionLink = undefined;

const initSliders = () => {
	// Hero slider
	$(".hero-container").slick({
		dots: true,
		lazyLoad: 'progressive',
		autoplay: true,
		autoplaySpeed: 5000
	});

	// Service sliders
	services.services.forEach((service) => {
		$("#" + service.id + " .services-container").slick({
			lazyLoad: 'progressive',
			//autoplay: true,
			//autoplaySpeed: 5000
		});
	});

	// Product sliders
	products.products.forEach((product) => {
		$("#" + product.id + " .products-container").slick({
			lazyLoad: 'progressive',
			autoplay: true,
			autoplaySpeed: 5000
		});
	});
};

const changeMainPadding = () => {
	main.style.paddingTop = header.offsetHeight + 'px';
};

const handleMobileMenuClick = () => {
	header.classList.toggle('open');
	if (!desktopMediaQuery.matches)
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
				'a[href=#' + currentSection.id + ']'
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
window.addEventListener('load', initSliders);
//window.addEventListener('load', initScrollHandle);
window.addEventListener('load', changeMainPadding);
window.addEventListener('load', showHeroWrappers);
button.addEventListener('click', handleMobileMenuClick);
