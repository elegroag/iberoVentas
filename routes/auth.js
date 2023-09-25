const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtOpt } = require("../bin/config");

//User model
const User = require("../models/user");

const isAuthToken = ({ session }, res, next) => {
	if (!session.user)
		res.status(403).json({
			status: "You are not logged in!"
		});
	else next();
};

/* GET listing view. */
router.get("/", async function (req, res, next) {
	res.render('index', { 
		locals: {
			title: 'Welcome Express!'}
		}
	);
});

router.get("/auth", async function (req, res, next) {
	res.render('index', { 
		locals: {
			title: 'Welcome Express!'}
		}
	);
});

router.post("/login", async function (req, res, next) {
	try {
		const { body } = req;
		const { cedula, clave } = body;
		// const user = await User.login(cedula, clave);
		const user = await User.findOne({ cedula: cedula, clave: clave });

		const payload = {
			cedula: user.cedula,
			mail: user.email,
			user: user.nombres + " " + user.apellidos
		};

		jwt.sign(payload, jwtOpt.secretOrKey, { expiresIn: jwtOpt.expiresIn }, (err, token) => {
			user.token = token;
			user.save();

			res.status(200).json({
				success: true,
				token: jwtOpt.type + " " + token
			});
		});
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

router.post("/logout", isAuthToken, (req, res) => {
	/* req.session.destroy();
	res.status(200).send({ status: "Bye bye!" }); */
});

router.post("/signup", async (req, res) => {
	try {
		/* const { session, body } = req;
		const { cedula, clave } = body;
		const user = await User.signup(cedula, clave);
		res.status(201).json({ status: "Created!" }); */
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

router.get("/profile", isAuthToken, (req, res) => {
	/* const { user } = req.session;
	res.status(200).json({ user }); */
});

router.put("/changepass", isAuthToken, async (req, res) => {
	try {
		/* const { session, body } = req;
		const { clave } = body;
		const { _id } = session.user;
		const user = await User.findOne({ _id });
		if (user) {
			await user.changePass(clave);
			res.status(200).json({ status: "Clave changed" });
		} else {
			res.status(403).json({ status: user });
		} */
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

router.delete("/delete", isAuthToken, async (req, res) => {
	try {
		/* const { _id } = req.session.user;
		const user = await User.findOne({ _id });
		await user.remove();
		req.session.destroy((err) => {
			if (err) throw new Error(err);
			res.status(200).json({ status: "Deleted!" });
		}); */
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

module.exports = router;
