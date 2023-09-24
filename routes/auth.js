var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

//User model
const User = require("../models/user");

const isLogged = ({ session }, res, next) => {
	if (!session.user)
		res.status(403).json({
			status: "You are not logged in!"
		});
	else next();
};

const isNotLogged = ({ session }, res, next) => {
	if (session.user)
		res.status(403).json({
			status: "You are logged in already!"
		});
	else next();
};

/* GET login listing view. */
router.get("/login", async function (req, res, next) {
	res.render("index", { title: "Login ApiRest" });
});

router.post("/login", async function (req, res, next) {
	try {
		const { session, body } = req;
		const { cedula, clave } = body;
		const user = await User.login(cedula, clave);

		session.user = {
			_id: user._id,
			username: user.username
		};

		session.save(() => {
			res.status(200).json({ status: "Welcome!" });
		});
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

router.post("/logout", isLogged, (req, res) => {
	req.session.destroy();
	res.status(200).send({ status: "Bye bye!" });
});

router.post("/signup", async (req, res) => {
	try {
		const { session, body } = req;
		const { cedula, clave } = body;
		const user = await User.signup(cedula, clave);
		res.status(201).json({ status: "Created!" });
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

router.get("/profile", isLogged, (req, res) => {
	const { user } = req.session;
	res.status(200).json({ user });
});

router.put("/changepass", isLogged, async (req, res) => {
	try {
		const { session, body } = req;
		const { clave } = body;
		const { _id } = session.user;
		const user = await User.findOne({ _id });
		if (user) {
			await user.changePass(clave);
			res.status(200).json({ status: "Clave changed" });
		} else {
			res.status(403).json({ status: user });
		}
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

api.delete("/delete", isLogged, async (req, res) => {
	try {
		const { _id } = req.session.user;
		const user = await User.findOne({ _id });
		await user.remove();
		req.session.destroy((err) => {
			if (err) throw new Error(err);
			res.status(200).json({ status: "Deleted!" });
		});
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
});

module.exports = router;
