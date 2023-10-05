import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";
import Utils from "../../lib/utils";

const ProductoForm = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_producto_create").innerHTML);
		$(this.$el).html();
		return this;
	},
	events: {
		"click #btnRegresar": "regresarAction"
	},
	regresarAction: function (e) {
		e.preventDefault();
		if (window.confirm("Confirma que desea regresar a la lista de ventas") === false) {
			return false;
		} else {
			this.model.router.navigate("home/" + window.sessionStorage.getItem("cedula"), { trigger: true });
			this.remove();
		}
	}
});

const ProductoTable = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_producto_table").innerHTML);
		$(this.$el).html();
		return this;
	},
	events: {
		"click #btnRegresar": "regresarAction"
	},
	regresarAction: function (e) {
		e.preventDefault();
		if (window.confirm("Confirma que desea regresar a la lista de ventas") === false) {
			return false;
		} else {
			this.model.router.navigate("home/" + window.sessionStorage.getItem("cedula"), { trigger: true });
			this.remove();
		}
	}
});

export default { ProductoForm: ProductoForm, ProductoTable: ProductoTable };
