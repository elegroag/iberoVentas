import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

const ViewRecovery = Backbone.View.extend({
	render: function () {
		let template = _.template(document.getElementById("tmp_recovery_user").innerHTML);
		$(this.$el).html(template());
		return this;
	},
	events: {
		"click #btnEnviar": "sendAction",
		"click #btnRegistrar": "signupAction",
		"click #btnCambioClave": "cambioClave",
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
	loginAction: function (e) {
		e.preventDefault();
		console.log("signup");
		this.model.router.navigate("login", { trigger: true });
		this.remove();
	},
	cambioClave: function (e) {
		e.preventDefault();
		console.log("changepass");
		this.model.router.navigate("changepass", { trigger: true });
		this.remove();
	}
});

export default ViewRecovery;
