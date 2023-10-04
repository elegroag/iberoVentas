var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Categoria = require("../models/categoria");
const CategoriaSeeder = require("../seeders/categoria_seeder");

router.get("/", async function (req, res, next) {
	let collectionCategorias = await Categoria.find();
	res.status(201).json({
		success: true,
		collection: collectionCategorias
	});
});

router.post("/crear", async function (req, res, next) {
	let collectionCategorias = await Categoria.find();
	if (collectionCategorias.length == 0) {
		collectionCategorias = await CategoriaSeeder.Seeder();
	}
	res.status(201).json({
		success: true,
		collection: collectionCategorias
	});
});

router.delete("/all", async function (req, res, next) {
	let collectionCategorias = await Categoria.find();

	await collectionCategorias.forEach(async (element) => {
		await Categoria.deleteOne(element);
	});

	let collectionEmpty = await Categoria.find();
	res.status(201).json({
		success: true,
		collection: collectionEmpty
	});
});

module.exports = router;
