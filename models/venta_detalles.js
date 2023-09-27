const mongoose = require("mongoose");
const { Schema } = mongoose;

const VentaSchema = new Schema({
	venta_id: Number,
	product_id: Number,
	cantidad: { type: Number },
	subtotal: { type: Number }
});

module.exports = mongoose.model("venta_detalles", VentaSchema);
