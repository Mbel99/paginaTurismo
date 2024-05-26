// get elements from DOM
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input, textarea');

// declarar expresiones regulares
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10,14}$/, // 10 a 14 numeros.
	texto: /^(?!\s*$).+/ // Cualquier string que tenga al menos un caracter que no sea un espacio
};


const campos = {
	name: false,
	surname: false,
	email: false,
	phone: false
}

// Add events to all inputs
inputs.forEach( (input) => {
	input.addEventListener('keyup',validarForm);
	input.addEventListener('blur',validarForm);
});

//validar formulario
function validarForm(e) {
	switch(e.target.name) {
		case "name":
			validarCampo(expresiones.nombre, e.target, 'name');
		break;
		case "surname":
			validarCampo(expresiones.nombre, e.target, 'surname');
		break;
		case "email":
			validarCampo(expresiones.correo, e.target, 'email');
			validarEmail2();
		break;
		case "emailcheck":
			validarEmail2();
		break;
		case "phone":
			validarCampo(expresiones.telefono, e.target, 'phone');
		break;
		case "topic":
			validarCampo(expresiones.texto, e.target,'topic');
		break;
		case "message":
			validarCampo(expresiones.texto, e.target,'message');
		break;
	}
};

// validar que los imputs cumplan un formato correcto
function validarCampo(expresion, input, campo) {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo-${campo}`).classList.remove('invalido');
		document.getElementById(`grupo-${campo}`).classList.add('valido');
		document.querySelector(`#grupo-${campo} .input-error`).classList.remove('activo');
		campos[campo]= true;
	} else {
		document.getElementById(`grupo-${campo}`).classList.add('invalido');
		document.querySelector(`#grupo-${campo} .input-error`).classList.add('activo');
		campos[campo]= false;
	}
};

// validar que el email sea igual en ambos campos
function validarEmail2() {
	const inputEmail1 = document.getElementById('email');
	const inputEmail2 = document.getElementById('emailcheck');

	if (inputEmail1.value !== inputEmail2.value) {
		document.getElementById(`grupo-emailcheck`).classList.add('invalido');
		document.querySelector(`#grupo-emailcheck .input-error`).classList.add('activo');
		campos['email']= false;
	} else {
		document.getElementById(`grupo-emailcheck`).classList.remove('invalido');
		document.getElementById(`grupo-emailcheck`).classList.add('valido');
		document.querySelector(`#grupo-emailcheck .input-error`).classList.remove('activo');
		campos['email']= true;
	}
};

// set submit event for "Enviar" btn
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const captcha = document.getElementById('checkbox-captcha');

	if (campos.name && campos.surname && campos.email && campos.phone && captcha.checked) {
		formulario.reset();
		document.getElementById('form-send-message').classList.add('activo');
		setTimeout( () => {
			document.getElementById('form-send-message').classList.remove('activo');
		}, 5000)

		document.querySelectorAll('.valido').forEach((icono) => {
			icono.classList.remove('valido');
			}
		);
	} else {
		document.getElementById('form-error-message').classList.add('activo');
	}
});
