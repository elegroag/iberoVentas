import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

const ViewSignup = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_signup").innerHTML);
		$(this.$el).html(template());
		return this;
	},
	events: {
		"click #btnEnviar": "sendAction",
		"click #btnLogin": "loginAction",
		"click #btnRecuperar": "recoveryUser",
		"click #btnCambioClave": "cambioClave"
	},
	sendAction: function (e) {
		e.preventDefault();
		console.log("OK");
	},
	loginAction: function (e) {
		e.preventDefault();
		console.log("signup");
		this.model.router.navigate("login", { trigger: true });
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

export default ViewSignup;
