const express = require("express");
const Album = require("../models/album.model");
const Song = require("../models/song.model");
const route = express.Router();

route.get("/", (request, response) => {
  // res.send("Funciona okk");
  response.status(200).json({
    message:
      "Ruta Backend default, seria como el index de las rutas donde gestionas todo lo relacionado a discos, productos, servicios, etc, etc, etc... y la lista puede seguir",
  });
});

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

// Si no se especifica el parámetro limit, se obtendrán 10 álbumes por defecto.
// Ruta para obtener una cantidad específica de álbumes
// GET > /api/album/all?limit=3
route.get("/all", async (request, response) => {
  try {
    // Obtener el parámetro "limit" de la consulta, por defecto 10 si no se especifica
    const limit = parseInt(request.query.limit) || 10;

    // Obtener los álbumes con el límite especificado
    const albums = await Album.find().limit(limit);

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

// Ruta para obtener álbumes por nombre de banda
route.get("/by-band", async (request, response) => {
  try {
    // Obtener el nombre de la banda desde los parámetros de consulta
    const { band } = request.query;

    // Verificar si el nombre de la banda fue proporcionado
    if (!band) {
      return response.status(400).json({
        message:
          "Debes proporcionar el nombre de la banda para realizar la búsqueda.",
      });
    }

    // Buscar los álbumes que coincidan con el nombre de la banda (insensible a mayúsculas/minúsculas)
    const albums = await Album.find({
      band: { $regex: new RegExp(band, "i") },
    });

    // Verificar si se encontraron álbumes
    if (albums.length === 0) {
      return response.status(404).json({
        message: `No se encontraron álbumes para la banda: ${band}`,
      });
    }

    // Respuesta exitosa con los álbumes encontrados
    response.status(200).json({
      message: `Álbumes de la banda '${band}' obtenidos exitosamente.`,
      albums,
    });
  } catch (error) {
    // Manejo de errores
    response
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
});

// Ruta para obtener álbum por título
// GET > /api/album/by-title?title=Appetite for Destruction
// GET > /api/album/by-title?title=Appetite FOR DestructiON
route.get("/by-title", async (request, response) => {
  try {
    // Obtener el título del álbum desde los parámetros de consulta
    const { title } = request.query;

    // Verificar si el título fue proporcionado
    if (!title) {
      return response.status(400).json({
        message:
          "Debes proporcionar el título del álbum para realizar la búsqueda.",
      });
    }

    // Buscar el álbum que coincida con el título (insensible a mayúsculas/minúsculas)
    const album = await Album.findOne({
      title: { $regex: new RegExp(title, "i") },
    });

    // Verificar si se encontró el álbum
    if (!album) {
      return response.status(404).json({
        message: `No se encontró ningún álbum con el título: ${title}`,
      });
    }

    // Respuesta exitosa con el álbum encontrado
    response.status(200).json({
      message: `Álbum con título '${title}' obtenido exitosamente.`,
      album,
    });
  } catch (error) {
    // Manejo de errores
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
