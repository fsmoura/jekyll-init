;(function() {
	var menuBurger = document.querySelector('#cs-burger');
	var navBurger = document.querySelector('.navbar-burger');
	var navMenu = document.querySelector('.navbar-menu');

	menuBurger.addEventListener('click', function() {
		navBurger.classList.toggle('is-active');
		navMenu.classList.toggle('is-active');
	});
})();
