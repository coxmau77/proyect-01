let tickets = {
  river: {
    lugar: "Estadio river Plate",
    tickets: 100,
    sku: "#FWB000",
    fecha: "2024-10-07",
    precio: 399.999,
  },
  boca: {
    lugar: "Estadio Boca Juniors",
    tickets: 300,
    sku: "#FWB001",
    fecha: "2024-10-02",
    precio: 399.999,
  },
  movistar: {
    lugar: "Movistar Arnera",
    tickets: 1,
    sku: "#FWB002",
    fecha: "2024-10-14",
    precio: 399.999,
  },
  obras: {
    lugar: "Estadio Obras Sanitarias",
    tickets: 700,
    sku: "#FWB003",
    fecha: "2024-10-11",
    precio: 399.999,
  },
  rex: {
    lugar: "Teatro Gran Rex",
    tickets: 0,
    sku: "#FWB004",
    fecha: "2024-10-01",
    precio: 399.999,
  },
};

// let userName = prompt("Ingresá tu nombre.").toLowerCase();
let userName = "Pepe Argento";
// let userAge = parseInt(prompt("Ingresa tu edad."));
let userAge = 17;
// let userEmail = prompt("Ingresá tu correo electrónico").toLowerCase();
let userEmail = "pepe@correo.com";

let welcome = document.getElementById("welcome");
let user_name = document.getElementById("user_name");
let user_email = document.getElementById("user_email");
let ticket_icon = document.querySelector("i");

let buy_buttons = document.querySelectorAll(".boton-comprar");

// la informacion y detalles de tours debe proceder del objeto tickes que contiene Código del evento (SKU), lugar, fecha en formato date (mm-dd-yyyy), precio, tickets (que seran la cantidad de tickets disponibles)

// e.g.
// obras: {
//   sku: "#FWB004",
//   fecha: "2024-10-03",
//   lugar: "Estadio Obras Sanitarias",
//   precio: 399.999,
//   tickets: 700,
// },

// Si existen tickets disponibles el boton se debe habilitar y cambiar su contenido de texto a "Comprar tickets ahora" en caso que no existan tickets disponibles El texto debe decir "Tickets agotados" utilizando una funcion llamada "disableSoldOutButtons()"

// Debes conciderar que no sera posible comprar tickets si el usuario no es mayor de edad

// Al ingresar a tours se debe verificar que exista un usuario para permitir la compra de tickets
// Se ejecuta la funcion que inicia esta verificacion init()
// Dentro de esta funcion vamos a elecutar otras funciones para verificar el nombre del usuario, la edad
// Si es mayor de edad los botones se habilitaran para que se pueda comprar tickets cabe aclarar para esto que de manera predeterminada los botones ya estan inhabilitados (disabled) por lo que la funcion que hace esta verificacion llamara a otra funcion para habilitar los botones en caso que la edad del usuario sea la adecuada

// Si la persona NO completa su nombre deberá comunicarle con un alert que debe completarlo.

// Para aquellos lugares que ya no tienen tickets deberás crear una segunda función llamada disableSoldOutButtons que recorra el objeto tickets y deshabilite el botón correspondiente a aquellas fechas ya agotadas.

// Esta función la deberás invocar cada vez que ocurra una compra, es decir con cada ejecución de getTickets

// La informacion de cada elemento con la informacion de tickets debe verse en el html en un <li> con toda la informacion de cada uno de los objetos que tomaremos de ejemplo
/*
let tickets = {
  river: {
    lugar: "Estadio river Plate",
    tickets: 100,
  },
  boca: {
    lugar: "Estadio Boca Juniors",
    tickets: 300,
  },
  movistar: {
    lugar: "Movistar Arnera",
    tickets: 1,
  },
  obras: {
    sku: "#FWB004",
    fecha: "2024-10-03",
    lugar: "Estadio Obras Sanitarias",
    precio: 399.999,
    tickets: 700,
  },
  rex: {
    lugar: "Teatro Gran Rex",
    tickets: 0,
  },
};
*/

// ------------------------

// Si la persona ingresa una sola letra le informamos que al menos deben tener 2 letras y volvemos a pedirle que ingrese nuevamente su nombre.
// isNaN("t"); // true
// isNaN(2); // false

// if (userName.length <= 2) {
//   userName = prompt("Demasiado corto, dinos, cuál es realmente tu nombre?");
//   console.warn(
//     `Ups! tu nombre ${userName} no puede ser menor a 2 caracteres, intentalo nuevamente`
//   );
// }

while (userName.length < 3) {
  userName = prompt(
    "Mmmm, tu nombre no puede ser tan corto, ingresa al menos 3 letras"
  ).toLowerCase();
}

if (userAge < 18) {
  // No puede comprar tickets
  errorMessage();
  lockBuyButton(buy_buttons);
}

function errorMessage() {
  alert("No puedes comprar tickets");
  swal("Good job!", "You clicked the button!", "error");
}

function lockBuyButton(btnList) {
  let i = 0;
  while (i < btnList.length) {
    btnList[i].setAttribute("disabled", "");
    btnList[i].textContent = "No disponible";
    i++;
  }
}

// welcome.innerHTML = `Hola <mark>${userName.toUpperCase()}</mark> de ${userAge} años, Bienvenid@ a tours! te interesaría adquirir tickects ? 🎟️`;
welcome.innerHTML = `Hola <mark>${userName.toUpperCase()}</mark> de ${userAge} años, Bienvenid@ a tours! te interesaría adquirir tickects? <i></i>`;

user_name.textContent = userName;
user_email.textContent = userEmail;
ticket_icon.setAttribute("class", "bi bi-ticket-perforated-fill");

console.log(welcome.textContent);

// console.log((welcome.textContent = userName));

function getTickets(place, gotTickets) {
  // alert("place: " + place + " " + "gotTickets: " + gotTickets);
  if (gotTickets) {
    swal("Sold!", "You have tickets to the " + place + " concert", "success");
  } else {
    swal(
      "Oh no!",
      "You are outta luck!, there are no more tickets for " + place,
      "info"
    );
  }
}
