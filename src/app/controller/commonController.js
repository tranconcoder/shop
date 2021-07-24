class Common {
	homePage(req, res) {
		res.render("pages/homePage/home", { navbar: true });
	}
}

export default new Common();
