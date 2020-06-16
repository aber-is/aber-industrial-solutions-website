var changeMainPadding = () => {
	var header = document.getElementsByTagName('HEADER')[0];
	var headerHeight = header.offsetHeight;
	document.getElementsByTagName('MAIN')[0].style.paddingTop =
		headerHeight + 'px';
};
window.addEventListener('resize', changeMainPadding);
window.addEventListener('load', changeMainPadding);
