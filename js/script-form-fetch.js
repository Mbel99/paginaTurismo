const BASEURL ='http://127.0.0.1:5000/';

// const BASEURL='https://com24187.pythonanywhere.com/'

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de contacto
 * @returns 
 */
async function saveContacto() {
  const idContacto = document.querySelector('#id-contacto').value;
  const nombre = document.querySelector('#name').value;
  const apellido = document.querySelector('#surname').value;
  const correoElectronico = document.querySelector('#email').value;
  const pais = document.querySelector('#country').value;
  const telefono = document.querySelector('#phone').value;
  const asunto = document.querySelector('#topic').value;
  const mensaje = document.querySelector('#message').value;
  const fecha = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

  // VALIDACIÓN DE FORMULARIO
  if (!nombre || !apellido || !correoElectronico || !pais || !telefono || !asunto || !mensaje) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }

  // Crea un objeto con los datos del contacto
  const contactoData = {
      nombre: nombre,
      apellido: apellido,
      correo_electronico: correoElectronico,
      pais: pais,
      telefono: telefono,
      asunto: asunto,
      mensaje: mensaje,
      fecha: fecha
  };

  let result = null;
  // Si hay un idContacto, realiza una petición PUT para actualizar el contacto existente
  if(idContacto !== ""){
    result = await fetchData(`${BASEURL}/api/contactos/${idContacto}`, 'PUT', contactoData);
  } else {
    // Si no hay idContacto, realiza una petición POST para crear un nuevo contacto
    result = await fetchData(`${BASEURL}/api/contactos/`, 'POST', contactoData);
  }
  
  const formContacto = document.querySelector('#formulario');
  formContacto.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  });
  showContactos();
}

/**
 * Función que permite crear un elemento <tr> para la tabla de contactos
 * por medio del uso de template string de JS.
 */
async function showContactos() {
  let contactos = await fetchData(BASEURL + '/api/contactos/', 'GET');
  const tableContactos = document.querySelector('#list-table-contactos tbody');
  tableContactos.innerHTML = '';
  contactos.forEach((contacto) => {
    let tr = `<tr>
                <td data-label="Nombre">${contacto.nombre}</td>
                <td data-label="Apellido">${contacto.apellido}</td>
                <td data-label="Correo Electrónico">${contacto.correo_electronico}</td>
                <td data-label="País">${contacto.pais}</td>
                <td data-label="Teléfono">${contacto.telefono}</td>
                <td data-label="Asunto">${contacto.asunto}</td>
                <td data-label="Mensaje">${contacto.mensaje}</td>
                <td data-label="Fecha">${contacto.fecha}</td>
                <td data-label="Acciones">
                    <button class="btn-cac btn-edit" onclick='updateContacto(${contacto.id})'><i class="fa fa-pencil"></i></button>
                    <button class="btn-cac btn-delete" onclick='deleteContacto(${contacto.id})'><i class="fa fa-trash"></i></button>
                </td>
              </tr>`;
    tableContactos.insertAdjacentHTML("beforeend", tr);
  });
}

  
/**
 * Función que permite eliminar un contacto del array del localstorage
 * de acuerdo al índice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteContacto(id){
  Swal.fire({
      title: "Está seguro de eliminar el contacto?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/contactos/${id}`, 'DELETE');
        showContactos();
        Swal.fire(response.message, "", "success");
      }
  });
}

/**
 * Función que permite cargar el formulario con los datos del contacto 
 * para su edición
 * @param {number} id Id del contacto que se quiere editar
 */
async function updateContacto(id){
  // Buscamos en el servidor el contacto de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/contactos/${id}`, 'GET');
  const idContacto = document.querySelector('#id-contacto');
  const nombre = document.querySelector('#name');
  const apellido = document.querySelector('#surname');
  const correoElectronico = document.querySelector('#email');
  const pais = document.querySelector('#country');
  const telefono = document.querySelector('#phone');
  const asunto = document.querySelector('#topic');
  const mensaje = document.querySelector('#message');
  
  idContacto.value = response.id;
  nombre.value = response.nombre;
  apellido.value = response.apellido;
  correoElectronico.value = response.correo_electronico;
  pais.value = response.pais;
  telefono.value = response.telefono;
  asunto.value = response.asunto;
  mensaje.value = response.mensaje;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function() {
  const btnSaveContacto = document.querySelector('.form-btn[type="submit"]');
  // ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveContacto.addEventListener('click', saveContacto);
  showContactos();
});

