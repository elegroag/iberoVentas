const mongoose = require("mongoose");
const { Schema } = mongoose;

const VentaSchema = new Schema({
    cid: {
        tye:Number,
        index: true,
        unique: true
    },
    cliente_id: Number,
    estado: Boolean,
    fecha: { type: Date, default: Date.now },
    valor: {type: Number },
    user_id: {type: Number }
});

module.exports = mongoose.model("ventas", VentaSchema);
