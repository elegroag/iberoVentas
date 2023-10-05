import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

import ViewLogin from "./components/auth/login.view";
import ViewSignup from "./components/auth/signup.view";
import ViewChangepass from "./components/auth/changepass.view";
import ViewRecoveryUser from "./components/auth/recovery_user.view";
import ViewHome from "./components/dash/home.view";
import ViewPerfil from "./components/dash/perfil.view";
import _vfm from "./models/venta_firmeza.model";
import Utils from "./lib/utils";
import ViewVentaCreate from "./components/dash/venta_create.view";
import ViewVentaShow from "./components/dash/venta_show.view";
import ViewVentaEdita from "./components/dash/venta_edita.view";

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
			"home/:cedula": "home",
			"perfil/:cedula": "perfil", // #search/kiwis
			"crear_venta/:cedula": "crearVenta",
			"edita_venta/:cedula/:id": "editaVenta",
			"show_venta/:cedula/:id": "showVenta",
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
		perfil: (cedula) => {
			if (_.isNull(cedula) || _.isUndefined(cedula)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			let token = window.sessionStorage.getItem("token");
			if (_.isNull(token) || _.isUndefined(token)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}

			Workspace.validaAuthToken(token, (result) => {
				if (_.isNull(result)) {
					alert("La session ha finalizado");
					Workspace.router.navigate("login", { trigger: true, replace: true });
					return null;
				} else {
					Workspace.createContainer();
					let model = { router: Workspace.router };
					let view = new ViewPerfil({ el: "#contentApp", model: model });
					Workspace.ViewActive = view.render().el;
					Workspace.posRenderForm();
				}
			});
		},
		home: (cedula) => {
			if (_.isNull(cedula) || _.isUndefined(cedula)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			let token = window.sessionStorage.getItem("token");
			if (_.isNull(token) || _.isUndefined(token)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			ViewHome.buscarListaVentas(token, (collection) => {
				if (_.isNull(collection)) {
					alert("La session ha finalizado");
					Workspace.router.navigate("login", { trigger: true, replace: true });
					return null;
				} else {
					Workspace.createContainer();
					let model = { router: Workspace.router };
					let ventas_collection = new _vfm.VentaFirmes();
					ventas_collection.add(collection, { merge: true });
					let view = new ViewHome({ el: "#contentApp", model: model, collection: ventas_collection });
					Workspace.ViewActive = view.render().el;
					Workspace.posRenderForm();
				}
			});
		},
		search: (query, page) => {
			document.getElementById("app").innerHTML = "<h1>Search Option</h1>";
		},
		crearVenta: (cedula) => {
			if (_.isNull(cedula) || _.isUndefined(cedula)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			let token = window.sessionStorage.getItem("token");
			if (_.isNull(token) || _.isUndefined(token)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			Workspace.validaAuthToken(token, (result) => {
				if (_.isNull(result)) {
					alert("La session ha finalizado");
					Workspace.router.navigate("login", { trigger: true, replace: true });
					return null;
				} else {
					Workspace.createContainer();
					let model = { router: Workspace.router };
					let view = new ViewVentaCreate({ el: "#contentApp", model: model });
					Workspace.ViewActive = view.render().el;
					Workspace.posRenderForm();
				}
			});
		},
		editaVenta: (cedula, id) => {
			if (_.isNull(cedula) || _.isUndefined(cedula) || _.isUndefined(id) || _.isNull(id)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			let token = window.sessionStorage.getItem("token");
			if (_.isNull(token) || _.isUndefined(token)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			ViewHome.buscarListaVentas(token, (collection) => {
				if (_.isNull(collection)) {
					alert("La session ha finalizado");
					Workspace.router.navigate("login", { trigger: true, replace: true });
					return null;
				} else {
					Workspace.createContainer();

					let ventas_collection = new _vfm.VentaFirmes();
					ventas_collection.add(collection, { merge: true });
					let entity = ventas_collection.get(id);
					let model = { router: Workspace.router, entity: entity };

					let view = new ViewVentaEdita({ el: "#contentApp", model: model });
					Workspace.ViewActive = view.render().el;
					Workspace.posRenderForm();
				}
			});
		},
		showVenta: (cedula, id) => {
			if (_.isNull(cedula) || _.isUndefined(cedula) || _.isUndefined(id) || _.isNull(id)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			let token = window.sessionStorage.getItem("token");
			if (_.isNull(token) || _.isUndefined(token)) {
				Workspace.router.navigate("login", { trigger: true, replace: true });
				return null;
			}
			ViewHome.buscarListaVentas(token, (collection) => {
				if (_.isNull(collection)) {
					alert("La session ha finalizado");
					Workspace.router.navigate("login", { trigger: true, replace: true });
					return null;
				} else {
					Workspace.createContainer();

					let ventas_collection = new _vfm.VentaFirmes();
					ventas_collection.add(collection, { merge: true });
					let entity = ventas_collection.get(id);
					let model = { router: Workspace.router, entity: entity };

					let view = new ViewVentaShow({ el: "#contentApp", model: model });
					Workspace.ViewActive = view.render().el;
					Workspace.posRenderForm();
				}
			});
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
			document.querySelectorAll(".writing :is(input, textarea)").forEach((writinginput) => {
				writinginput.addEventListener("input", () => {
					if (writinginput.value.trim() !== "") {
						writinginput.classList.add("has-text");
					} else {
						writinginput.classList.remove("has-text");
					}
				});
			});

			document.querySelectorAll(".textarea textarea").forEach((textarea) => {
				textarea.addEventListener("input", () => {
					textarea.style.height = "1em";
					const scrollHeight = textarea.scrollHeight;
					textarea.style.height = `${scrollHeight}px`;
				});
			});

			$("[data-toggle='decrement']").on("click", function (e) {
				e.preventDefault();
				let el = document.querySelector("[data-toggle='decrement']");
				Workspace.decrementValue(el);
			});

			$("[data-toggle='increment']").on("click", function (e) {
				e.preventDefault();
				let el = document.querySelector("[data-toggle='increment']");
				Workspace.incrementValue(el);
			});

			$("[data-toggle='toggle_seleccion1']").on("click", function (e) {
				e.preventDefault();
				let el = document.querySelector("[data-toggle='toggle_seleccion1']");
				Workspace.toggleSeleccion(el);
			});

			$("[data-toggle='toggle_seleccion2']").on("click", function (e) {
				e.preventDefault();
				let el = document.querySelector("[data-toggle='toggle_seleccion2']");
				Workspace.toggleSeleccion(el);
			});

			$("[data-toggle='toggle_seleccion2']").on("onmousedown", function (e) {
				e.preventDefault();
				let el = document.querySelector("[data-toggle='toggle_seleccion2']");
				Workspace.capturarEstado(el);
			});

			$("[data-toggle='toggle_seleccion1']").on("onmousedown", function (e) {
				e.preventDefault();
				let el = document.querySelector("[data-toggle='toggle_seleccion1']");
				Workspace.capturarEstado(el);
			});
		},
		validaAuthToken: async (token, callback = void 0) => {
			Backbone.ajax({
				type: "GET",
				url: Utils.getUrl("profile"),
				dataType: "JSON",
				beforeSend: (xhr) => {
					xhr.setRequestHeader("Authentication", token);
				}
			})
				.done((res) => {
					if (res.success == true) {
						callback(res.success);
					} else {
						Workspace.closeApp();
						callback(null);
					}
				})
				.fail((err) => {
					let error;
					if (err.status == 0) {
						error = err.statusText + ", no hay respuesta del servidor.";
					} else {
						error = err.responseText;
					}
					console.log("Error", error);
					callback(null);
				});
		},
		closeApp: () => {
			window.sessionStorage.setItem("token", null);
			window.sessionStorage.setItem("cedula", null);
			window.sessionStorage.setItem("username", null);
			window.sessionStorage.setItem("email", null);
			window.sessionStorage.setItem("avatar", null);
		},
		incrementValue: (button) => {
			const input = button.previousElementSibling;
			if (input.value === "") {
				input.value = parseInt(input.min);
			} else if (parseInt(input.value) < parseInt(input.max)) {
				input.value = parseInt(input.value) + 1;
			}
		},
		decrementValue: (button) => {
			const input = button.nextElementSibling;
			if (parseInt(input.value) > parseInt(input.min)) {
				input.value = parseInt(input.value) - 1;
			}
		},
		toggleSeleccion: (label) => {
			var radioButton = label.querySelector('input[type="radio"]');
			var estadoAnterior = radioButton.getAttribute("data-anterior");
			if (estadoAnterior === "true") {
				radioButton.checked = false;
			} else {
				radioButton.checked = true;
			}
		},
		capturarEstado: (label) => {
			var radioButton = label.querySelector('input[type="radio"]');
			var estadoAnterior = radioButton.checked;
			radioButton.setAttribute("data-anterior", estadoAnterior);
		},
		mostrarNombreArchivo: (input) => {
			let fileName = input.files[0].name;
			let archivoTexto = input.parentNode.querySelector(".text");
			archivoTexto.innerText = `${fileName}`;
			let viewElement = input.parentNode.querySelector(".view");
			viewElement.classList.add("file-select");
		},
		seleccionarArchivo: () => {
			let archivoInput = document.querySelector("#archivo");
			if (archivoInput.value) {
				archivoInput.value = null;
				let archivoTexto = archivoInput.parentNode.querySelector(".text");
				archivoTexto.innerText = "Añadir archivo";
				let viewElement = archivoInput.parentNode.querySelector(".view");
				viewElement.classList.remove("file-select");
			} else {
				archivoInput.click();
			}
		},
		applyOpenStyle: (selectElement) => {
			if (selectElement.classList.contains("select-open")) {
				selectElement.classList.remove("select-open");
			} else {
				selectElement.classList.add("select-open");
			}
		},
		removeOpenStyle: (selectElement) => {
			selectElement.classList.remove("select-open");
		},
		updateRange: (input) => {
			let minValue = parseInt(input.getAttribute("min"));
			let maxValue = parseInt(input.getAttribute("max"));
			let sliderValue = parseInt(input.value);
			let percentage = ((sliderValue - minValue) / (maxValue - minValue)) * (100 - (24 / input.offsetWidth) * 100);
			input.parentNode.parentNode.querySelector(".num-value").textContent = sliderValue;
			input.parentNode.querySelector(".thumb").style.left = `calc(${percentage}% - 12px)`;
			input.parentNode.querySelector(".progress-bar").style.width = `calc(${percentage}% + 12px)`;
		},
		nestedTabSelect: (tabsElement='ul.tabs', currentElement='active') => {
			const tabs = tabsElement ?? 'ul.tabs';
			const currentClass = currentElement ?? 'active';
			
			document.querySelectorAll(tabs).forEach(function (tabContainer) {
				let activeLink, activeContent;
				const links = Array.from(tabContainer.querySelectorAll("a"));
			
				activeLink = links.find(function (link) {
					return link.getAttribute("data-href") === location.hash;
				}) || links[0];

				activeLink.classList.add(currentClass);
			
				activeContent = document.querySelector(activeLink.getAttribute("data-href"));
				activeContent.classList.add(currentClass);
			
				links.forEach(function (link) {
					if (link !== activeLink) {
						const content = document.querySelector(link.getAttribute("data-href"));
						content.classList.remove(currentClass);
					}
				});
			
				tabContainer.addEventListener("click", function (e) {
					//valida link
					if (e.target.tagName === "A") {
						// Make the old tab inactive.
						activeLink.classList.remove(currentClass);
						activeContent.classList.remove(currentClass);
				
						// Update the variables with the new link and content.
						activeLink = e.target;
						activeContent = document.querySelector(activeLink.getAttribute("data-href"));
				
						// Make the tab active.
						activeLink.classList.add(currentClass);
						activeContent.classList.add(currentClass);
				
						e.preventDefault();
					}
				});
			});
		}
	}
);

export default Workspace;
