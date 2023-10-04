const mongoose = require("mongoose");
const { Schema } = mongoose;
require("./producto");

const CategoriaSchema = new Schema({
	serial: {
		index: true,
		type: Number,
		minlength: 6,
		unique: true,
		maxlength: 16,
		required: [true, "El serial es un valor requerido"]
	},
	detalle: { type: String, required: true, maxlength: 80 },
	photo: { type: String, required: false, maxlength: 80 },
	tipo: { type: String, required: true, maxlength: 1 },
	estado: { type: String, required: true, maxlength: 1 },
	productos: [{ type: Schema.Types.ObjectId, ref: "productos" }]
});

//tipo: S: solidos y B: Bebidas

CategoriaSchema.static("seeders", async function () {
	const categorias = [
		{
			serial: 1,
			detalle: "Bebidas gaseosas",
			photo: "bebida01.jpg",
			tipo: "B",
			estado: "A"
		},
		{
			serial: 2,
			detalle: "Desayunos rapidos",
			photo: "desayuno.jpg",
			tipo: "S",
			estado: "A"
		},
		{
			serial: 3,
			detalle: "Desayunos Full",
			photo: "desayuno.jpg",
			tipo: "S",
			estado: "A"
		},
		{
			serial: 4,
			detalle: "Bebidas De Cafe",
			photo: "cafe.jpg",
			tipo: "B",
			estado: "A"
		},
		{
			serial: 5,
			detalle: "Pan Caliente",
			photo: "pan.jpg",
			tipo: "S",
			estado: "A"
		},
		{
			serial: 6,
			detalle: "Bebidas Cero Azucar",
			photo: "bebida02.jpg",
			tipo: "B",
			estado: "A"
		}
	];
	const collectionCategorias = await this.create(categorias);
	return collectionCategorias;
});

module.exports = mongoose.model("categorias", CategoriaSchema);
