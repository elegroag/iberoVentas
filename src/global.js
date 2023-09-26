/* Funcionalidad botones para input numerico */
function decrementValue(button) {
	const input = button.nextElementSibling;
	if (parseInt(input.value) > parseInt(input.min)) {
		input.value = parseInt(input.value) - 1;
	}
}

function incrementValue(button) {
	const input = button.previousElementSibling;
	if (input.value === "") {
		input.value = parseInt(input.min);
	} else if (parseInt(input.value) < parseInt(input.max)) {
		input.value = parseInt(input.value) + 1;
	}
}

/* Deseleccion de radio */
function capturarEstado(label) {
	var radioButton = label.querySelector('input[type="radio"]');
	var estadoAnterior = radioButton.checked;
	radioButton.setAttribute("data-anterior", estadoAnterior);
}

function toggleSeleccion(label) {
	var radioButton = label.querySelector('input[type="radio"]');
	var estadoAnterior = radioButton.getAttribute("data-anterior");
	if (estadoAnterior === "true") {
		radioButton.checked = false;
	} else {
		radioButton.checked = true;
	}
}

/* Subir archivo */
function mostrarNombreArchivo(input) {
	let fileName = input.files[0].name;
	let archivoTexto = input.parentNode.querySelector(".text");
	archivoTexto.innerText = `${fileName}`;
	let viewElement = input.parentNode.querySelector(".view");
	viewElement.classList.add("file-select");
}

function seleccionarArchivo() {
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
}

/* Desplegable */
function applyOpenStyle(selectElement) {
	if (selectElement.classList.contains("select-open")) {
		selectElement.classList.remove("select-open");
	} else {
		selectElement.classList.add("select-open");
	}
}

function removeOpenStyle(selectElement) {
	selectElement.classList.remove("select-open");
}

/* range */
function updateRange(input) {
	let minValue = parseInt(input.getAttribute("min"));
	let maxValue = parseInt(input.getAttribute("max"));
	let sliderValue = parseInt(input.value);
	let percentage = ((sliderValue - minValue) / (maxValue - minValue)) * (100 - (24 / input.offsetWidth) * 100);
	input.parentNode.parentNode.querySelector(".num-value").textContent = sliderValue;
	input.parentNode.querySelector(".thumb").style.left = `calc(${percentage}% - 12px)`;
	input.parentNode.querySelector(".progress-bar").style.width = `calc(${percentage}% + 12px)`;
}
