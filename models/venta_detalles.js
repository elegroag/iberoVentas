const mongoose = require("mongoose");
const { Schema } = mongoose;

const VentaSchema = new Schema({
    cid: {
        tye: Number,
        index: true,
        unique: true
    },
    venta_id: Number,
    product_id: Number,
    cantidad: {type: Number },
    subtotal: {type: Number }
});

module.exports = mongoose.model("venta_detalles", VentaSchema);
