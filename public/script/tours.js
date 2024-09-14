let userName = prompt("Ingresá tu nombre.").toLowerCase();
// let userName = "Pepe Argento";
let userAge = parseInt(prompt("Ingresa tu edad."));
// let userAge = 50;
let userEmail = prompt("Ingresá tu correo electrónico").toLowerCase();

let welcome = document.getElementById("welcome");
let user_name = document.getElementById("user_name");
let user_email = document.getElementById("user_email");

// Si la persona no completa su nombre deberá comunicarle con un alert que debe completarlo.
if (!userName) {
  alert("El campo de tu nombre es obligatorio, intentalo nuevamente.");
  console.error("El campo de tu nombre es obligatorio, intentalo nuevamente.");
}

// Si la persona ingresa una sola letra le informamos que al menos deben tener 2 letras y volvemos a pedirle que ingrese nuevamente su nombre.
if (userName.length <= 2) {
  userName = prompt("Demasiado corto, dinos, cuál es realmente tu nombre?");
  console.warn(
    `Ups! tu nombre ${userName} no puede ser menor a 2 caracteres, intentalo nuevamente`
  );
}

welcome.innerHTML = `Hola <mark>${userName.toUpperCase()}</mark> de ${userAge} años, Bienvenid@ a tours! te interesaría adquirir tickects ? 🎟️`;

user_name.textContent = userName;
user_email.textContent = userEmail;

console.log(
  `Hola ${userName.toUpperCase()} de ${userAge} años, Bienvenid@ a tours! te interesaría adquirir tickects ? 🎟️`
);

// console.log((welcome.textContent = userName));
