//
//
// show and hidden current form
//
//

function directionForm() {
	const directionInputs = $$(
		".auth__container__auth-form__direction__container input[type='radio']"
	);
	const loginForm = $(".login-form");
	const registerForm = $(".register-form");

	loginForm.style.display = "block";

	for (const input of directionInputs) {
		input.addEventListener("change", (e) => {
			if (e.target.checked) {
				if (e.target.value === "login") {
					loginForm.style.display = "block";
					registerForm.style.display = "none";
				} else {
					registerForm.style.display = "block";
					loginForm.style.display = "none";
				}
			}
		});
	}
}

directionForm();

function mouseDownPlaceHolderInput() {
	for (element of $$(".input-place-holder")) {
		element.addEventListener("mousedown", (e) => {
			e.preventDefault();
			e.target.focus();
		});
	}
}

mouseDownPlaceHolderInput();

// LOGIN
// hover others method
const facebookMethods = [
	$(".login-form__others-method__facebook"),
	$(".register-form__others-method__container__facebook"),
];
const facebookMethodLogos = [
	$(".login-form__others-method__facebook__logo"),
	$(".register-form__others-method__container__facebook__logo"),
];
const googleMethods = [
	$(".login-form__others-method__google"),
	$(".register-form__others-method__container__google"),
];
const googleMethodLogos = [
	$(".login-form__others-method__google__logo"),
	$(".register-form__others-method__container__google__logo"),
];

// facebook method
for (const index in facebookMethods) {
	facebookMethods[index].addEventListener("mouseover", (e) => {
		facebookMethodLogos[index].src =
			"/static/svg/general/facebook--original.svg";

		e.target.addEventListener("mouseout", (e) => {
			facebookMethodLogos[index].src =
				"/static/svg/general/facebook--white.svg";
		});
	});
}

// google method
for (const index in googleMethods) {
	googleMethods[index].addEventListener("mouseover", (e) => {
		googleMethodLogos[index].src = "/static/svg/general/google--original.svg";

		e.target.addEventListener("mouseout", (e) => {
			googleMethodLogos[index].src = "/static/svg/general/google--white.svg";
		});
	});
}

//
// show and hide password button
//
(function showAndHidePasswordButton() {
	const inputElements = [$("#logPassword"), $("#regPassword")];
	const showAndHideBtns = [
		$("#log-show-and-hide-password"),
		$("#reg-show-and-hide-password"),
	];
	const showAndHideBtnIcons = {
		show: "fas fa-eye",
		hide: "fas fa-eye-slash",
	};

	for (let index = 0; index < inputElements.length; index++) {
		showAndHideBtns[index].addEventListener("click", (e) => {
			const inputType = inputElements[index].getAttribute("type");

			if (inputType === "password") {
				inputElements[index].setAttribute("type", "text");
				e.target.className = showAndHideBtnIcons.hide;
			} else {
				inputElements[index].setAttribute("type", "password");
				e.target.className = showAndHideBtnIcons.show;
			}
		});
	}
})();
