const express = require("express");
const router = express.Router();
const { decodeUserToken } = require("../bin/passport-auth");

const ventas = [
	{
		"cid": "1",
		"cliente_id": "1",
		"estado": "A",
		"fecha": "2023-09-22",
		"valor": "20000",
		"user_id": "1110491951",
		"venta_detalle": [
			{
				"cid": "1",
				"venta_id": "1",
				"product_id": "1",
				"photo": "pro1.jpg",
				"cantidad": "2",
				"subtotal": "4000",
				"detalle": "Cafe con leche"
			},
			{
				"cid": "2",
				"venta_id": "1",
				"product_id": "2",
				"photo": "pro2.jpg",
				"cantidad": "2",
				"subtotal": "16000",
				"detalle": "Pan Sandwich"
			}
		]
	},
	{
		"cid": "2",
		"cliente_id": "2",
		"estado": "A",
		"fecha": "2023-09-23",
		"valor": "22000",
		"user_id": "1110491951",
		"venta_detalle": [
			{
				"cid": "3",
				"venta_id": "2",
				"product_id": "",
				"photo": "pro3.jpg",
				"cantidad": "1",
				"subtotal": "8000",
				"detalle": "Cafe Capuchino De la Casa"
			},
			{
				"cid": "4",
				"venta_id": "2",
				"product_id": "",
				"photo": "pro4.jpg",
				"cantidad": "2",
				"subtotal": "14000",
				"detalle": "Waffles De Avena"
			}
		]
	},
	{
		"cid": "3",
		"cliente_id": "3",
		"estado": "A",
		"fecha": "2023-09-25",
		"valor": "10000",
		"user_id": "1110491951",
		"venta_detalle": [
			{
				"cid": "5",
				"venta_id": "3",
				"product_id": "5",
				"photo": "pro5.jpg",
				"cantidad": "1",
				"subtotal": "8000",
				"detalle": "Tamal De la Casa"
			},
			{
				"cid": "6",
				"venta_id": "3",
				"product_id": "6",
				"photo": "pro6.jpg",
				"cantidad": "1",
				"subtotal": "2000",
				"detalle": "Gaseosa Cola Cola 350"
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
