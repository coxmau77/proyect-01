// import { onLoad } from "../utils/utils.js";

// // Obtener todos los albumes y mostrarlos en albumsDataList
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("Ejecutando onLoad()...");
//   onLoad();
// });

// Función para mostrar los álbumes en el HTML
function displayAlbums(albums) {
  console.log("Albums >> ", albums);
  const albumsContainer = document.getElementById("albumsContainer");
  albumsContainer.innerHTML = ""; // Limpia el contenedor

  albums.forEach((album) => {
    const albumElement = document.createElement("div");
    albumElement.classList.add("album-card"); // Puedes agregar una clase para estilizar cada tarjeta

    // Añadir la información completa del álbum
    albumElement.innerHTML = `
      <img src="${album.cover}" alt="${album.title}" style="width:150px; height:auto;">
      <h3>${album.title}</h3>
      <p><strong>Descripción:</strong> ${album.description}</p>
      <p><strong>Año:</strong> ${album.year}</p>
      <p><strong>Banda:</strong> ${album.band}</p>
    `;

    // Crear contenedor de botones para acciones
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Botón para agregar canción
    const addSongButton = document.createElement("button");
    addSongButton.innerText = "Agregar Canción";
    addSongButton.addEventListener("click", () => {
      // Lógica para agregar una canción
      console.log(`Agregar canción a ${album.title}`);
    });

    // Botón para eliminar álbum
    const deleteAlbumButton = document.createElement("button");
    deleteAlbumButton.innerText = "Eliminar Álbum";
    deleteAlbumButton.addEventListener("click", () => {
      // Lógica para eliminar el álbum
      console.log(`Eliminar álbum ${album.title}`);
    });

    // Botón para editar álbum
    const editAlbumButton = document.createElement("button");
    editAlbumButton.innerText = "Editar Álbum";
    editAlbumButton.addEventListener("click", () => {
      // Lógica para editar el álbum
      console.log(`Editar álbum ${album.title}`);
    });

    // Agregar botones al contenedor de botones
    buttonGroup.appendChild(addSongButton);
    buttonGroup.appendChild(deleteAlbumButton);
    buttonGroup.appendChild(editAlbumButton);

    // Añadir el contenedor de botones al álbum
    albumElement.appendChild(buttonGroup);
    albumsContainer.appendChild(albumElement);
  });
}

// Función para obtener todos los álbumes desde el backend usando Axios
async function fetchAlbums() {
  try {
    const response = await axios.get("http://localhost:3000/api/album/albums"); // Cambia la URL si es necesario
    // console.log(response.data);
    displayAlbums(response.data); // Muestra los álbumes
  } catch (error) {
    console.error("Error al cargar los álbumes:", error);
  }
}

// Ejecuta fetchAlbums cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", fetchAlbums);
