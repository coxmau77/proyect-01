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

// Validar y capturar la información del usuario
usuarioForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  nombreUsuario = document.getElementById("nombre").value;
  edadUsuario = parseInt(document.getElementById("edad").value);

  if (!nombreUsuario) {
    alert("Por favor, completa tu nombre");
    // Agregar una clase al input nombre para que lo marque en rojo
    checkInputValue();
    return;
  }

  if (edadUsuario < 18) {
    alert("Debes ser mayor de edad para comprar tickets");
    return;
  }

  usuarioDialog.close(); // Cerrar el diálogo
  habilitarBotones(); // Habilitar los botones para eventos con tickets disponibles
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

// Verificar que el input sea valido
checkInputValue();

// Iniciar la aplicación
window.onload = init;
