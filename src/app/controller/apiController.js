const authDB = require("../../resources/model/authenticate.js");

class Api {
	register = {
		username: {
			async check(req, res, next) {
				const usernameIsExist = await authDB.exists({
					username: req.body.username,
				});

				if (usernameIsExist) {
					res.json(false);
				} else {
					res.json(true);
				}
			},
		},
	};
}

module.exports = new Api();
