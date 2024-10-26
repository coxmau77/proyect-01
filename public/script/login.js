// Ejercicio: clase #12
// 1. En tu pagina de login crea un formulario con los datos para iniciar sesion que contenga los siguientes elementos:
// - Un input donde el usuario escriba su nombre (con su respectivo label).
// - Un input donde el usuario escriba su e-mail, con un placeholder.
// - Un input donde el usuario escriba su contraseña (con su respectivo label).
// - Un boton submit para iniciar sesion
// 2. Una vez terminado el formulario, completalo con tus datos.
// 3. Luego, abrí la consola y obtené:
// - El nombre ingresado.
// - El e-mail ingresado.
// - Ambas contraseñas para verificar que sean iguales
// - El valor true o false en base a si el usuario acepto los términos y condiciones

// public/views/login.js
import { redirect } from "../utils/utils.js";

// Ejecuta onLoad para validar si el usuario está logueado al cargar la página de login
// Si está logueado, lo redirige automáticamente a la página principal
// onLoad();

// Selecciona el formulario de login
const loginForm = document.getElementById("loginForm");

// Función para manejar el envío del formulario de login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita la recarga de la página al enviar el formulario

  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  // Ejemplo de autenticación (deberías adaptar esto a tu lógica de autenticación)
  try {
    const response = await axios.post("http://localhost:3000/api/user/login", {
      email,
      password,
    });

    // Si la autenticación es exitosa, guarda el token en localStorage y redirige
    localStorage.setItem("userToken", response.data.token);
    redirect("/dashboard"); // Redirige al dashboard después de iniciar sesión
  } catch (error) {
    console.warn(email, password);
    console.error("Error en la autenticación", error);
    alert("Login fallido, por favor verifica tus credenciales.");
  }
});
