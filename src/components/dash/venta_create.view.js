import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";
import Utils from "../../lib/utils";
import NesteTab from "../../lib/nestedTab";


const VentaCreate = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_venta_create").innerHTML);
		$(this.$el).html(
			template({
				cedula: window.sessionStorage.getItem("cedula"),
				avatar: window.sessionStorage.getItem("avatar")
			})
		);
		return this;
	}	
});

const ViewVentaCreate = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_tabs_content").innerHTML);
		const tabs = [
			{ current: "tab1", name: "categoria", label: "Categorias", disabled : false},
			{ current: "tab2", name: "productos", label: "Productos", disabled : false },
			{ current: "tab3", name: "pedido", label: "Orden De Venta", disabled : true }
		];
		$(this.$el).html(
			template({
				title: 'Crear Venta',
				cedula: window.sessionStorage.getItem("cedula"),
				avatar: window.sessionStorage.getItem("avatar"),
				tabs: tabs
			})
		);
		NesteTab("ul.tabs", "active", '#tab1');

		new VentaCreate({el:"#tab3", model: this.model}).render().el;
		return this;
	},
	events: {
		"click a[toggle-event='tab']": "navegaAction",
		"click #btnRegresar":"regresarAction"
	},
	navegaAction: function(e){
		e.preventDefault();
		const route = $(e.currentTarget).attr("data-name");

		console.log(route);
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
