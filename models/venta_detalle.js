const mongoose = require("mongoose");
const { Schema } = mongoose;
require("./producto");
require("./venta");

const VentaDetalleSchema = new Schema({
	venta_id: { type: Schema.Types.ObjectId, ref: "ventas" },
	producto_id: { type: Schema.Types.ObjectId, ref: "productos" },
	cantidad: { type: Number },
	subtotal: { type: Number }
});

module.exports = mongoose.model("venta_detalles", VentaDetalleSchema);
