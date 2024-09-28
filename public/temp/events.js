let tickets = {
  river: {
    lugar: "Estadio River Plate",
    tickets: 100,
    sku: "#FWB000",
    fecha: "2024-10-07",
    precio: 399999,
  },
  boca: {
    lugar: "Estadio Boca Juniors",
    tickets: 300,
    sku: "#FWB001",
    fecha: "2024-10-02",
    precio: 399999,
  },
  movistar: {
    lugar: "Movistar Arena",
    tickets: 1,
    sku: "#FWB002",
    fecha: "2024-10-14",
    precio: 399999,
  },
  obras: {
    lugar: "Estadio Obras Sanitarias",
    tickets: 700,
    sku: "#FWB003",
    fecha: "2024-10-11",
    precio: 399999,
  },
  rex: {
    lugar: "Teatro Gran Rex",
    tickets: 0,
    sku: "#FWB004",
    fecha: "2024-10-01",
    precio: 399999,
  },
};

// Variables globales
let nombreUsuario = "";
let edadUsuario = 0;
const eventosList = document.getElementById("eventos");
const usuarioDialog = document.getElementById("usuarioDialog");
const usuarioForm = document.getElementById("usuarioForm");

// Inicializar la aplicación
function init() {
  mostrarEventos();
  abrirDialogoUsuario();
}

// Mostrar eventos disponibles en la lista
function mostrarEventos() {
  eventosList.innerHTML = ""; // Limpiar la lista de eventos

  console.log("mostrando eventos...");

  for (let key in tickets) {
    const evento = tickets[key];
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${evento.lugar}</strong><br>
      Fecha: ${new Date(evento.fecha).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}<br>
      Precio: $${evento.precio.toLocaleString()}<br>
      Código SKU: ${evento.sku}<br>
      Tickets disponibles: ${evento.tickets}<br>
      <button id="boton-${key}" ${evento.tickets <= 0 ? "disabled" : ""}>
        ${evento.tickets > 0 ? "Comprar tickets ahora" : "Tickets agotados"}
      </button>
    `;
    eventosList.appendChild(li);

    // Asignar evento de compra
    const botonCompra = document.getElementById(`boton-${key}`);
    botonCompra.addEventListener("click", () => getTickets(key));
  }
}

// Función para abrir el dialog para capturar información del usuario
function abrirDialogoUsuario() {
  usuarioDialog.showModal(); // Mostrar el diálogo
}

// Verificar el valor del input
function checkInputValue(inputElement, expectedType) {
  const value = inputElement.value.trim();
  const smallTag = inputElement.nextElementSibling;

  if (!value || (expectedType === "number" && isNaN(parseInt(value)))) {
    inputElement.classList.add("input-invalid");
    smallTag.textContent = "Los datos son obligatorios";
    return false;
  } else {
    inputElement.classList.remove("input-invalid");
    smallTag.textContent = "Debes ser mayor a 18 para comprar"; // Resetear mensaje de error
    return true;
  }
}

// Verificar que el nombre sea mayor a 3 caracteres
function checkUserName() {
  const nombreInput = document.getElementById("nombre");

  // Verificar que el tipo del input sea "text"
  if (nombreInput.type !== "text") {
    nombreInput.classList.add("input-invalid");
    nombreInput.nextElementSibling.textContent =
      "El campo de nombre debe ser de tipo texto";
    return false;
  }

  const nombreValue = nombreInput.value.trim();

  // Verificar que el nombre no contenga números usando una expresión regular
  const contieneNumeros = /\d/.test(nombreValue);
  if (contieneNumeros) {
    nombreInput.classList.add("input-invalid");
    nombreInput.nextElementSibling.textContent =
      "El nombre no debe contener números";
    return false;
  }

  //   if (nombreValue.length <= 3) {
  //     nombreInput.classList.add("input-invalid");
  //     nombreInput.nextElementSibling.textContent =
  //       "El nombre debe tener más de 3 caracteres";
  //     return false;
  //   } else {
  //     nombreInput.classList.remove("input-invalid");
  //     nombreInput.nextElementSibling.textContent = ""; // Resetear mensaje de error
  //     return true;
  //   }

  // Verificar que el nombre tenga más de 3 caracteres
  if (nombreValue.length <= 3) {
    nombreInput.classList.add("input-invalid");
    nombreInput.nextElementSibling.textContent =
      "El nombre debe tener más de 3 caracteres";
    return false;
  }

  // Si todas las validaciones pasan, se remueve la clase de error
  nombreInput.classList.remove("input-invalid");
  nombreInput.nextElementSibling.textContent = ""; // Resetear mensaje de error
  return true;
}

// Verificar si el usuario es mayor de edad
function checkUserAge() {
  return edadUsuario >= 18;
}

// Bloquear los botones si el usuario es menor de edad
function bloquearBotones() {
  const botones = eventosList.querySelectorAll("button");
  botones.forEach((boton) => {
    boton.disabled = true;
    boton.textContent = "Tickets no disponibles";
  });
}

// Validar y capturar la información del usuario
usuarioForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  const nombreInput = document.getElementById("nombre");
  const edadInput = document.getElementById("edad");

  // Validar los inputs
  const nombreValido = checkInputValue(nombreInput, "text") && checkUserName(); // validación de nombre
  const edadValida = checkInputValue(edadInput, "number");

  // Si ambos inputs son válidos, capturamos los valores
  if (nombreValido && edadValida) {
    nombreUsuario = nombreInput.value;
    edadUsuario = parseInt(edadInput.value);

    // Verificar si el usuario es mayor de edad
    if (checkUserAge()) {
      usuarioDialog.close(); // Cerrar el diálogo
      habilitarBotones(); // Habilitar los botones de compra
    } else {
      bloquearBotones(); // Bloquear los botones si es menor de edad
      usuarioDialog.close();
    }
  }
});

// Función para habilitar los botones de compra si el usuario es mayor de edad
function habilitarBotones() {
  const botones = eventosList.querySelectorAll("button");
  botones.forEach((boton) => {
    if (boton.textContent === "Comprar tickets ahora") {
      boton.disabled = false;
    }
  });
}

// Función para manejar la compra de tickets
function getTickets(eventoKey) {
  const evento = tickets[eventoKey];

  if (evento.tickets > 0) {
    evento.tickets--;
    alert(
      `¡Compra realizada con éxito! Tickets restantes para ${evento.lugar}: ${evento.tickets}`
    );

    // Actualizar la lista de eventos y botones
    mostrarEventos();
  }
}

// Iniciar la aplicación
window.onload = init;
