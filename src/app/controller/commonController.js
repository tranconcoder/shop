class Common {
	homePage(req, res) {
		let option = req.user
			? {
					firstName: req.user.firstName,
					lastName: req.user.lastName,
					username: req.user.username,
					gmail: req.user.gmail,
					address: req.user.address,
					passwordLength: req.user.password.length,
					avatar: req.user.hasAvatar,
					navbar: true,
			  }
			: {
					navbar: true,
			  };

		res.render("pages/homePage/home", option);
	}
}

module.exports = new Common();
