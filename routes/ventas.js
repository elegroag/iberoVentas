const express = require("express");
const router = express.Router();
const { decodeUserToken } = require("../bin/passport-auth");

const ventas = [
	{
		_id: "1",
		cliente_id: "1",
		estado: "C",
		fecha: "2023-09-22",
		valor: "20000",
		user_id: "1110491951",
		cliente_name: "Edwin Andres Legro Agudelo",
		venta_detalle: [
			{
				_id: "1",
				venta_id: "1",
				product_id: "1",
				photo: "pro1.jpg",
				cantidad: "2",
				subtotal: "4000",
				detalle: "Cafe con leche"
			},
			{
				_id: "2",
				venta_id: "1",
				product_id: "2",
				photo: "pro2.jpg",
				cantidad: "2",
				subtotal: "16000",
				detalle: "Pan Sandwich"
			}
		]
	},
	{
		_id: "2",
		cliente_id: "2",
		estado: "C",
		fecha: "2023-09-23",
		valor: "22000",
		user_id: "1110491951",
		cliente_name: "Alan Felipe Paez Herrera",
		venta_detalle: [
			{
				_id: "3",
				venta_id: "2",
				product_id: "",
				photo: "pro3.jpg",
				cantidad: "1",
				subtotal: "8000",
				detalle: "Cafe Capuchino De la Casa"
			},
			{
				_id: "4",
				venta_id: "2",
				product_id: "",
				photo: "pro4.jpg",
				cantidad: "2",
				subtotal: "14000",
				detalle: "Waffles De Avena"
			}
		]
	},
	{
		_id: "3",
		cliente_id: "3",
		estado: "C",
		fecha: "2023-09-25",
		valor: "10000",
		user_id: "1110491951",
		cliente_name: "Ricardo Andres Velez Corredor",
		venta_detalle: [
			{
				_id: "5",
				venta_id: "3",
				product_id: "5",
				photo: "pro5.jpg",
				cantidad: "1",
				subtotal: "8000",
				detalle: "Tamal De la Casa"
			},
			{
				_id: "6",
				venta_id: "3",
				product_id: "6",
				photo: "pro6.jpg",
				cantidad: "1",
				subtotal: "2000",
				detalle: "Gaseosa Cola Cola 350"
			}
		]
	}
];

router.get("/all", decodeUserToken, function (req, res, next) {
	res.status(201).json({
		success: true,
		collection: ventas,
		user: req.user
	});
});

module.exports = router;
