// public/utils/utils.js

// Función para redirigir a una URL especificada
const redirect = (url) => {
  window.location.href = url;
};

// // Función para validar si el usuario está logueado en todas las vistas
// const onLoad = () => {
//   const isLoggedIn = Boolean(localStorage.getItem("userToken")); // Ejemplo de validación con token en localStorage
//   if (!isLoggedIn) {
//     redirect("/login.html"); // Redirige a la página de login si no está logueado
//   }
// };

// Función para cerrar sesión
const logOut = () => {
  localStorage.removeItem("userToken"); // Elimina el token de autenticación
  redirect("/login"); // Redirige al login después del cierre de sesión
};

// Exporta las funciones para que puedan ser reutilizadas en otros archivos
export { redirect, logOut };
