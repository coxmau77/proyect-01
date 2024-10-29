// Captura los datos del formulario y devuelve un objeto con los valores
function getFormData() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const age = parseInt(document.getElementById("age").value);

  return { name, email, password, confirmPassword, age };
}

// Valida los datos del formulario
function validateFormData(userData) {
  if (!userData.name || userData.name.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return false;
  }
  if (!userData.email) {
    alert("El correo es obligatorio");
    return false;
  }
  if (!userData.password || userData.password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres");
    return false;
  }
  if (userData.password !== userData.confirmPassword) {
    alert("Las contraseñas no coinciden");
    return false;
  }
  if (userData.age < 12) {
    alert("La edad debe ser al menos 12");
    return false;
  }
  return true;
}

// Envía los datos del formulario al backend
async function submitForm(userData) {
  try {
    // Eliminamos confirmPassword antes de enviar
    delete userData.confirmPassword;

    const response = await axios.post(
      "http://localhost:3000/api/user/signin",
      userData
    );
    alert(response.data.message || "Usuario creado exitosamente");
  } catch (error) {
    if (error.response && error.response.data.message) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor");
    }
  }
}

// Maneja el evento submit del formulario
function handleFormSubmit(event) {
  event.preventDefault(); // Evita la recarga de la página

  const userData = getFormData();
  if (validateFormData(userData)) {
    submitForm(userData);
  }
}

// Agrega el event listener al formulario de registro
document
  .getElementById("signinForm")
  .addEventListener("submit", handleFormSubmit);
