var express = require("express");
var router = express.Router();
const Cliente = require("./cliente");

router.get("/all", async function (req, res, next) {
	const _clientes = await Cliente.find();
	res.status(201).json({
		success: true,
		collection: _clientes
	});
});

router.get("/:cliente", async function (req, res, next) {
	const entity = await Cliente.findById(req.params.cliente);
	res.status(200).json({
		success: true,
		entity: entity
	});
});

module.exports = router;
