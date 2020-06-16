var handleMobileMenuClick = () => {
	var header = document.getElementsByTagName('HEADER')[0];
	var body = document.getElementsByTagName('BODY')[0];
	header.classList.toggle('open');
	body.classList.toggle('fixed');
};
var button = document.getElementsByClassName('navigation-container')[0];
button.addEventListener('click', handleMobileMenuClick);
