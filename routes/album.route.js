const express = require("express");
const Album = require("../models/album.model");
const route = express.Router();

route.get("/", (request, response) => {
  // res.send("Funciona okk");
  response.status(200).json({
    message:
      "Ruta Backend default, seria como el index de las rutas donde gestionas todo lo relacionado a discos, productos, servicios, etc, etc, etc... y la lista puede seguir",
  });
});

// Crear un nuevo álbum
// Ruta: POST api/album/add
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

// Ruta para agregar una canción a un álbum
route.post("/:albumId/song", async (req, res) => {
  try {
    const { albumId } = req.params;
    const newSong = req.body; // Información de la canción enviada en el cuerpo de la solicitud

    // Buscar el álbum por ID
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Álbum no encontrado" });
    }

    // Validar canciones duplicadas antes de agregar
    if (!album.songs.some((song) => song.title === newSong.title)) {
      album.songs.push(newSong); // Agregar la nueva canción al álbum
      await album.save(); // Guardar el álbum con la nueva canción
      res.status(200).json({ message: "Canción agregada exitosamente", album });
    } else {
      res.status(400).json({ message: "La canción ya existe en el álbum" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al agregar la canción", error });
  }
});

// Ruta para eliminar una canción de un álbum
route.delete("/albums/:albumId/songs/:songId", async (req, res) => {
  try {
    const { albumId, songId } = req.params;

    // Buscar el álbum por ID
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Álbum no encontrado" });
    }

    // Filtrar las canciones para eliminar la que tiene el ID especificado
    const updatedSongs = album.songs.filter(
      (song) => song._id.toString() !== songId
    );

    if (updatedSongs.length === album.songs.length) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    album.songs = updatedSongs; // Actualizar las canciones en el álbum
    await album.save(); // Guardar los cambios en el álbum

    res.status(200).json({ message: "Canción eliminada exitosamente", album });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la canción", error });
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
