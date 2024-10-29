// public/login.js
import { redirect } from "../utils/utils.js";

// Ejecuta onLoad para validar si el usuario está logueado al cargar la página de login
// Si está logueado, lo redirige automáticamente a la página principal
// onLoad(); // Asegúrate de que esta función esté implementada correctamente

// Selecciona el formulario de login
const loginForm = document.getElementById("loginForm");

// Función para manejar el envío del formulario de login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita la recarga de la página al enviar el formulario

  const email = document.getElementById("userEmail").value; // Obtener el email del campo de entrada
  const password = document.getElementById("userPassword").value; // Obtener la contraseña del campo de entrada

  try {
    // Realiza la solicitud POST para autenticar al usuario
    const response = await axios.post("http://localhost:3000/api/user/login", {
      email,
      password,
    });

    // Si la autenticación es exitosa, guarda el token en localStorage y redirige
    localStorage.setItem("userToken", response.data.token);
    redirect("./"); // Redirige al dashboard después de iniciar sesión
  } catch (error) {
    console.error("Error en la autenticación", error);
    // Si hay un error, muestra un mensaje de alerta
    alert("Login fallido, por favor verifica tus credenciales.");
  }
});
