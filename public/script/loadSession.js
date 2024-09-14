let userNameAdmin = prompt("Ingresa tu usuario para ingresar (admin)");
let userPassword = prompt("Ingresá tu contraseña (admin123)");

if (userNameAdmin == "admin" && userPassword == "admin123") {
  console.log("Sesión iniciada correctamente");
  alert("Sesión iniciada correctamente");
  window.location = "./index.html";
} else {
  console.error("Los datos ingresados no son correctos");
}
