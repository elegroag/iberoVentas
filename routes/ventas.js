const express = require("express");
const router = express.Router();
const { decodeUserToken } = require("../bin/passport-auth");
const Venta = require("../models/venta");
const User = require("../models/user");
const Cliente = require("../models/cliente");
const VentaDetalle = require("../models/venta_detalle");
const VentaSeeder = require("../seeders/venta_seeder");
const VentaDetalleSeeder = require("../seeders/venta_detalle_seeder");
const { mongoose } = require("mongoose");
const cliente = require("../models/cliente");

//middleware decodeUserToken
router.get("/all", async function (req, res, next) {
	let ventas = await Venta.find().populate("cliente").populate("user");
	let ai = 0;
	while (ai < ventas.length) {
		let venta = ventas[ai];
		const detalles = await VentaDetalle.find().where("venta").equals(venta._id).populate("producto");
		venta.detalles = detalles;
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

router.post("/create", async function (req, res, next) {
	try {
		const { estado, fecha, valor, user, cliente, detalles } = req.body;
		const last = await Venta.find().sort({ serial: -1 }).limit(1);
		const userEntity = await User.findOne().where("cedula").equals(user);
		const clienteEntity = await Cliente.findOne().where("cedula").equals(cliente);

		const entity = new Venta({
			_id: new mongoose.Types.ObjectId(),
			serial: last[0].serial + 1,
			estado: estado,
			fecha: fecha,
			valor: valor,
			user: userEntity._id,
			cliente: clienteEntity._id
		});

		await entity.save();

		let collection = [];
		let ai = 0;
		while (ai < detalles.length) {
			let ventaDetalle = detalles[ai];
			ventaDetalle.venta = entity._id;
			const entityDetalle = new VentaDetalle(ventaDetalle);
			await entityDetalle.save();
			collection.push(entityDetalle);
			ai++;
		}

		entity.detalles = collection;
		res.status(201).json({
			success: true,
			entity: entity
		});
	} catch (error) {
		res.status(304).json({
			success: false,
			message: error
		});
	}
});

router.post("/api_create", async function (req, res, next) {
	try {
		const { estado, fecha, valor, user, cliente_nombre, cliente_apellido, cliente_cedula, detalles } = req.body;
		const last = await Venta.find().sort({ serial: -1 }).limit(1);
		const userEntity = await User.findOne().where("cedula").equals(user);
		let clienteEntity = await Cliente.findOne().where("cedula").equals(cliente_cedula);

		if (clienteEntity == null) {
			clienteEntity = new Cliente({
				_id: new mongoose.Types.ObjectId(),
				cedula: cliente_cedula,
				nombres: cliente_nombre,
				apellidos: cliente_apellido
			});
			await clienteEntity.save();
		}

		const entity = new Venta({
			_id: new mongoose.Types.ObjectId(),
			serial: last[0].serial + 1,
			estado: estado,
			fecha: fecha,
			valor: valor,
			user: userEntity._id,
			cliente: clienteEntity._id
		});

		await entity.save();

		let collection = [];
		for (const ventaDetalle in detalles) {
			const entityDetalle = new VentaDetalle({
				venta: entity._id,
				producto: ventaDetalle.producto,
				cantidad: ventaDetalle.cantidad,
				subtotal: ventaDetalle.valor
			});
			await entityDetalle.save();
			collection.push(entityDetalle);
		}

		entity.detalles = collection;
		res.status(201).json({
			success: true,
			entity: entity
		});
	} catch (error) {
		console.log(error);
		res.status(304).json({
			success: false,
			message: error
		});
	}
});

router.put("/up/:id", async function (req, res, next) {
	try {
		const { estado, fecha, valor, user, cliente, detalles } = req.body;
		const _id = req.params.id;

		const userEntity = await User.findOne().where("cedula").equals(user);
		const clienteEntity = await Cliente.findOne().where("cedula").equals(cliente);

		const entity = await Venta.findById(_id);
		entity.estado = estado;
		entity.fecha = fecha;
		entity.valor = valor;
		entity.user = userEntity._id;
		entity.cliente = clienteEntity._id;

		await entity.save();

		let collection = [];
		let ai = 0;
		while (ai < detalles.length) {
			let ventaDetalle = detalles[ai];

			let entityDetalle = null;
			if (ventaDetalle._id === null) {
				ventaDetalle.venta = entity._id;
				entityDetalle = new VentaDetalle(ventaDetalle);
				await entityDetalle.save();
			} else {
				const entityDetalle = await VentaDetalle.findById(ventaDetalle._id);
				entityDetalle.producto = ventaDetalle.producto;
				entityDetalle.cantidad = ventaDetalle.cantidad;
				entityDetalle.subtotal = ventaDetalle.subtotal;
				await entityDetalle.save();
			}
			collection.push(entityDetalle);
			ai++;
		}

		entity.detalles = collection;
		res.status(201).json({
			success: true,
			entity: entity
		});
	} catch (error) {
		res.status(304).json({
			success: false,
			message: error
		});
	}
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
