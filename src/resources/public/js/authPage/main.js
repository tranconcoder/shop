// FUNCTION INPUT CHECK
async function inputCheck(
	inputSelector,
	inputContainerSelector,
	option = {
		toastMessage: { name, style, label },
		lengthCheck: { min, max },
		syntaxCheck: { type, acceptCharacter },
		// type: GMAIL, ACCEPT_CHARACTER
		fetchAPI: {
			api,
			method,
			body,
			successCallback,
			failCallback,
		},
		message: {
			message0,
			message1_1,
			message1_2,
			message2_1,
			message2_2,
			message3,
		},
		// MESSAGE CODE
		// 0: empty error
		// 1_1: min length error
		// 1_2: max length error
		// 2_1: gmail syntax error
		// 2_2: accept character syntax error
		// 3: api fail message
	}
) {
	// general
	const inputValue = `${$(`${inputSelector}`).value}`;
	const inputContainer = $(`${inputContainerSelector}`);
	const toastMessageItem = $(`.${option.toastMessage.name}`);

	// fail handle function
	function fail(message) {
		// set fail style to input container
		inputContainer.classList.add("fail");

		if (toastMessageItem) {
			toastMessageItem.remove();
		}
		// create new toast message
		General.prototype.createToastMessage(
			option.toastMessage.name,
			message,
			option.toastMessage.style,
			option.toastMessage.label
		);
	}

	// empty check
	if (!inputValue) {
		fail(option.message.message0);
		return false;
	}

	// length check
	if (option.lengthCheck) {
		const lengthCheckResult = await inputValue.lengthCheck({
			min: option.lengthCheck.min,
			max: option.lengthCheck.max,
		});

		if (lengthCheckResult === 1) {
			fail(option.message.message1_1);
			return false;
		}

		if (lengthCheckResult === 2) {
			fail(option.message.message1_2);
			return false;
		}
	}

	// syntax check
	if (option.syntaxCheck) {
		if (option.syntaxCheck.type === "GMAIL") {
			const gmailCheckResult = await inputValue.isGmail();

			if (!gmailCheckResult) {
				fail(option.message.message2_1);

				return false;
			}
		}

		if (option.syntaxCheck.type === "ACCEPT_CHARACTER") {
			const invalidCharacterArr = await inputValue.onlyHasCharacter(
				option.syntaxCheck.acceptCharacter
			);

			if (invalidCharacterArr.length > 0) {
				fail(
					`${option.message.message2_2} ${invalidCharacterArr.join(" ")} `
				);

				return false;
			}
		}
	}

	if (option.fetchAPI) {
		const api = option.fetchAPI.api;
		const body = option.fetchAPI.body;
		let failApi = false;

		await fetch(api, {
			method: option.fetchAPI.method,
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body ? body : ""),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result) {
					option.fetchAPI.successCallback?.();
				} else {
					failApi = true;
					option.fetchAPI.failCallback?.();
				}
			});

		if (failApi) {
			fail(option.message.message3);
			return false;
		}
	}

	// no error action
	{
		inputContainer.classList.remove("fail");
		if (toastMessageItem) {
			General.prototype.cancelToastMessge(toastMessageItem);
		}

		return true;
	}
}

// LOGIN
(function checkLoginFormHandle() {
	// common variables
	{
		const syntaxCheckOption = {
			syntaxCheck: {
				type: "ACCEPT_CHARACTER",
				acceptCharacter:
					"1234567890_.qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
			},
		};

		var submitBtn = $("#logSubmitBtn");

		var logUsernameOption = {
			...syntaxCheckOption,
			toastMessage: {
				name: "toastMessageLogUsername",
				style: "error",
				label: "#logUsername",
			},
			message: {
				message0: "Vui l??ng nh???p T??i kho???n!",
				message1_1: "T??i kho???n ph???i t??? 6 k?? t??? tr??? l??n!",
				message1_2: "T??i kho???n ph???i ng???n h??n 18 k?? t???!",
				message2_2: "M???c T??i kho???n kh??ng th??? ch???a k?? t???:  ",
			},
			lengthCheck: {
				min: 6,
				max: 18,
			},
		};

		var logPasswordOption = {
			toastMessage: {
				name: "logPasswordToastMessage",
				style: "error",
				label: "#logPassword",
			},
			message: {
				message0: "Vui l??ng nh???p M???t kh???u!",
			},
		};
	}

	// handle focusout event [username]
	{
		const usernameInput = $("#logUsername");

		function checkUsernameLogHandle(e) {
			return inputCheck(
				"#logUsername",
				"#logUsernameContainer",
				logUsernameOption
			);
		}

		usernameInput.addEventListener("focusout", checkUsernameLogHandle);
	}

	// handle focusout event [password]
	{
		const passwordInput = $("#logPassword");

		function checkPasswordLogHandle(e) {
			return inputCheck(
				"#logPassword",
				"#logPasswordContainer",
				logPasswordOption
			);
		}

		passwordInput.addEventListener("focusout", checkPasswordLogHandle);
	}

	// handle click event
	{
		submitBtn.addEventListener("click", async (e) => {
			e.preventDefault();

			const loginForm = $(".login-form");
			const logUsernameCheckResult = await checkUsernameLogHandle();
			const logPasswordCheckResult = await checkPasswordLogHandle();

			if (logUsernameCheckResult && logPasswordCheckResult) {
				loginForm.submit();
			}
		});
	}
})();

// REGISTER
(function checkRegisterFormHandle() {
	// common variables
	{
		const syntaxCheckOption = {
			syntaxCheck: {
				type: "ACCEPT_CHARACTER",
				acceptCharacter:
					"1234567890_.qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
			},
		};

		var regFirstNameOption = {
			...syntaxCheckOption,
			toastMessage: {
				style: "error",
				name: "toastMessageRegFirstName",
				label: "#regFirstName",
			},
			lengthCheck: {
				max: 7,
			},
			message: {
				message0: "Vui l??ng nh???p H???!",
				message1_2: "M???c H??? ph???i ng???n h??n 7 k?? t???!",
				message2_2: "M???c H??? kh??ng th??? ch???a k?? t???:",
			},
		};

		var regLastNameOption = {
			...syntaxCheckOption,
			toastMessage: {
				style: "error",
				name: "toastMessageRegLastName",
				label: "#regLastName",
			},
			lengthCheck: {
				max: 7,
			},
			message: {
				message0: "Vui l??ng nh???p T??n!",
				message1_2: "M???c T??n ph???i ng???n h??n 7 k?? t???!",
				message2_2: "M???cT??n kh??ng th??? ch???a k?? t???: ",
			},
		};

		var regUsernameOption = {
			toastMessage: {
				style: "error",
				name: "regUsernameToastMessage",
				label: "#regUsername",
			},
			syntaxCheck: {
				type: "ACCEPT_CHARACTER",
				acceptCharacter:
					"1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
			},
			lengthCheck: {
				min: 6,
				max: 18,
			},
			fetchAPI: {
				api: `${domain}/api/register/username/check`,
				method: "OPTIONS",
			},
			message: {
				message0: "Vui l??ng nh???p T??i kho???n ????ng k??!",
				message1_1: "T??i kho???n ????ng k?? ph???i t??? 6 k?? t??? tr??? l??n!",
				message1_2: "T??i kho???n ????ng k?? kh??ng th??? d??i h??n 18 k?? t???!",
				message2_2: "T??i kho???n ????ng k?? kh??ng th??? ch???a k?? t???:  ",
				message3: "T??i kho???n ????ng k?? ???? ???????c s??? d???ng!",
			},
		};

		var regPasswordOption = {
			toastMessage: {
				style: "error",
				name: "regPasswordToastMessage",
				label: "#regPassword",
			},
			message: {
				message0: "Vui l??ng nh???p M???t kh???u ????ng k??!",
				message1_1: "M???t kh???u ????ng k?? ph???i t??? 8 k?? t??? tr??? l??n!",
				message1_2: "M???t kh???u ????ng k?? kh??ng th??? d??i h??n 24 k?? t???!",
				message2_2: "M???t kh???u ????ng k?? kh??ng th??? ch???a k?? t???:   ",
			},
			lengthCheck: {
				min: 8,
				max: 24,
			},
			syntaxCheck: {
				type: "ACCEPT_CHARACTER",
				acceptCharacter:
					"1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
			},
		};

		var regGmailOption = {
			toastMessage: {
				style: "error",
				name: "regGmailToastMessage",
				label: "#regGmail",
			},
			lengthCheck: {
				min: 11,
			},
			syntaxCheck: {
				type: "GMAIL",
			},
			message: {
				message0: "Vui l??ng nh???p ?????a ch??? Gmail!",
				message1_1: "?????a ch??? Gmail ph???i t??? 11 k?? t??? tr??? l??n!",
				message2_1: "?????a ch??? Gmail kh??ng ????ng ?????nh d???ng!",
			},
		};

		var regAddressOption = {
			toastMessage: {
				style: "error",
				name: "regAddressToastMessage",
				label: "#regAddress",
			},
			message: {
				message0: "Vui l??ng nh???p ?????a ch??? giao h??ng!",
			},
		};
	}

	// handle focusout event [first name]
	{
		const firstNameInput = $("#regFirstName");
		function regFirstNameCheckHandle(e) {
			return inputCheck(
				"#regFirstName",
				"#regFirstNameContainer",
				regFirstNameOption
			);
		}
		firstNameInput.addEventListener("focusout", regFirstNameCheckHandle);
	}

	// handle focusout event [last name]
	{
		const lastNameInput = $("#regLastName");
		function regLastNameCheckHandle(e) {
			return inputCheck(
				"#regLastName",
				"#regLastNameContainer",
				regLastNameOption
			);
		}

		lastNameInput.addEventListener("focusout", regLastNameCheckHandle);
	}

	// handle focusout event [username]
	{
		const usernameInput = $("#regUsername");
		function regUsernameCheckHandle(e) {
			// get username to check in db
			regUsernameOption.fetchAPI.body = {
				username: usernameInput.value,
			};

			return inputCheck(
				"#regUsername",
				"#regUsernameContainer",
				regUsernameOption
			);
		}

		usernameInput.addEventListener("focusout", regUsernameCheckHandle);
	}

	// handle focusout event [password]
	{
		const passwordInput = $("#regPassword");
		function regPasswordCheckHandle(e) {
			return inputCheck(
				"#regPassword",
				"#regPasswordContainer",
				regPasswordOption
			);
		}

		passwordInput.addEventListener("focusout", regPasswordCheckHandle);
	}

	// handle focusout event [gmail]
	{
		const gmailInput = $("#regGmail");
		function regGmailCheckHandle(e) {
			return inputCheck("#regGmail", "#regGmailContainer", regGmailOption);
		}

		gmailInput.addEventListener("focusout", regGmailCheckHandle);
	}

	// handle focusout event [address]
	{
		const addressInput = $("#regAddress");
		function regAddressCheckHandle(e) {
			return inputCheck(
				"#regAddress",
				"#regAddressContainer",
				regAddressOption
			);
		}

		addressInput.addEventListener("focusout", regAddressCheckHandle);
	}

	// handle submit event
	{
		const regSubmitBtn = $(".register-form__submit-btn");

		regSubmitBtn.addEventListener("click", async (e) => {
			e.preventDefault();

			const registerForm = $(".register-form");
			const regFirstNameCheckResult = await regFirstNameCheckHandle();
			const regLastNameCheckResult = await regLastNameCheckHandle();
			const regUsernameCheckResult = await regUsernameCheckHandle();
			const regPasswordCheckResult = await regPasswordCheckHandle();
			const regGmailCheckResult = await regGmailCheckHandle();
			const regAddressCheckResult = await regAddressCheckHandle();

			if (
				regFirstNameCheckResult &&
				regLastNameCheckResult &&
				regUsernameCheckResult &&
				regPasswordCheckResult &&
				regGmailCheckResult &&
				regAddressCheckResult
			) {
				registerForm.submit();
			}
		});
	}
})();
