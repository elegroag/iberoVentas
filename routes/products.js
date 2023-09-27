var express = require('express');
var router = express.Router();

const products = [
    {
        "cid": "1",
        "detalle": "Cafe con leche",
        "stock": "200",
        "photo": "pro1.jpg",
        "categoria": "B",
        "precio": "2000"
    },
    {
        "cid": "2",
        "detalle": "Pan Sandwich",
        "stock": "100",
        "photo": "pro2.jpg",
        "categoria": "S",
        "precio": "3000"
    },
    {
        "cid": "3",
        "detalle": "Cafe Capuchino De la Casa",
        "stock": "500",
        "photo": "pro3.jpg",
        "categoria": "B",
        "precio": "8000"
    },
    {
        "cid": "4",
        "detalle": "Waffles De Avena",
        "stock": "200",
        "photo": "pro4.jpg",
        "categoria":"S",
        "precio": "7000"
    },
    {
        "cid": "5",
        "detalle": "Tamal De la Casa",
        "stock": "100",
        "photo": "pro5.jpg",
        "categoria":"S",
        "precio": "8000"
    },
    {
        "cid": "6",
        "detalle": "Gaseosa Cola Cola 350",
        "stock": "100",
        "photo": "pro6.jpg",
        "categoria":"B",
        "precio": "2000"
    },
    {
        "cid": "7",
        "detalle": "Gaseosa Manzana Postobon 350",
        "stock": "100",
        "photo": "pro6.jpg",
        "categoria":"B",
        "precio": "2000"
    },
];

router.get('/all', function(req, res, next){
    res.status(201).json({
		success: true,
		collection: products
	});
});

module.exports = router;