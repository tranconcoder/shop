General.createToastMessage = (
	name,
	content,
	style = "message",
	inputLabelSelectorCSS
) => {
	const toastMessageList = $(".toast-message-list");

	// ITEM ELEMENT
	// Setup item
	const toastMessageItemElement = document.createElement("li");
	// class
	toastMessageItemElement.classList.add(style);
	toastMessageItemElement.classList.add(name);
	toastMessageItemElement.classList.add("toast-message-list__item");
	// inner
	toastMessageItemElement.innerHTML = `<div class="toast-message-list__item__icon"></div>
      <div class="toast-message-list__item__message">
          <div class="toast-message-list__item__message__content">
            ${content}
          </div>
      </div>
      <div class="toast-message-list__item__action">
          <button class="toast-message-list__item__action__cancel-btn"></button>
      </div>
      <div class="toast-message-list__item__seperate-bar"></div>`;

	// append item to list
	toastMessageList.appendChild(toastMessageItemElement);

	// play sound effect
	const audioElement = $(".toast-message-item-show-audio");
	audioElement.volume = 0.1;
	audioElement.currentTime = 0;
	audioElement.play();

	// CANCEL BUTTON
	const cancelBtn = toastMessageItemElement.querySelector(
		".toast-message-list__item__action__cancel-btn"
	);

	cancelBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		cancel();
	});

	if (inputLabelSelectorCSS) {
		toastMessageItemElement.addEventListener("click", (e) => {
			$(inputLabelSelectorCSS).focus();
			cancel();
		});
	}

	async function cancel() {
		toastMessageItemElement.style.animation =
			"hideToastMessageItem ease 0.5s";

		await General.wait(500);
		toastMessageItemElement.remove();
	}
};

General.cancelToastMessge = async (element) => {
	element.style.animation = "hideToastMessageItem ease 0.5s";
	await General.wait(500);
	element.remove();
};
