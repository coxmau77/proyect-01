let tickets = {
  river: {
    lugar: "Estadio River Plate",
    tickets: 1,
    sku: "#FWB000",
    fecha: "2024-10-07",
    precio: 399999,
  },
  boca: {
    lugar: "Estadio Boca Juniors",
    tickets: 3,
    sku: "#FWB001",
    fecha: "2024-10-02",
    precio: 199999,
  },
  movistar: {
    lugar: "Movistar Arena",
    tickets: 1,
    sku: "#FWB002",
    fecha: "2024-10-14",
    precio: 222999,
  },
  obras: {
    lugar: "Estadio Obras Sanitarias",
    tickets: 7,
    sku: "#FWB003",
    fecha: "2024-10-11",
    precio: 449999,
  },
  rex: {
    lugar: "Teatro Gran Rex",
    tickets: 0,
    sku: "#FWB004",
    fecha: "2024-10-01",
    precio: 777999,
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
    li.innerHTML = `<section>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd"
                    d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clip-rule="evenodd" />
            </svg>
            <div>
                <small>${evento.sku}</small>
                <strong>$${evento.precio.toFixed(2)}</strong><br>
                <strong>${evento.lugar}</strong><br>
                <span>${new Date(evento.fecha).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
            </div>
        </section>
            <div>

                <button id="boton-${key}" ${
      evento.tickets <= 0 ? "disabled" : ""
    }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                    </svg>
                    ${
                      evento.tickets > 0
                        ? "Comprar tickets ahora"
                        : "Tickets agotados"
                    }
                </button>
                <small>Tickets disponibles: ${evento.tickets}</small>
            </div>
    `;
    // li.innerHTML = `
    //   <strong>${evento.lugar}</strong><br>
    //   Fecha: ${new Date(evento.fecha).toLocaleDateString("es-ES", {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   })}<br>
    //   Precio: $${evento.precio.toLocaleString()}<br>
    //   Código SKU: ${evento.sku}<br>
    //   Tickets disponibles: ${evento.tickets}<br>
    //   <button id="boton-${key}" ${evento.tickets <= 0 ? "disabled" : ""}>
    //     ${evento.tickets > 0 ? "Comprar tickets ahora" : "Tickets agotados"}
    //   </button>
    // `;
    eventosList.appendChild(li);

    // Asignar evento de compra
    const botonCompra = document.getElementById(`boton-${key}`);
    botonCompra.addEventListener("click", () => getTickets(key));
  }
}

// Validar y capturar la información del usuario
usuarioForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  const nombreInput = document.getElementById("nombre");
  const edadInput = document.getElementById("edad");

  console.log(nombreInput.tagName);
  console.log(nombreInput.value);

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
  console.log(nombreInput.classList.add("input-invalid"));

  // Verificar que el tipo del input sea "text"
  if (nombreInput.type !== "text") {
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
    // console.log(nombreInput.className);
    // setInputClass(nombreInput);
    nombreInput.nextElementSibling.textContent =
      "El nombre debe tener más de 3 caracteres";
    return false;
  }

  // Si todas las validaciones pasan, se remueve la clase de error
  nombreInput.classList.remove("input-invalid");
  nombreInput.nextElementSibling.textContent = ""; // Resetear mensaje de error
  return true;
}

// function setInputClass(input) {
//   const inputs = document.querySelectorAll("#usuarioForm > input");

//   for (let i = 0; i < inputs.length; i++) {
//     if (input[i].classList.contains("input")) {}
//       input[i].classList.add("input-invalid");
//     }

// }

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

  console.log(evento);

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
