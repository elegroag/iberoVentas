var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

//User model
const User = require('../models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const collectionUsers = await User.find();
  res.json({
    status: 200,
    data: collectionUsers
  });
});

router.get('/:cedula', async function(req, res, next) {
  const entity = await User.findById(req.params.cedula);
  res.json({
    status: 200,
    entity: entity
  });
});

router.post('/', async function(req, res, next){
  const { cedula, nombres, apellidos, email, celular, clave } = req.body;
  const user = new User({ cedula, nombres, apellidos, celular, email, clave});
  const entity = await user.save();

  res.json({
    status: 201,
    data: entity
  });
});

router.put('/:cedula', async function(req, res, next){
  const { cedula, nombres, apellidos, email, celular, clave } = req.body;
  const data = {
    cedula, nombres, apellidos, email, celular, clave
  };
  const out = await User.findByIdAndUpdate(req.params.cedula, data); 
  res.json({
    status: 201,
    data: out
  });
});

router.delete('/:cedula', async function(req, res, next){
  const out = await User.findByIdAndRemove(req.params.cedula); 
  res.json({
    status: 201,
    data: out
  });
});

module.exports = router;