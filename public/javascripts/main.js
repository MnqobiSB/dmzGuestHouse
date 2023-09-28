// NAVBAR OPEN CLASS TOGGLER
$(function () {
	'use strict';

	$('[data-toggle="offcanvas"]').on('click', function () {
		$('.offcanvas-collapse').toggleClass('open');
	});
});

// NAVBAR CHANGE BACKGROUND ONSCROLL
// $(function () {
// 	$(document).scroll(function () {
// 		var $nav = $('#mainNavbar');
// 		$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
// 	});
// });

// SHOW/HIDE MULTIPLE BODYTYPE CHECKBOXES
let bodyTypeExpanded = false;
const bodyTypeSelectBox = document.querySelector('.bodyTypeSelectBox');
function showBodyTypeCheckboxes () {
	const bodyTypeCheckboxes = document.getElementById('bodyTypeCheckboxes');
	if (!bodyTypeExpanded) {
		bodyTypeCheckboxes.style.display = 'block';
		bodyTypeExpanded = true;
	} else {
		bodyTypeCheckboxes.style.display = 'none';
		bodyTypeExpanded = false;
	}
}
bodyTypeSelectBox.addEventListener('click', () => {
	showBodyTypeCheckboxes();
});

// SHOW/HIDE MULTIPLE PROVINVE CHECKBOXES
let provinceExpanded = false;
const provinceSelectBox = document.querySelector('.provinceSelectBox');
function showProvinceCheckboxes () {
	const provinceCheckboxes = document.getElementById('provinceCheckboxes');
	if (!provinceExpanded) {
		provinceCheckboxes.style.display = 'block';
		provinceExpanded = true;
	} else {
		provinceCheckboxes.style.display = 'none';
		provinceExpanded = false;
	}
}
provinceSelectBox.addEventListener('click', () => {
	showProvinceCheckboxes();
});

// SHOW/HIDE MULTIPLE PROVINVE CHECKBOXES
let carStateExpanded = false;
const carStateSelectBox = document.querySelector('.carStateSelectBox');
function showCarStateCheckboxes () {
	const carStateCheckboxes = document.getElementById('carStateCheckboxes');
	if (!carStateExpanded) {
		carStateCheckboxes.style.display = 'block';
		carStateExpanded = true;
	} else {
		carStateCheckboxes.style.display = 'none';
		carStateExpanded = false;
	}
}
carStateSelectBox.addEventListener('click', () => {
	showCarStateCheckboxes();
});

// // PASSWORD VALIDATION
// let setPasswordValue;
// let confirmPasswordValue;
// const registerBtn = document.getElementById('register-submit');
// const setPassword = document.getElementById('set-password');
// const confirmPassword = document.getElementById('re-password');
// const registerValidationMessage = document.getElementById('registerValidation-message');
// function registerValidatePasswords(message, add, remove) {
// 	registerValidationMessage.textContent = message;
// 	registerValidationMessage.classList.add(add);
// 	registerValidationMessage.classList.remove(remove);
// }
// confirmPassword.addEventListener('input', e => {
// 	e.preventDefault();
// 	setPasswordValue = setPassword.value;
// 	confirmPasswordValue = confirmPassword.value;
// 	if (setPasswordValue !== confirmPasswordValue) {
// 		registerValidatePasswords('Passwords must match.', 'color-red', 'color-green');
// 		registerBtn.setAttribute('disabled', true);
// 	} else {
// 		registerValidatePasswords('Passwords match.', 'color-green', 'color-red');
// 		registerBtn.removeAttribute('disabled');
// 	}
// });
