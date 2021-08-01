(function navbarProfileHandle() {
	const navbarProfile = $(".nav-bar__right-container__avatar");
	const hasNavbarProfile = navbarProfile ? true : false;

	// open/close navbar profile
	function navbarProfileToggle() {
		const profile = $(".nav-bar__right-container__avatar__profile");
		const icon = $(".nav-bar__right-container__avatar__more-icon");

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
						".nav-bar__right-container__avatar__profile__tools__my-selection"
					),
					url: "/my-products",
				},
				{
					element: $(
						".nav-bar__right-container__avatar__profile__tools__transporting"
					),
					url: "/transporting",
				},
				{
					element: $(
						".nav-bar__right-container__avatar__profile__tools__sell-products"
					),
					url: "/sell",
				},
				{
					element: $(
						".nav-bar__right-container__avatar__profile__profile-settings__change-info"
					),
					url: "/profile",
				},
				{
					element: $(
						".nav-bar__right-container__avatar__profile__profile-settings__settings"
					),
					url: "/settings",
				},
				{
					element: $(
						".nav-bar__right-container__avatar__profile__others__help"
					),
					url: "/help",
				},
				{
					element: $(
						".nav-bar__right-container__avatar__profile__others__logout"
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
