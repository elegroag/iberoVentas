import Backbone, { $ } from "backbone";
import _ from "underscore";

const DetalleFirme = Backbone.Model.extend({
	initialize: () => {
		console.log("Model", "detalle de la venta");
	},
	idAttribute: "producto",
	defaults: {
		producto: void 0,
		cantidad: void 0,
		valor: void 0,
		nombre: void 0,
		photo: void 0
	}
});

const DetalleFirmes = Backbone.Collection.extend({
	initialize: () => {
		console.log("Collection", "detalles collection");
	},
	model: DetalleFirme
});

const VentaFirme = Backbone.Model.extend({
	initialize: () => {
		console.log("Model", "venta realizadas");
	},
	idAttribute: "venta",
	defaults: {
		venta: void 0,
		cliente: void 0,
		estado: void 0,
		fecha: void 0,
		valor: void 0,
		user: void 0,
		cliente_nombre: void 0,
		cliente_apellido: void 0,
		cliente_cedula: void 0,
		detalles: []
	}
});

const VentaFirmes = Backbone.Collection.extend({
	initialize: () => {
		console.log("Collection", "venta realizadas");
	},
	model: VentaFirme
});

export default {
	VentaFirme: VentaFirme,
	VentaFirmes: VentaFirmes,
	DetalleFirmes: DetalleFirmes,
	DetalleFirme: DetalleFirme
};
