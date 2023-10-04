const mongoose = require("mongoose");
const { Schema } = mongoose;
const Categoria = require("./categoria");

const ProductoSchema = new Schema({
	detalle: { type: String, required: true, maxlength: 80 },
	stock: { type: Number, required: true, minlength: 0, maxlength: 12 },
	photo: { type: String, required: false, maxlength: 80 },
	categoria: { type: Schema.Types.ObjectId, ref: "categorias" },
	precio: { type: Number, required: true, minlength: 1, maxlength: 12 }
});

ProductoSchema.static("seeders", async function () {
	const products = [
		{
			detalle: "Cafe con leche",
			stock: "200",
			photo: "pro1.jpg",
			categoria: 4,
			precio: "2000"
		},
		{
			detalle: "Pan Sandwich",
			stock: "100",
			photo: "pro2.jpg",
			categoria: 5,
			precio: "3000"
		},
		{
			detalle: "Cafe Capuchino De la Casa",
			stock: "500",
			photo: "pro3.jpg",
			categoria: 4,
			precio: "8000"
		},
		{
			detalle: "Waffles De Avena",
			stock: "200",
			photo: "pro4.jpg",
			categoria: 2,
			precio: "7000"
		},
		{
			detalle: "Tamal De la Casa",
			stock: "100",
			photo: "pro5.jpg",
			categoria: 3,
			precio: "8000"
		},
		{
			detalle: "Gaseosa Cola Cola 350",
			stock: "100",
			photo: "pro6.jpg",
			categoria: 1,
			precio: "2000"
		},
		{
			detalle: "Gaseosa Manzana Postobon 350",
			stock: "100",
			photo: "pro6.jpg",
			categoria: 1,
			precio: "2000"
		}
	];

	let ai = 0;
	while (ai < products.length) {
		let producto = products[ai];
		const categoryEntity = await Categoria.findOne().where("serial").equals(producto.categoria);
		producto.categoria = categoryEntity.id;
		const entity = await this.create(producto);
		await entity.save();
		ai++;
	}
	return await this.find();
});

module.exports = mongoose.model("productos", ProductoSchema);
