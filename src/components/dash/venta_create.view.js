import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";
import Utils from "../../lib/utils";

const ViewVentaCreate = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_venta_create").innerHTML);
		$(this.$el).html(
			template({
				cedula: window.sessionStorage.getItem("cedula"),
				avatar: window.sessionStorage.getItem("avatar")
			})
		);
		return this;
	},
	events: {
		"click #btnRegresar":"regresarAction"
	},
	regresarAction: function(e){
		e.preventDefault();
		if (window.confirm("Confirma que desea regresar a la lista de ventas") === false) {
			return false;
		} else {
			this.model.router.navigate("home/" + window.sessionStorage.getItem("cedula"), { trigger: true });
			this.remove();
		}
	}
});

export default ViewVentaCreate;
