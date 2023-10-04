const express = require("express");
const router = express.Router();
const { decodeUserToken } = require("../bin/passport-auth");
const Venta = require("../models/venta");
const VentaDetalle = require("../models/venta_detalle");
const VentaSeeder = require("../seeders/venta_seeder");
const VentaDetalleSeeder = require("../seeders/venta_detalle_seeder");

//middleware decodeUserToken
router.get("/", async function (req, res, next) {
	let ventas = await Venta.find();
	let ai = 0;
	while (ai < ventas.length) {
		let venta = ventas[ai];
		const venta_detalles = await VentaDetalle.find().where('venta').equals(venta._id).populate('producto');
		venta.venta_detalles = venta_detalles;
		ventas[ai] = venta; 
        ai++;
    }

	res.status(201).json({
		success: true,
		collection: ventas
	});
});

router.post("/crear", async function (req, res, next) {
	let collection = await Venta.find();
	if (collection.length == 0) {
		collection = await VentaSeeder.Seeder();
	}
	res.status(201).json({
		success: true,
		collection: collection
	});
});


router.delete("/all", async function (req, res, next) {
	let collection = await Venta.find();
	let ai = 0;
	while (ai < collection.length) {
		let venta = collection[ai];
		await venta.deleteOne();
		ai++;
	}
	let collectionEmpty = await Venta.find();
	res.status(201).json({
		success: true,
		collection: collectionEmpty
	});
});


router.post("/detalles", async function (req, res, next) {
	let collection = await VentaDetalle.find();
	if (collection.length == 0) {
		collection = await VentaDetalleSeeder.Seeder();
	}
	res.status(201).json({
		success: true,
		collection: collection
	});
});

router.get("/detalles", async function (req, res, next) {
	let collection = await VentaDetalle.find();
	res.status(201).json({
		success: true,
		collection: collection
	});
});

router.delete("/detalles", async function (req, res, next) {
	let collection = await VentaDetalle.find();
	let ai = 0;
	while (ai < collection.length) {
		let ventaDetalle = collection[ai];
		await VentaDetalle.deleteOne(ventaDetalle);
		ai++;
	}
	let collectionEmpty = await VentaDetalle.find();
	res.status(201).json({
		success: true,
		collection: collectionEmpty
	});
});

module.exports = router;
