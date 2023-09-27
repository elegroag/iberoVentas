import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";
import Utils from "../../lib/utils";

const ViewVentaEdita = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_venta_edita").innerHTML);
		$(this.$el).html(
			template({
				cedula: window.sessionStorage.getItem("cedula"),
				avatar: window.sessionStorage.getItem("avatar")
			})
		);
		return this;
	},
	events: {}
});

export default ViewVentaEdita;
