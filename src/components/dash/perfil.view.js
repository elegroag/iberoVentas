import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

const ViewPerfil = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_perfil").innerHTML);
		$(this.$el).html(template());
		return this;
	},
	events: {
		"click #btnEnviar": "sendAction",
		"click #btnRegistrar": "signupAction",
		"click #btnRecuperar": "recoveryUser",
		"click #btnCambioClave": "cambioClave"
	},
	sendAction: function (e) {
		e.preventDefault();
		console.log("OK");
	},
	signupAction: function (e) {
		e.preventDefault();
		console.log("signup");
		this.model.router.navigate("signup", { trigger: true });
		this.remove();
	},
	recoveryUser: function (e) {
		e.preventDefault();
		console.log("recoveryuser");
		this.model.router.navigate("recoveryuser", { trigger: true });
		this.remove();
	},
	cambioClave: function (e) {
		e.preventDefault();
		console.log("changepass");
		this.model.router.navigate("changepass", { trigger: true });
		this.remove();
	}
});

export default ViewPerfil;
