// let userName = prompt("Ingresá tu nombre.").toLowerCase();
let userName = "Pepe Argento";
let userAge = parseInt(prompt("Ingresa tu edad."));
// let userAge = 17;
// let userEmail = prompt("Ingresá tu correo electrónico").toLowerCase();
let userEmail = "pepe@correo.com";

let welcome = document.getElementById("welcome");
let user_name = document.getElementById("user_name");
let user_email = document.getElementById("user_email");
let ticket_icon = document.querySelector("i");

let buy_buttons = document.querySelectorAll(".boton-comprar");

// Si la persona NO completa su nombre deberá comunicarle con un alert que debe completarlo.
// if (!userName) {
//   alert("El campo de tu nombre es obligatorio, intentalo nuevamente.");
//   console.error("El campo de tu nombre es obligatorio, intentalo nuevamente.");
// }

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
  // swal("Good job!", "You clicked the button!", "error");
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
