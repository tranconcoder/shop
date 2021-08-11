// set tools box item click event handle [DIRECT]
(function toolsBoxItemClickEvent() {
	const toolsBoxListContainer = $(
		".home-ctn__tools-box__tools-container__list"
	);
	const cardsOption = [
		{
			content: "TÌM SẢN PHẨM",
			image: "/static/img/homePage/tools-box.png",
			directionURL: "/products",
		},
		{
			content: "GIỎ HÀNG CỦA TUI",
			image: "/static/img/homePage/tools-box-cart.png",
			directionURL: "/empty",
		},
		{
			content: "ĐĂNG SẢN PHẨM",
			image: "/static/svg/homePage/tools-box-sell-product.svg",
			directionURL: "/empty",
		},
		{
			content: "THEO DÕI ĐƠN HÀNG",
			image: "/static/img/homePage/tools-box-transporting.png",
			directionURL: "/empty",
		},
	];

	cardsOption.forEach((cardOption) => {
		// create and setup tools box item
		const toolsBoxItem = document.createElement("li");
		toolsBoxItem.className =
			"home-ctn__tools-box__tools-container__list__item";
		toolsBoxItem.innerHTML = `
			<img src="${cardOption.image}" alt="" />
			<div>
				<h2>
					${cardOption.content}
				</h2>
				<div>
					<p>xem thêm</p>
					<img src="/static/svg/homePage/tools-box-item-arrow-right.svg" alt="" />
				</div>
			</div>`;
		toolsBoxItem.addEventListener("click", (e) => {
			window.location.href = cardOption.directionURL;
		});

		// append tools box item to tools box list
		toolsBoxListContainer.appendChild(toolsBoxItem);
	});
})();

// Set scroll handle tools box
(function setScrollHandleToolsBox() {
	// common variables
	{
		var toolsBoxContainer = $(".home-ctn__tools-box__tools-container");
		var toolsBoxList = $(".home-ctn__tools-box__tools-container__list");
		var toolsBoxPrevButton = $(".home-ctn__tools-box__prev");
		var toolsBoxNextButton = $(".home-ctn__tools-box__next");
		var toolsBoxFirstCard = $(
			".home-ctn__tools-box__tools-container__list > *"
		);
	}

	// process
	{
		const cardWidth = toolsBoxFirstCard.clientWidth;

		// scroll event when hover
		{
			// function toolsBoxHoverEventHandle(e) {
			// 	console.log("mouseOvered");
			// 	// listen scroll event
			// 	function toolsBoxScrollEventHandle(e) {
			// 		console.log("scrolled");
			// 		console.log(e);
			// 	}
			// 	e.target.addEventListener("scroll", toolsBoxScrollEventHandle);
			// }
			// toolsBoxContainer.addEventListener(
			// 	"mouseover",
			// 	toolsBoxHoverEventHandle
			// );
		}

		// prev button click event
		{
			function prevMouseDownHanle(e) {
				toolsBoxContainer.scrollBy(-cardWidth - 20, 0);
			}

			toolsBoxPrevButton.addEventListener("click", prevMouseDownHanle);
		}

		// next button click event
		{
			function nextMouseDownHanle(e) {
				toolsBoxContainer.scrollBy(cardWidth + 20, 0);
			}

			toolsBoxNextButton.addEventListener("click", nextMouseDownHanle);
		}

		// set style next button when scrollX = 0
		{
			toolsBoxContainer.addEventListener("scroll", (e) => {
				if (e.target.scrollLeft === 0) {
					toolsBoxNextButton.style.backgroundColor = "#ffffff";
				} else {
					toolsBoxNextButton.style.backgroundColor = "transparent";
				}
			});
		}
	}
})();
