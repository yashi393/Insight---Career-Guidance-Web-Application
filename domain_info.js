const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');


hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = '#29323c';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});
function revealFunction(){
    window.sr = ScrollReveal({ duration:1350, distance:'250px', easing:'ease-out'});
    sr.reveal('.services', {origin:'top', reset:true});
    sr.reveal('.projects', {origin:'bottom', reset:true});
    sr.reveal('.contact', {origin:'right', reset:true});

	sr.reveal('.about', {origin:'left', reset:true});
    sr.reveal('.reveal-reset-true', {origin:'bottom', reset:true});
    sr.reveal('.reveal-rotate', {origin:'bottom', rotate:{x:1000, z:1000}, reset:true});

    sr.reveal('.reveal-bottom-reset', {origin:'bottom', reset:true})
}

window.addEventListener('load', () => {

    revealFunction();
})



