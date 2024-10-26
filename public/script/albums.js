document.getElementById("albumForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

  // Limpiar mensajes de error
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => (element.textContent = ""));

  // Capturar los datos del formulario
  const albumData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    year: document.getElementById("year").value,
    band: document.getElementById("band").value,
    cover: document.getElementById("cover").value,
  };

  // Validaciones
  let hasError = false;
  if (!albumData.title) {
    document.getElementById("titleError").textContent =
      "El título es obligatorio.";
    hasError = true;
  }
  if (!albumData.description) {
    document.getElementById("descriptionError").textContent =
      "La descripción es obligatoria.";
    hasError = true;
  }
  if (
    !albumData.year ||
    albumData.year < 1900 ||
    albumData.year > new Date().getFullYear()
  ) {
    document.getElementById("yearError").textContent =
      "Por favor, ingresa un año válido.";
    hasError = true;
  }
  if (!albumData.band) {
    document.getElementById("bandError").textContent =
      "El nombre de la banda es obligatorio.";
    hasError = true;
  }
  if (!albumData.cover) {
    document.getElementById("coverError").textContent =
      "La URL de la portada es obligatoria.";
    hasError = true;
  }

  // Si hay errores, no enviar la solicitud
  if (hasError) return;

  // Enviar los datos al backend usando Axios api/album/add
  axios
    .post("/add", albumData)
    .then((response) => {
      // Mostrar mensaje de éxito
      document.getElementById("message").textContent =
        "Álbum agregado exitosamente!";
      document.getElementById("message").style.color = "green";
    })
    .catch((error) => {
      // Mostrar mensaje de error
      document.getElementById("message").textContent =
        "Error al agregar el álbum.";
      document.getElementById("message").style.color = "red";
      console.error(error);
    });
});

// Obtener todos los albumes y mostrarlos en albumsDataList
