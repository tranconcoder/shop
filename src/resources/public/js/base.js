"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http";
const host = "localhost:3000";
const domain = `${http}://${host}`;

class General {
	wait(time) {
		// authenticate
		{
			if (!time) {
				console.error("'General.wait' method: need a 'time' parameter!");
				return;
			} else {
				if (typeof time != "number") {
					console.error(
						"'General.wait' method: the type of 'time' parameter is not 'number'!"
					);
					return;
				}
			}
		}

		// process
		return new Promise((done) => {
			setTimeout(() => {
				done();
			}, time);
		});
	}

	syntaxCheck(value, { requiredCharacter, invalidCharacter }) {
		// authenticate
		{
			// value parameter
			if (!value) {
				console.error(
					'"General.syntaxCheck" method need a value parameter!'
				);
				return;
			} else {
				if (typeof value != "string") {
					console.error(
						"'General.syntaxCheck' method: type of 'value' parameter is not 'string'!"
					);
					return;
				}
			}

			// object option parameter
			if (!requiredCharacter && !invalidCharacter) {
				console.error(
					'"General.syntaxCheck" method: need { requiredCharacter } or { invalidCharacter } parameter value!'
				);

				return;
			} else {
				if (requiredCharacter) {
					if (!Array.isArray(requiredCharacter)) {
						console.error(
							"'General.syntaxCheck' method: type of 'requiredCharacter' parameter is not 'array'!"
						);

						return;
					}
				}
				if (invalidCharacter) {
					if (!Array.isArray(invalidCharacter)) {
						console.error(
							"'General.syntaxCheck' method: type of 'invalidCharacter' parameter is not 'array'!"
						);

						return;
					}
				}
			}
		}

		// process
		{
			let result = {
				requiredCharacterError: [],
				invalidCharacterError: [],
			};

			{
				if (requiredCharacter) {
					requiredCharacter.forEach((element) => {
						if (!value.includes(element)) {
							result.requiredCharacterError.push(element);
						}
					});
				}

				if (invalidCharacter) {
					invalidCharacter.forEach((element) => {
						if (value.includes(element)) {
							result.invalidCharacterError.push(element);
						}
					});
				}
			}

			return result;
		}
	}

	onlyHasCharacter(value, validCharacter) {
		// authenticate
		{
			// value check
			if (!value) {
				console.error(
					'"General.onlyHasCharacter" method: "value" parameter is Empty!'
				);

				return;
			} else {
				if (typeof value != "string") {
					console.error(
						'"General.onlyHasCharacter" method: type of "value" parameter is not "string"!'
					);

					return;
				}
			}

			// validCharacter check
			if (!validCharacter) {
				console.error(
					'"General.onlyHasCharacter" method: "validCharacter" parameter is Empty!'
				);

				return;
			} else {
				if (typeof validCharacter != "string") {
					console.error(
						'"General.onlyHasCharacter" method: type of "validCharacter" parameter is not "string"!'
					);

					return;
				}
			}
		}

		// process
		{
			const invalidCharacter = [];
			value = value.split("");

			for (const character of value) {
				if (!validCharacter.includes(character)) {
					invalidCharacter.push(character);
				}
			}

			return invalidCharacter;
		}
	}

	lengthCheck(value, { min, max }) {
		// return 0: no error;
		// return 1: minLength error;
		// return 2: maxLength error;

		// authenticate
		{
			// value check
			if (!value) {
				console.error(
					'"General.lengthCheck" method: need "value" parameter!'
				);

				return;
			} else {
				if (typeof value != "string") {
					console.error(
						'"General.lengthCheck" method: type of "value" parameter is not "string"!'
					);

					return;
				}
			}

			// option Object check
			if (!min && !max) {
				console.error(
					'"General.lengthCheck" method: need "min" or "max" parameter!'
				);
				return;
			} else {
				if (min) {
					if (typeof min != "number") {
						console.error(
							'"General.lengthCheck" method: type of "min" parameter is not "number"!'
						);

						return;
					}
				}

				if (max) {
					if (typeof max != "number") {
						console.error(
							'"General.lengthCheck" method: type of "max" parameter is not "number"!'
						);

						return;
					}
				}
			}
		}

		// process
		{
			const valueLength = value.length;

			if (min) if (valueLength < min) return 1;
			if (max) if (valueLength > max) return 2;
			return 0;
		}
	}

	gmailCheck(mail) {
		if (!mail) {
			console.error('"General.gmailCheck" method: need "mail" parameter!');
			return;
		}

		const gmailSyntaxArray = mail.match(/@gmail.com/g);

		if (gmailSyntaxArray) {
			if (!gmailSyntaxArray.length || gmailSyntaxArray.length > 1) {
				return false;
			}

			return true;
		} else {
			return false;
		}
	}

	getLocalTime() {
		const localTime = new Date(Date.now());
		let localSecond = localTime.getSeconds();
		let localMilliSecond = localTime.getMilliseconds();
		let localMinutes = localTime.getMinutes();
		let localHours = localTime.getHours();
		let localDate = localTime.getDate();
		let localMonth = localTime.getMonth() + 1;
		let localYear = localTime.getFullYear();
		let localDayOfWeek;

		if (localTime.getDay() === 0) {
			localDayOfWeek = "CN";
		} else {
			localDayOfWeek = `T${localTime.getDay() + 1}`;
		}

		return `${localHours}:${localMinutes}:${localSecond}:${localMilliSecond} - ${localDayOfWeek} ${localDate}/${localMonth}/${localYear} GMT+7`;
	}
}
