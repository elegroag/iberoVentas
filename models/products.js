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
});

module.exports = mongoose.model("productos", ProductSchema);
