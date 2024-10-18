const express = require("express");
const Album = require("../models/album.model");
const Song = require("../models/song.model");
const route = express.Router();

// Crear un nuevo álbum
// Ruta: POST /albums/add
route.post("/add", async (request, response) => {
  try {
    const { title, description, year, band, cover } = request.body;

    // Validar que los campos requeridos están presentes
    if (!title || !description || !year || !band || !cover) {
      return response.status(400).json({
        message:
          "La estructura del álbum no es correcta. Asegúrate de proporcionar 'title', 'description', 'year', 'band', y 'cover'.",
      });
    }

    // Verificar si el álbum ya existe por título
    const existingAlbum = await Album.findOne({ title });
    if (existingAlbum) {
      return response
        .status(400)
        .json({ message: `El álbum ${title} ya existe` });
    }

    // Crear un nuevo álbum
    const newAlbum = new Album(request.body);
    await newAlbum.save();

    // Respuesta exitosa
    return response.status(201).json({
      message: `El álbum ${title}, fue creado exitosamente`,
      album: newAlbum,
    });
  } catch (error) {
    // Manejo de errores específicos para duplicados u otros problemas
    if (error.code === 11000) {
      return response.status(400).json({
        message: `Error de duplicado: ya existe un álbum con el título ${title} o algún campo único.`,
      });
    }

    // Error general
    return response.status(500).json({
      message: "Ocurrió un error en el servidor",
      error: error.message,
    });
  }
});

// Ruta para obtener todos los álbumes
// GET /api/album/all
route.get("/all", async (request, response) => {
  try {
    const albums = await Album.find();

    if (albums.length === 0) {
      return response.status(404).json({
        message: "No se encontraron álbumes",
      });
    }

    // Incluir la cantidad de álbumes en el mensaje
    response.status(200).json({
      message: `Álbumes obtenidos exitosamente. Se encontraron ${albums.length} álbum(es).`,
      albums,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
});

// Ruta para agregar una canción a un álbum
// PUT /api/album/:id/song/add
route.put("/:id/song/add", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

    const { title, duration } = req.body;

    // Verificar si la canción ya existe
    const songExists = album.songs.some((c) => c.title === title);
    if (songExists) {
      return res
        .status(400)
        .json({ message: "La canción ya existe en el álbum" });
    }

    // Crear una nueva canción y agregarla al álbum
    const newSong = new Song({ title, duration });
    album.songs.push(newSong);
    await album.save();

    res.status(200).json({ message: "Canción agregada exitosamente", album });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar una canción de un álbum específico usando IDs en la URL
// DELETE /api/album/:albumId/song/:songId
route.delete("/:albumId/song/:songId", async (request, response) => {
  try {
    // Buscar el álbum por ID
    const album = await Album.findById(request.params.albumId);
    if (!album) {
      return response.status(404).json({ message: "Álbum no encontrado" });
    }

    // Buscar la canción por ID en el array de canciones del álbum
    const songIndex = album.songs.findIndex(
      (song) => song._id.toString() === request.params.songId
    );
    if (songIndex === -1) {
      return response
        .status(404)
        .json({ message: "La canción no fue encontrada en el álbum" });
    }

    // Eliminar la canción del array de canciones del álbum
    album.songs.splice(songIndex, 1);
    // Guardar los cambios
    await album.save();

    // Responder con éxito y enviar el álbum actualizado
    response
      .status(200)
      .json({ message: "Canción eliminada exitosamente", album });
  } catch (error) {
    // Manejo de errores
    response
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
});

// Ruta para obtener un álbum por ID
// GET /api/album/:id
route.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

    res.status(200).json({ message: "Álbum obtenido exitosamente", album });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para eliminar un álbum por ID
// DELETE /api/album/:id
route.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

    res.status(200).json({ message: "Álbum eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = route;
