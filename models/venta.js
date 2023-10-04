const mongoose = require("mongoose");
const { Schema } = mongoose;
require("./cliente");
require("./user");

const VentaSchema = new Schema({
	estado: Boolean,
	fecha: { type: Date, default: Date.now },
	valor: { type: Number },
	cliente_id: { type: Schema.Types.ObjectId, ref: "clientes" },
	user_id: { type: Schema.Types.ObjectId, ref: "users" },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ventas", VentaSchema);
