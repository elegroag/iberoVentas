var express = require("express");
var router = express.Router();
const Cliente = require("../models/cliente");

router.get("/", async function (req, res, next) {
	const clientes = await Cliente.find();
	res.status(201).json({
		success: true,
		collection: clientes
	});
});

router.post("/crear", async function (req, res, next) {
	let collection = await Cliente.find();
	if (collection.length == 0) {
		collection = await Cliente.seeders();
	}
	res.status(201).json({
		success: true,
		collection: collection
	});
});

router.delete("/all", async function (req, res, next) {
	let collection = await Cliente.find();
	let ai = 0;
	while (ai < collection.length) {
		let cliente = collection[ai];
		await Cliente.deleteOne(cliente);
		ai++;
	}
	let collectionEmpty = await Cliente.find();
	res.status(201).json({
		success: true,
		collection: collectionEmpty
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
