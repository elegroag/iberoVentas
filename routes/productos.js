var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Producto = require("../models/producto");
const ProductoSeeder = require("../seeders/producto_seeder");

router.get("/", async function (req, res, next) {
	let collection = await Producto.find();
	res.status(201).json({
		success: true,
		collection: collection
	});
});

router.post("/crear", async function (req, res, next) {
	let collection = await Producto.find();
	if (collection.length == 0) {
		collection = await ProductoSeeder.Seeder();
	}
	res.status(201).json({
		success: true,
		collection: collection
	});
});

router.delete("/all", async function (req, res, next) {
	let collection = await Producto.find();

	let ai = 0;
	while (ai < collection.length) {
		let producto = collection[ai];
		await Producto.deleteOne(producto);
		ai++;
	}
	let collectionEmpty = await Producto.find();
	res.status(201).json({
		success: true,
		collection: collectionEmpty
	});
});

module.exports = router;
