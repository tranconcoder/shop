import { Router } from "express";
import passportLocal from "passport-local";
import session from "express-session";
import passport from "passport";

const LocalStrategy = passportLocal.Strategy;
const router = Router();
const generalTime = new Date(Date.now());
generalTime.toLocaleTimeString("ICT");

// models
import authDB from "../../resources/model/authenticate.js";

router.use(
	session({
		secret: "mySecret",
		resave: false,
		saveUninitialized: true,
	})
);
router.use(passport.initialize());
router.use(passport.session());

passport.use(
	new LocalStrategy(function (username, password, done) {
		authDB.findOne({ username }, function (err, user) {
			if (err) {
				console.log("Error!");
				return done(err);
			}
			if (!user) {
				console.log("NO user!");
				return done(null, false);
			}
			if (!(user.password === password)) {
				console.log("Password couldn't equal!");
				return done(null, false);
			}
			authDB.findByIdAndUpdate(user._id, { lastLoginAt: generalTime });
			return done(null, user);
		});
	})
);

router.post(
	"/authenticate/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/authenticate",
	})
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	authDB.findOne({ _id: user._id }).then((user) => {
		done(null, user);
	});
});

export default router;
