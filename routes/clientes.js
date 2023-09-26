var express = require('express');
var router = express.Router();

const clientes = [
    {
        "cid": "1",
        "cedula": "1110491951",
        "nombres": "edwin andres",
        "apellidos":"legro agudelo"
    },
    {
        "cid": "2",
        "cedula": "1110491952",
        "nombres": "alan felipe",
        "apellidos":"paez herrera"
    },
    {
        "cid": "3",
        "cedula": "1110491956",
        "nombres": "ricardo andres",
        "apellidos":"velez corredor"
    }
];

router.get('/all', function(req, res, next){
    res.status(201).json({
		success: true,
		collection: clientes
	});
});

module.exports = router;