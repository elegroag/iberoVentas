const config = require("./config");
const User = require("../models/user");
const passport = require("passport");
const bearerStrategy = require("passport-http-bearer").Strategy;
const localStrategy = require("passport-local").Strategy;

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

/**
 * @method access
 * @params [cedula], [clave]
 * @return object
 */
passport.use(
	"access",
	new bearerStrategy(async (token, done) => {
		try {
			const user = await User.findOne({ token: token });
			if (!user) {
				return done(null, false, { message: "User not found" });
			}
			console.log("Token User OK");
			return done(null, user, { scope: "all", message: "Login successfull" });
		} catch (e) {
			return done(e);
		}
	})
);

/**
 * @method login
 * @params [cedula], [clave]
 * @return object
 */
passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "cedula",
			passwordField: "clave"
		},
		async (cedula, clave, done) => {
			try {
				const user = await User.findById(cedula);
				if (!user) {
					return done(null, false, { message: "User not found" });
				}

				const validate = await user.isValidPassword(clave);

				if (!validate) {
					return done(null, false, { message: "Wrong password" });
				}

				return done(null, user, { message: "Login successfull" });
			} catch (e) {
				return done(e);
			}
		}
	)
);

/**
 * @method signup
 * @params [cedula], [clave]
 * @return bool
 */
passport.use(
	"signup",
	new localStrategy(
		{
			usernameField: "cedula",
			passwordField: "clave"
		},
		async (cedula, clave, done) => {
			try {
				const user = await User.findOne({ cedula: cedula, clave: clave });
				if (user) {
					return done(null, false, { message: "User ya está registrado" });
				}
				return done(null, true);
			} catch (e) {
				done(e);
			}
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			secretOrKey: config.jwtOpt.secretOrKey,
			jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
		},
		async (token, done) => {
			try {
				console.log(token);
				return done(null, token.user);
			} catch (error) {
				console.log(error);
				done(error);
			}
		}
	)
);
