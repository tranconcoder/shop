class Auth {
	authPage(req, res) {
		res.render("pages/authPage/auth");
	}
}

export default new Auth();
