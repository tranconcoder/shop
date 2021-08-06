General.prototype.createToastMessage = (
	name,
	content,
	style = "message",
	inputLabelSelectorCSS
) => {
	const toastMessageList = $(".toast-message__list");

	// ITEM ELEMENT
	// Setup item
	const toastMessageItemElement = document.createElement("li");
	// class
	toastMessageItemElement.classList.add(style);
	toastMessageItemElement.classList.add(name);
	toastMessageItemElement.classList.add("toast-message__list__item");
	// inner
	toastMessageItemElement.innerHTML = `
	<div class="toast-message__list__item__icon"></div>
      <div class="toast-message__list__item__message">
          <div class="toast-message__list__item__message__content">
            ${content}
          </div>
      </div>
      <div class="toast-message__list__item__action">
          <button class="toast-message__list__item__action__cancel-btn"></button>
      </div>
      <div class="toast-message__list__item__seperate-bar"></div>`;

	// append item to list
	toastMessageList.appendChild(toastMessageItemElement);

	// CANCEL BUTTON
	const cancelBtn = toastMessageItemElement.querySelector(
		".toast-message__list__item__action__cancel-btn"
	);

	// close
	cancelBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		cancel();
	});

	// focus to label tag if exist
	if (inputLabelSelectorCSS) {
		toastMessageItemElement.addEventListener("click", (e) => {
			$(inputLabelSelectorCSS).focus();
			cancel();
		});
	}

	// set visibility of close all toast message button
	setVisibilityOfCloseAllToastMessageButton();

	// function set visibility of close all toast message button
	function setVisibilityOfCloseAllToastMessageButton(
		toastMessageCount = getCountToastMessage()
	) {
		const closeAllToastMessageBtn = $(".toast-message__close-all");

		// set visibility of close all toast message button to VISIBLE
		function visibleCloseAllToastMessagebutton() {
			const showCssStyle = {
				display: "flex",
				animation: "showCloseAllToastMessageButton ease 0.6s",
			};

			Object.assign(closeAllToastMessageBtn.style, showCssStyle);
		}

		// set visibility of close all toast message button to HIDDEN
		function hiddenCloseAllToastMessagebutton() {
			const hideCssStyle = {
				display: "none",
				animation: "hideCloseAllToastMessageButton ease 0.6s",
			};

			Object.assign(closeAllToastMessageBtn.style, hideCssStyle);
		}

		if (toastMessageCount > 1) {
			visibleCloseAllToastMessagebutton();
		} else {
			hiddenCloseAllToastMessagebutton();
		}
	}

	// close a toast message function
	async function cancel() {
		toastMessageItemElement.style.animation =
			"hideToastMessageItem ease 0.5s";

		setVisibilityOfCloseAllToastMessageButton(getCountToastMessage() - 1);
		await General.prototype.wait(500);
		toastMessageItemElement.remove();
	}

	// get count toast message items
	function getCountToastMessage() {
		const toastMessage = $$(".toast-message__list__item");
		return toastMessage?.length ? toastMessage.length : 0;
	}
};

General.prototype.cancelToastMessge = async (element) => {
	element.style.animation = "hideToastMessageItem ease 0.5s";
	await General.prototype.wait(500);
	element.remove();
};

// CLOSE ALL TOAST MESSAGES
(function closeAllToastMessage() {
	const closeAllBtn = $(".toast-message__close-all");

	// click handle function
	async function closeAllToastMessageHandle() {
		const toastMessageItems = $$(".toast-message__list__item");

		toastMessageItems.forEach(async (toastMessageItem) => {
			toastMessageItem.style.animation = "hideToastMessageItem ease 0.5s";
			await General.prototype.wait(500);
			toastMessageItem.remove();
		});

		closeAllBtn.style.animation = "hideCloseAllToastMessageButton ease 0.6s";
		await General.prototype.wait(600);
		closeAllBtn.style.display = "none";
	}

	// click event
	closeAllBtn.addEventListener("click", closeAllToastMessageHandle);
})();
