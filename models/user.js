const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

const UserSchema = new Schema({
	cedula: {
		type: Number,
		minlength: 6,
		maxlength: 16,
		required: [true, "La cedula es un valor requerido"],
		validate: {
			validator: function (value) {
				return /^[0-9]+$/.test(value);
			},
			message: "{VALUE} is not a valida la cedula."
		}
	},
	nombres: { type: String, required: true, maxlength: 60 },
	apellidos: { type: String, required: true, maxlength: 60 },
	email: { type: String, required: true, maxlength: 100 },
	celular: { type: String, required: false, maxlength: 10 },
	clave: { type: String, required: true, maxlength: 225, minlength: 5 }
});

UserSchema.static("login", async function (cedula, pwd) {
	const hash = crypto.createHash("sha256").update(String(pwd));
	const user = await this.findOne().where("cedula").equals(cedula).where("clave").equals(hash.digest("hex"));
	if (!user) throw new Error("Incorrect credentials.");
	delete user.clave;
	return user;
});

UserSchema.static("signup", async function (cedula, pwd) {
	if (pwd.length < 8) {
		throw new Error("Pwd must have more than 6 chars");
	}
	const hash = crypto.createHash("sha256").update(pwd);
	const exist = await this.findOne().where("cedula").equals(cedula);
	if (exist) throw new Error("La cedula already exists.");

	const user = this.create({
		cedula: cedula,
		clave: hash.digest("hex")
	});
	return user;
});

UserSchema.method("changePass", async function (pwd) {
	if (pwd.length < 8) {
		throw new Error("Pwd must have more than 6 chars");
	}
	const hash = crypto.createHash("sha256").update(pwd);
	this.clave = hash.digest("hex");
	return this.save();
});

module.exports = mongoose.model("users", UserSchema);
