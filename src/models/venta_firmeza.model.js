import Backbone, { $ } from "backbone";
import _ from "underscore";

const VentaFirme = Backbone.Model.extend({
	initialize: () => {
		console.log("Model", "venta realizadas");
	},
	idAttribute: "_id",
	defaults: {
		_id: void 0,
		cliente: void 0,
		estado: void 0,
		fecha: void 0,
		valor: void 0,
		user: void 0,
		cliente_name: void 0,
		detalles: []
	}
});

const VentaFirmes = Backbone.Collection.extend({
	initialize: () => {
		console.log("Collection", "venta realizadas");
	},
	model: VentaFirme
});

export default { VentaFirme: VentaFirme, VentaFirmes: VentaFirmes };
