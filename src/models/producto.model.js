import Backbone, { $ } from "backbone";
import _ from "underscore";

const Producto = Backbone.Model.extend({
	initialize: () => {
		console.log("Initialize producto");
	},
	idAttribute: "_id",
	defaults: {
		_id: void 0,
		serial: void 0,
		detalle: void 0,
		stock: void 0,
		photo: void 0,
		categoria: void 0,
		precio: void 0
	}
});

const Productos = Backbone.Collection.extend({
	initialize: () => {
		console.log("Initialize productos");
	},
	model: Producto
});

export default { Producto: Producto, Productos: Productos };
