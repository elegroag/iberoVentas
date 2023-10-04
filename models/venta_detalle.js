const mongoose = require("mongoose");
const { Schema } = mongoose;

const VentaDetalleSchema = new Schema({
	venta: { type: Schema.Types.ObjectId, ref: "ventas" },
	producto: { type: Schema.Types.ObjectId, ref: "productos" },
	cantidad: { type: Number },
	subtotal: { type: Number }
});

module.exports = mongoose.model("venta_detalles", VentaDetalleSchema);
