import Backbone, { $ } from "backbone";
import _ from "underscore";

const VentaDetalle = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		_id: void 0,
		venta_id: void 0,
		product_id: void 0,
		cantidad: void 0,
		subtotal: void 0
	}
});

const VentaDetalleCollection = Backbone.Collection.extend({
	model: VentaDetalle
});

const Venta = Backbone.Model.extend({
	initialize: () => {
		console.log("Model", "venta realizadas");
	},
	idAttribute: "_id",
	defaults: {
		_id: void 0,
		cliente_id: void 0,
		estado: void 0,
		fecha: void 0,
		valor: void 0,
		user_id: void 0,
		venta_detalles: []
	}
});

const VentasCollection = Backbone.Collection.extend({
	initialize: () => {
		console.log("Collection", "venta realizadas");
	},
	model: Venta
});

export default {
	Venta: Venta,
	VentasCollection: VentasCollection,
	VentaDetalle: VentaDetalle,
	VentaDetalleCollection: VentaDetalleCollection
};
