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

const syntaxCheckOption = {
	syntaxCheck: {
		type: "ACCEPT_CHARACTER",
		acceptCharacter:
			"1234567890_.qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰ",
	},
};

// LOGIN
// username
const logUsernameOption = {
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
let logUsernameStatus = 0;

$("#logUsername").addEventListener("input", async (e) => {
	logUsernameStatus++;

	const currentStatus = logUsernameStatus;

	await General.prototype.wait(500);

	if (currentStatus === logUsernameStatus) {
		inputCheck(
			"#logUsername",
			".login-form__input-container__username-container",
			logUsernameOption
		);
	}
});

$("#logUsername").addEventListener("focusout", (e) => {
	inputCheck(
		"#logUsername",
		".login-form__input-container__username-container",
		logUsernameOption
	);
});

// password
const logPasswordOption = {
	toastMessage: {
		name: "logPasswordToastMessage",
		style: "error",
		label: "#logPassword",
	},
	message: {
		message0: "Vui lòng nhập Mật khẩu!",
	},
};
let logPasswordStatus = 0;

$("#logPassword").addEventListener("input", async (e) => {
	logPasswordStatus++;

	const currentStatus = logPasswordStatus;

	await General.prototype.wait(500);

	if (currentStatus === logPasswordStatus) {
		inputCheck("#logPassword", "#logPasswordContainer", logPasswordOption);
	}
});

$("#logPassword").addEventListener("focusout", (e) => {
	inputCheck("#logPassword", "#logPasswordContainer", logPasswordOption);
});

// Submit
$("#logSubmitBtn").addEventListener("click", async (e) => {
	e.preventDefault();

	const logUsernameCheckResult = await inputCheck(
		"#logUsername",
		"#logUsernameContainer",
		logUsernameOption
	);

	const logPasswordCheckResult = await inputCheck(
		"#logPassword",
		"#logPasswordContainer",
		logPasswordOption
	);

	if (logUsernameCheckResult && logPasswordCheckResult) {
		$(".login-form").submit();
	}
});

// REGISTER
// first name check
const regFirstNameOption = {
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
		message0: "Vui lòng nhập 'Họ'!",
		message1_2: "Mục 'Họ' phải ngắn hơn 7 ký tự!",
		message2_2: "Mục 'Họ' không thể chứa ký tự:",
	},
};
let regFirstNameStatus = 0;

$("#regFirstName").addEventListener("input", async (e) => {
	regFirstNameStatus++;

	const currentStatus = regFirstNameStatus;

	await General.prototype.wait(400);

	if (currentStatus === regFirstNameStatus) {
		inputCheck("#regFirstName", "#regFirstNameContainer", regFirstNameOption);
	}
});

$("#regFirstName").addEventListener("focusout", (e) => {
	inputCheck("#regFirstName", "#regFirstNameContainer", regFirstNameOption);
});

// last name check
const regLastNameOtion = {
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
		message0: "Vui lòng nhập 'Tên'!",
		message1_2: "Mục 'Tên' phải ngắn hơn 7 ký tự!",
		message2_2: "Mục'Tên' không thể chứa ký tự: ",
	},
};
let regLastNameStatus = 0;

$("#regLastName").addEventListener("input", async (e) => {
	regLastNameStatus++;

	const currentStatus = regLastNameStatus;

	await General.prototype.wait(500);

	if (currentStatus === regLastNameStatus) {
		inputCheck("#regLastName", "#regLastNameContainer", regLastNameOtion);
	}
});

$("#regLastName").addEventListener("focusout", (e) => {
	inputCheck("#regLastName", "#regLastNameContainer", regLastNameOtion);
});

// username check
const regUsernameOption = {
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
		message0: "Vui lòng nhập 'Tài Khoản Đăng ký'!",
		message1_1: "'Tài Khoản Đăng ký' phải từ 6 ký tự trở lên!",
		message1_2: "'Tài Khoản Đăng ký' không thể dài hơn 18 ký tự!",
		message2_2: "'Tài Khoản Đăng ký' không thể chứa ký tự:  ",
		message3: "'Tài Khoản Đăng ký' đã được sử dụng!",
	},
};
let regUsernameStatus = 0;

$("#regUsername").addEventListener("input", async (e) => {
	regUsernameStatus++;

	const currentStatus = regUsernameStatus;

	await General.prototype.wait(500);

	// will check
	if (currentStatus === regUsernameStatus) {
		regUsernameOption.fetchAPI.body = { username: e.target.value };
		inputCheck("#regUsername", "#regUsernameContainer", regUsernameOption);
	}
});

$("#regUsername").addEventListener("focusout", (e) => {
	regUsernameOption.fetchAPI.body = { username: e.target.value };
	inputCheck("#regUsername", "#regUsernameContainer", regUsernameOption);
});

// password
const regPasswordOption = {
	toastMessage: {
		style: "error",
		name: "regPasswordToastMessage",
		label: "#regPassword",
	},
	message: {
		message0: "Vui lòng nhập 'Mật Khẩu Đăng Ký'!",
		message1_1: "'Mật Khẩu Đăng Ký' phải từ 8 ký tự trở lên!",
		message1_2: "'Mật Khẩu Đăng Ký' không thể dài hơn 24 ký tự!",
		message2_2: "'Mật Khẩu Đăng Ký' không thể chứa ký tự:   ",
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
let regPasswordStatus = 0;

$("#regPassword").addEventListener("input", async (e) => {
	regPasswordStatus++;
	const currentStatus = regPasswordStatus;

	await General.prototype.wait(500);

	if (regPasswordStatus === currentStatus) {
		inputCheck("#regPassword", "#regPasswordContainer", regPasswordOption);
	}
});

$("#regPassword").addEventListener("focusout", (e) => {
	inputCheck("#regPassword", "#regPasswordContainer", regPasswordOption);
});

// gmail
const regGmailOption = {
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
		message0: "Vui lòng nhập 'Địa Chỉ Gmail'!",
		message1_1: "'Địa Chỉ Gmail' phải từ 11 ký tự trở lên!",
		message2_1: "'Địa Chỉ Gmail' không đúng định dạng!",
	},
};
let regGmailStatus = 0;

$("#regGmail").addEventListener("input", async (e) => {
	regGmailStatus++;
	const currentStatus = regGmailStatus;

	await General.prototype.wait(500);

	if (currentStatus === regGmailStatus) {
		inputCheck("#regGmail", "#regGmailContainer", regGmailOption);
	}
});

$("#regGmail").addEventListener("focusout", (e) => {
	inputCheck("#regGmail", "#regGmailContainer", regGmailOption);
});

// address
const regAddressOption = {
	toastMessage: {
		style: "error",
		name: "regAddressToastMessage",
		label: "#regAddress",
	},
	message: {
		message0: "Vui lòng điền 'Địa Chỉ Giao Hàng'!",
	},
};

// submit
$(".register-form__submit-btn").addEventListener("click", async (e) => {
	e.preventDefault();

	// fist name check result
	const regFirstNameCheckResult = await inputCheck(
		"#regFirstName",
		"#regFirstNameContainer",
		regFirstNameOption
	);
	// last name check result
	const regLastNameCheckResult = await inputCheck(
		"#regLastName",
		"#regLastNameContainer",
		regLastNameOtion
	);
	// username check result
	const regUsernameCheckResult = await inputCheck(
		"#regUsername",
		"#regUsernameContainer",
		regUsernameOption
	);
	// password check result
	const regPasswordCheckResult = await inputCheck(
		"#regPassword",
		"#regPasswordContainer",
		regPasswordOption
	);
	// gmail check result
	const regGmailCheckResult = await inputCheck(
		"#regGmail",
		"#regGmailContainer",
		regGmailOption
	);
	// address check result
	const regAddressCheckResult = await inputCheck(
		"#regAddress",
		"#regAddressContainer",
		regAddressOption
	);

	if (
		regFirstNameCheckResult &&
		regLastNameCheckResult &&
		regUsernameCheckResult &&
		regPasswordCheckResult &&
		regGmailCheckResult &&
		regAddressCheckResult
	) {
		$(".register-form").submit();
	}
});
