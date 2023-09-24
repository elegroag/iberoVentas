import Backbone from "backbone";
import $ from "jquery";
import _ from "underscore";

const ViewChangePass = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_change_pass").innerHTML);
		$(this.$el).html(template());
		return this;
	},
	events: {
		"click #btnEnviar": "sendAction",
		"click #btnRegistrar": "signupAction",
		"click #btnRecuperar": "recoveryUser",
		"click #btnLogin": "loginAction"
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
	loginAction: function (e) {
		e.preventDefault();
		console.log("signup");
		this.model.router.navigate("login", { trigger: true });
		this.remove();
	}
});

export default ViewChangePass;
