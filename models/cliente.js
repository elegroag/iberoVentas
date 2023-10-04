const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClienteSchema = new Schema({
	cedula: {
		index: true,
		unique: true,
		type: Number,
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
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

ClienteSchema.static('seeders', async function(){
	const clientes = [
		{
			cedula: 1110491952,
			nombres: "Edwin Andres",
			apellidos: 'Legro Agudelo'
		},
		{
			cedula: 1110491953,
			nombres: "Alan Felipe ",
			apellidos:'Paez Herrera'
		},
		{
			cedula: 1110491954,
			nombres: "Ricardo Andres",
			apellidos:'Velez Corredor'
		}
	];

	const collection = await this.create(clientes);
	return collection;
});

module.exports = mongoose.model("Cliente", ClienteSchema);
