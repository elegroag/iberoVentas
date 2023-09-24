import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

import ViewLogin from "./components/auth/login.view";
import ViewSignup from "./components/auth/signup.view";
import ViewChangepass from "./components/auth/changepass.view";
import ViewRecoveryUser from "./components/auth/recovery_user.view";
import ViewHome from "./components/dash/home.view";
import ViewPerfil from "./components/dash/perfil.view";

var Workspace = Backbone.Router.extend(
	{
		initialize: () => {
			Workspace.createContainer();
		},
		routes: {
			login: "login",
			signup: "signup",
			changepass: "changepass",
			recoveryuser: "recoveryUser",
			home: "home",
			"perfil/:cedula": "perfil", // #search/kiwis
			"search/:query/p:page": "search" // #search/kiwis/p7
		},

		login: () => {
			Workspace.createContainer();
			let model = { router: Workspace.router };
			let views = new ViewLogin({ el: "#contentApp", model: model });
			Workspace.ViewActive = views.render().el;
			Workspace.posRenderForm();
		},
		signup: () => {
			Workspace.createContainer();
			let model = { router: Workspace.router };
			let view = new ViewSignup({ el: "#contentApp", model: model });
			Workspace.ViewActive = view.render().el;
			Workspace.posRenderForm();
		},
		changepass: () => {
			Workspace.createContainer();
			let model = { router: Workspace.router };
			let view = new ViewChangepass({ el: "#contentApp", model: model });
			Workspace.ViewActive = view.render().el;
			Workspace.posRenderForm();
		},
		recoveryUser: () => {
			Workspace.createContainer();
			let model = { router: Workspace.router };
			let view = new ViewRecoveryUser({ el: "#contentApp", model: model });
			Workspace.ViewActive = view.render().el;
			Workspace.posRenderForm();
		},
		perfil: () => {
			Workspace.createContainer();
			let model = { router: Workspace.router };
			let view = new ViewPerfil({ el: "#contentApp", model: model });
			Workspace.ViewActive = view.render().el;
			Workspace.posRenderForm();
		},
		home: () => {
			Workspace.createContainer();
			let model = { router: Workspace.router };
			let view = new ViewHome({ el: "#contentApp", model: model });
			Workspace.ViewActive = view.render().el;
			Workspace.posRenderForm();
		},
		search: (query, page) => {
			document.getElementById("app").innerHTML = "<h1>Search Option</h1>";
		}
	},
	{
		router: void 0,
		ViewActive: void 0,
		createContainer: () => {
			if (Workspace.ViewActive !== void 0) Workspace.ViewActive.remove();
			const el = document.createElement("div");
			el.setAttribute("id", "contentApp");
			el.setAttribute("class", "contentApp");
			document.getElementById("app").appendChild(el);
		},
		posRenderForm: () => {
			/* Posicion nombre de seccion */
			document.querySelectorAll(".writing :is(input, textarea)").forEach((writinginput) => {
				writinginput.addEventListener("input", () => {
					if (writinginput.value.trim() !== "") {
						writinginput.classList.add("has-text");
					} else {
						writinginput.classList.remove("has-text");
					}
				});
			});

			/* Alto de textarea */
			document.querySelectorAll(".textarea textarea").forEach((textarea) => {
				textarea.addEventListener("input", () => {
					textarea.style.height = "1em";
					const scrollHeight = textarea.scrollHeight;
					textarea.style.height = `${scrollHeight}px`;
				});
			});
		}
	}
);

export default Workspace;
