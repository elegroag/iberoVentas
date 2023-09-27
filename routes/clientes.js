var express = require("express");
var router = express.Router();

const clientes = [
	{
		cid: "1",
		cedula: "1110491951",
		nombres: "Edwin Andres",
		apellidos: "Legro Agudelo"
	},
	{
		cid: "2",
		cedula: "1110491952",
		nombres: "Alan Felipe",
		apellidos: "Paez Herrera"
	},
	{
		cid: "3",
		cedula: "1110491956",
		nombres: "Ricardo Andres",
		apellidos: "Velez Corredor"
	}
];

router.get("/all", function (req, res, next) {
	res.status(201).json({
		success: true,
		collection: clientes
	});
});

module.exports = router;
