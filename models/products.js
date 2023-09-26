const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    cid: {
        tye:Number,
        index: true,
        unique: true
    },
    detalle: { type: String, required: true, maxlength: 80 },
    stock: { type: Number, required: true, minlength: 0, maxlength: 12},
    photo: { type: String, required: false, maxlength: 80 },
    categoria: { type: String, required: false, maxlength: 1 },
    precio: { type: Number, required: true, minlength: 1, maxlength: 12 },
});

//categoria: S: solidos y B: Bebidas

module.exports = mongoose.model("productos", ProductSchema);
