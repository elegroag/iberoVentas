import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";
import Utils from "../../lib/utils";

const ViewHome = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_home").innerHTML);
		$(this.$el).html(
			template({
				cedula: window.sessionStorage.getItem("cedula"),
				username: window.sessionStorage.getItem("username"),
				email: window.sessionStorage.getItem("email"),
				avatar: window.sessionStorage.getItem("avatar")
			})
		);
		return this;
	},
	events: {
		"click #btnClose": "closeAction",
		"click #btnPerfil": "perfilAction"
	},
	closeAction: function (e) {
		e.preventDefault();
		if (window.confirm("Confirma que desea cerrar la sesión del usuario") === false) {
			return false;
		} else {
			window.sessionStorage.setItem("token", null);
			window.sessionStorage.setItem("cedula", null);
			window.sessionStorage.setItem("username", null);
			window.sessionStorage.setItem("email", null);
			window.sessionStorage.setItem("avatar", null);

			this.model.router.navigate("login", { trigger: true, replace: true });
			this.remove();
		}
	},
	perfilAction: function (e) {
		e.preventDefault();
		this.model.router.navigate("perfil/" + window.sessionStorage.getItem("cedula"), { trigger: true });
		this.remove();
	}
}, {
	buscarListaVentas: (token,  callback = void 0) => {
		Backbone.ajax({
			type: "GET",
			url: Utils.getUrl("ventas/all"),
			dataType: "JSON",
			beforeSend: (xhr) => {
				xhr.setRequestHeader("Authentication", token);
			}
		})
		.done((res) => {
			if (res.success == true) {
				callback(res.collection);
			}
		})
		.fail((err) => {
			let error;
			if (err.status == 0) {
				error = err.statusText + ", no hay respuesta del servidor.";
			} else {
				error = err.responseText;
			}
			alert("Error, detectado en el servidor \n" + error);
			callback(null)
		});
	}
});

export default ViewHome;
