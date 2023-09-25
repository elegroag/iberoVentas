const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClienteSchema = new Schema({
    cid: {
        tye:Number,
        index: true,
        unique: true
    },
    cedula:{
        type: Number,
		unique: true,
		minlength: 6,
		maxlength: 16,
		required: [true, "La cedula es un valor requerido"],
		validate: {
			validator: function (value) {
				return /^[0-9]+$/.test(value);
			},
			message: "{VALUE} is not a valida la cedula."
		}
    },
    nombres: { type: String, required: true, maxlength: 60 },
	apellidos: { type: String, required: true, maxlength: 60 },
});

module.exports = mongoose.model("clientes", ClienteSchema);
