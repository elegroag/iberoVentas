import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";
import Utils from "../../lib/utils";

const ViewVentaShow = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_venta_show").innerHTML);
		let entity = this.model.entity.toJSON();
		entity.cedula = window.sessionStorage.getItem("cedula");
		entity.avatar = window.sessionStorage.getItem("avatar");
		$(this.$el).html(
			template(entity)
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

export default ViewVentaShow;
