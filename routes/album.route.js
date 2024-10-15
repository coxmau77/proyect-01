const express = require("express");
const Album = require("../models/album.model");
const route = express.Router();

// Crear un nuevo álbum
// Ruta: POST /albums/add
route.post("/add", async (request, response) => {
  try {
    const { titulo } = request.body;

    // Verificar si el álbum ya existe
    const existingAlbum = await Album.findOne({ titulo });
    if (existingAlbum) {
      return response.status(400).json({ message: "El álbum ya existe" });
    }

    const newAlbum = new Album(request.body);
    await newAlbum.save();
    response.status(201).json({
      message: "Álbum creado exitosamente",
      album: newAlbum,
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Editar un álbum por ID
// Ruta: PUT /albums/:id
route.put("/:id", async (request, response) => {
  try {
    const album = await Album.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!album)
      return response.status(404).json({ message: "Álbum no encontrado" });

    response.status(200).json({
      message: "Álbum actualizado exitosamente",
      album,
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Actualización parcial de un álbum (PATCH)
// Ruta: PATCH /albums/:id
route.patch("/:id", async (request, response) => {
  try {
    const album = await Album.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!album)
      return response.status(404).json({ message: "Álbum no encontrado" });

    response.status(200).json({
      message: "Álbum actualizado parcialmente con éxito",
      album,
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Agregar o eliminar una canción de un álbum
// Ruta: PUT /albums/:id/song
route.put("/:id/song", async (request, response) => {
  try {
    const album = await Album.findById(request.params.id);
    if (!album)
      return response.status(404).json({ message: "Álbum no encontrado" });

    const { action, song } = request.body;

    // Agregar una canción, verificando que no esté duplicada
    if (action === "add") {
      const songExists = album.canciones.some((c) => c.titulo === song.titulo);
      if (songExists) {
        return response
          .status(400)
          .json({ message: "La canción ya existe en el álbum" });
      }
      album.canciones.push(song);
      await album.save();
      return response.status(200).json({
        message: "Canción agregada exitosamente",
        album,
      });
    } else if (action === "remove") {
      album.canciones = album.canciones.filter(
        (c) => c._id.toString() !== song._id
      );
      await album.save();
      return response.status(200).json({
        message: "Canción eliminada exitosamente",
        album,
      });
    }
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Obtener todos los álbumes
// Ruta: GET /albums/all
route.get("/all", async (request, response) => {
  try {
    const albums = await Album.find();
    response.status(200).json({
      message: "Álbumes obtenidos exitosamente",
      albums,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Obtener un álbum específico por ID
// Ruta: GET /albums/:id
route.get("/:id", async (request, response) => {
  try {
    const album = await Album.findById(request.params.id);
    if (!album)
      return response.status(404).json({ message: "Álbum no encontrado" });

    response.status(200).json({
      message: "Álbum obtenido exitosamente",
      album,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Eliminar un álbum por ID
// Ruta: DELETE /albums/:id
route.delete("/:id", async (request, response) => {
  try {
    const album = await Album.findByIdAndDelete(request.params.id);
    if (!album)
      return response.status(404).json({ message: "Álbum no encontrado" });

    response.status(200).json({ message: "Álbum eliminado exitosamente" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = route;
