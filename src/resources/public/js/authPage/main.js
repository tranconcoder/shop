// FUNCTION INPUT CHECK
async function inputCheck(
	inputSelector,
	inputContainerSelector,
	option = {
		toastMessage: { name, style, label },
		lengthCheck: { min, max },
		syntaxCheck: { type, acceptCharacter, validCharacter, invalidCharacter },
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

		// remove old toast message
		if (toastMessageItem) {
			toastMessageItem.remove();
		}

		// create new toast message
		General.createToastMessage(
			option.toastMessage.name,
			message,
			option.toastMessage.style,
			option.toastMessage.label
		);
	}

	// empty check
	if (!inputValue) {
		fail(option.message.message0);
		return;
	}

	// length check
	if (option.lengthCheck) {
		const lengthCheckResult = await General.lengthCheck(inputValue, {
			min: option.lengthCheck.min,
			max: option.lengthCheck.max,
		});

		if (lengthCheckResult === 1) {
			fail(option.message.message1_1);
			return;
		}

		if (lengthCheckResult === 2) {
			fail(option.message.message1_2);
			return;
		}
	}

	// syntax check
	if (option.syntaxCheck) {
		if (option.syntaxCheck.type === "GMAIL") {
			const gmailCheckResult = await General.gmailCheck(inputValue);

			if (!gmailCheckResult) {
				fail(option.message.message2_1);

				return;
			}
		}

		if (option.syntaxCheck.type === "ACCEPT_CHARACTER") {
			const invalidCharacterArr = await General.onlyHasCharacter(
				inputValue,
				option.syntaxCheck.acceptCharacter
			);

			if (invalidCharacterArr.length > 0) {
				fail(
					`${option.message.message2_2} ${invalidCharacterArr.join(" ")} `
				);

				return;
			}
		}
	}

	if (option.fetchAPI) {
		const api = option.fetchAPI.api;
		const body = option.fetchAPI.body;
		let failApi = false;

		await fetch(api, {
			method: option.fetchAPI.method,
			body: body ? body : "",
		})
			.then((response) => response.json())
			.then((result) => {
				if (result) {
					option.fetchAPI.successCallback();
				} else {
					failApi = true;
					option.fetchAPI.failCallback();
				}
			});

		if (failApi) {
			fail();
			return;
		}
	}

	// no error action
	{
		inputContainer.classList.remove("fail");
		if (toastMessageItem) {
			General.cancelToastMessge(toastMessageItem);
		}
	}
}

// first name check
const regFirstNameInput = $("#regFirstName");
regFirstNameInput.addEventListener("click", (e) => {
	const inputSelector = "#regFirstName";
	const inputContainerSelector =
		".register-form__input-container__name__first-name-container";
	const option = {
		toastMessage: {
			name: "toastMessageRegFirstName",
			style: "warning",
			label: $("#regFirstName"),
		},
		lengthCheck: {
			min: 1,
			max: 7,
		},
		syntaxCheck: {
			type: "ACCEPT_CHARACTER",
			acceptCharacter:
				"1234567890_.qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰ",
		},
		message: {
			message0: 'Vui lòng nhập trường "Họ"!',
			message1_2: 'Trường "Họ" phải ngắn hơn 8 ký tự!',
			message2_2: 'Trường "Họ" không thể chứa ký tự:',
		},
	};

	e.target.addEventListener("input", (e) => {
		inputCheck(inputSelector, inputContainerSelector, option);
	});

	e.target.addEventListener("focusout", (e) => {
		inputCheck(inputSelector, inputContainerSelector, option);
	});
});

// last name check
const regLastNameInput = $("#regLastName");
regLastNameInput.addEventListener("click", (e) => {
	const inputSelector = "#regLastName";
	const inputContainerSelector =
		".register-form__input-container__name__last-name-container";
	const option = {
		toastMessage: {
			name: "toastMessageRegLastName",
			style: "warning",
			label: $("#regFirstName"),
		},
		lengthCheck: {
			min: 1,
			max: 7,
		},
		syntaxCheck: {
			type: "ACCEPT_CHARACTER",
			acceptCharacter:
				"1234567890_.qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬĐÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰ",
		},
		message: {
			message0: 'Vui lòng nhập trường "Tên"!',
			message1_2: 'Trường "Tên" phải ngắn hơn 8 ký tự!',
			message2_2: 'Trường "Tên" không thể chứa ký tự: ',
		},
	};

	e.target.addEventListener("input", (e) => {
		inputCheck(inputSelector, inputContainerSelector, option);
	});

	e.target.addEventListener("focusout", (e) => {
		inputCheck(inputSelector, inputContainerSelector, option);
	});
});
