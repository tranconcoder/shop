import { Router } from "express";
import { Strategy } from "passport-local";
import session from "express-session";
import passport from "passport";

const LocalStrategy = Strategy;
const router = Router();

// models
import auther from "../../models/auther";

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
		auther.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (!(user.password === password)) {
				return done(null, false);
			}
			auther.findByIdAndUpdate(
				user._id,
				{ lastLoginAt: Date.now() },
				(err, result) => {}
			);
			return done(null, user);
		});
	})
);

router.post(
	"/",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login-fail",
	})
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	auther.findOne({ _id: user._id }).then((user) => {
		done(null, user);
	});
});

module.exports = router;
