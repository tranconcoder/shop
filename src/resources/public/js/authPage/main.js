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
	const inputValue = $(`${inputSelector}`).value;
	const inputContainer = $(`${inputContainerSelector}`);
	const toastMessageItem = $(`.${option.toastMessage.name}`);

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
		const lengthCheckResult = await General.prototype.lengthCheck(
			inputValue,
			{
				min: option.lengthCheck.min,
				max: option.lengthCheck.max,
			}
		);

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
			const gmailCheckResult = await General.prototype.gmailCheck(
				inputValue
			);

			if (!gmailCheckResult) {
				fail(option.message.message2_1);

				return false;
			}
		}

		if (option.syntaxCheck.type === "ACCEPT_CHARACTER") {
			const invalidCharacterArr = await General.prototype.onlyHasCharacter(
				inputValue,
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
					"1234567890_.qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰ",
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
				message0: "Vui lòng nhập Tài khoản!",
				message1_1: "Tài khoản phải từ 6 ký tự trở lên!",
				message1_2: "Tài khoản phải ngắn hơn 18 ký tự!",
				message2_2: "Mục Tài khoản không thể chứa ký tự:  ",
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
				message0: "Vui lòng nhập Mật khẩu!",
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
					"1234567890_.qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰ",
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
				message0: "Vui lòng nhập Họ!",
				message1_2: "Mục Họ phải ngắn hơn 7 ký tự!",
				message2_2: "Mục Họ không thể chứa ký tự:",
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
				message0: "Vui lòng nhập Tên!",
				message1_2: "Mục Tên phải ngắn hơn 7 ký tự!",
				message2_2: "MụcTên không thể chứa ký tự: ",
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
				message0: "Vui lòng nhập Tài khoản đăng ký!",
				message1_1: "Tài khoản đăng ký phải từ 6 ký tự trở lên!",
				message1_2: "Tài khoản đăng ký không thể dài hơn 18 ký tự!",
				message2_2: "Tài khoản đăng ký không thể chứa ký tự:  ",
				message3: "Tài khoản đăng ký đã được sử dụng!",
			},
		};

		var regPasswordOption = {
			toastMessage: {
				style: "error",
				name: "regPasswordToastMessage",
				label: "#regPassword",
			},
			message: {
				message0: "Vui lòng nhập Mật khẩu đăng ký!",
				message1_1: "Mật khẩu đăng ký phải từ 8 ký tự trở lên!",
				message1_2: "Mật khẩu đăng ký không thể dài hơn 24 ký tự!",
				message2_2: "Mật khẩu đăng ký không thể chứa ký tự:   ",
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
				message0: "Vui lòng nhập Địa chỉ Gmail!",
				message1_1: "Địa chỉ Gmail phải từ 11 ký tự trở lên!",
				message2_1: "Địa chỉ Gmail không đúng định dạng!",
			},
		};

		var regAddressOption = {
			toastMessage: {
				style: "error",
				name: "regAddressToastMessage",
				label: "#regAddress",
			},
			message: {
				message0: "Vui lòng nhập Địa chỉ giao hàng!",
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
