(function navbarProfileHandle() {
	const navbarProfile = $(".navbar__right-container__avatar");
	const hasNavbarProfile = navbarProfile ? true : false;

	// open/close navbar profile
	function navbarProfileToggle() {
		const profile = $(".navbar__right-container__avatar__profile");
		const icon = $(".navbar__right-container__avatar__more-icon");

		profile.classList.toggle("showed");
		icon.classList.toggle("showed");
	}

	// handle
	if (hasNavbarProfile) {
		navbarProfile.addEventListener("click", navbarProfileToggle);

		// profile button direction
		(function profileDirection() {
			const listDirection = [
				{
					element: $(
						".navbar__right-container__avatar__profile__tools__my-selection"
					),
					url: "/my-products",
				},
				{
					element: $(
						".navbar__right-container__avatar__profile__tools__transporting"
					),
					url: "/transporting",
				},
				{
					element: $(
						".navbar__right-container__avatar__profile__tools__sell-products"
					),
					url: "/sell",
				},
				{
					element: $(
						".navbar__right-container__avatar__profile__profile-settings__change-info"
					),
					url: "/profile",
				},
				{
					element: $(
						".navbar__right-container__avatar__profile__profile-settings__settings"
					),
					url: "/settings",
				},
				{
					element: $(
						".navbar__right-container__avatar__profile__others__help"
					),
					url: "/help",
				},
				{
					element: $(
						".navbar__right-container__avatar__profile__others__logout"
					),
					url: "/authenticate/logout",
				},
			];

			// create event [click]
			// function ADD EVENT for ELEMENTS
			(function createEventList() {
				listDirection.forEach((directer) => {
					// function HANDLE
					function eventClickHandle() {
						const elementTemp = document.createElement("a");
						elementTemp.href = directer.url;
						elementTemp.click();
					}

					// handle
					directer.element.addEventListener("click", eventClickHandle);
				});
			})();
		})();
	}
})();

// set style on page navbar
(function setStyleOnPage() {
	const directions = $$(".navbar__center-container__direction-list__item");

	directions.forEach((direction) => {
		if (direction.className.includes("on-page")) {
			direction.innerHTML += `
                <div class="navbar__center-container__direction-list__item__on-page-style"></div>
            `;
		}
	});
})();

// set box shadow to header when scroll
(function setBoxShadowHeader() {
	window.addEventListener("DOMContentLoaded", (e) => {
		const header = $(".header");
		console.dir(header);

		function setBoxShadowHeaderHandle(e) {
			if (e.target.scrollingElement.scrollTop) {
				header.style.boxShadow = "0 0.3rem 1rem 0.1rem rgba(0, 0, 0, 0.1)";
			} else {
				header.style.boxShadow = "";
			}
		}

		document.addEventListener("scroll", setBoxShadowHeaderHandle);
	});
})();
