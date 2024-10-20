// Captura los datos del formulario y devuelve un objeto con los valores
function getFormData() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const age = document.getElementById("age").value;

  return { name, email, password, confirmPassword, age };
}

// Valida los datos del formulario
function validateFormData(userData) {
  if (!userData.name || userData.name.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres >>> " + userData.name);
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
  if (!validatePasswords(userData.password, userData.confirmPassword)) {
    return false;
  }
  if (userData.age < 12) {
    alert("La edad debe ser al menos 12");
    return false;
  }
  return true;
}

// Envía los datos del formulario al backend
// async function submitForm(userData) {
//   try {
//     // Eliminar el campo confirmPassword antes de enviar los datos
//     delete userData.confirmPassword;

//     const response = await axios.post(
//       "http://localhost:3000/api/user/signin",
//       userData
//     );
//     alert("Usuario creado exitosamente");
//     console.log(response.data); // Manejar la respuesta si es necesario
//   } catch (error) {
//     if (error.response) {
//       alert(`Error: ${error.response.data.message}`);
//     } else {
//       alert("Error al conectar con el servidor");
//     }
//   }
// }

// Envía los datos del formulario al backend
async function submitForm(userData) {
  try {
    // Eliminar el campo confirmPassword antes de enviar los datos
    delete userData.confirmPassword;

    const response = await axios.post(
      "http://localhost:3000/api/user/signin", // URL del endpoint
      userData
    );
    alert(response.data.message || "Usuario creado exitosamente");
    console.log(response.data); // Manejar la respuesta si es necesario
  } catch (error) {
    // Si el backend devuelve un error de validación, muestra los mensajes
    if (error.response && error.response.data.errors) {
      const errorMessages = error.response.data.errors;
      for (let field in errorMessages) {
        alert(`${field}: ${errorMessages[field].message}`);
      }
    } else if (error.response && error.response.data.message) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert("Error al conectar con el servidor");
    }
  }
}

// Valida que las contraseñas sean iguales
function validatePasswords(password, confirmPassword) {
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden. Por favor, intenta de nuevo.");
    return false;
  }
  return true;
}

// Maneja el evento submit del formulario
function handleFormSubmit(event) {
  event.preventDefault(); // Previene la recarga de la página

  // Captura los datos del formulario
  const userData = getFormData();

  // Valida los datos antes de enviar
  if (validateFormData(userData)) {
    // Si la validación es exitosa, envía los datos al backend
    submitForm(userData);
  }
}

// Agregar el event listener al formulario
document
  .getElementById("signinForm")
  .addEventListener("submit", handleFormSubmit);
