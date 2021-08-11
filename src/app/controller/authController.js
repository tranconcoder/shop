const passport = require("../middleware/passport.js");
const authDB = require("../../resources/model/authenticate.js");

class Auth {
	async register(req, res, next) {
		// create account object to save on AuthDB
		const body = await req.body;
		const accountInfomation = await {
			firstName: body.firstName,
			lastName: body.lastName,
			username: body.username,
			password: body.password,
			gmail: body.gmail,
			address: body.address,
		};

		// check username [exits?]
		const usernameIsExist = await authDB.exists({
			username: body.username,
		});

		if (usernameIsExist) {
			res.send("Username is existed!");
			return;
		}

		// check all child [has value?]
		for (const objectKey in accountInfomation) {
			if (!accountInfomation[objectKey]) {
				res.send("Many info is not exist!");
				return;
			}
		}

		// create account on AuthDB
		authDB
			.create(accountInfomation)
			.then(() => {
				res.redirect("/");
			})
			.catch(() => {
				res.send("Error regsiter!");
			});
	}

	authPage(req, res) {
		res.render("pages/authPage/auth");
	}
}

module.exports = new Auth();
