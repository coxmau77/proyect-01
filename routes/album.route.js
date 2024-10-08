const express = require("express"); // Importar express
const Album = require("../models/album.model"); // Importar el modelo Album
const route = express.Router(); // Crear un enrutador

// Ruta para crear un nuevo álbum
route.post("/add", async (req, res) => {
  try {
    const albumData = req.body; // Obtener los datos del cuerpo de la solicitud
    const newAlbum = new Album(albumData); // Crear una nueva instancia de Album
    await newAlbum.save(); // Guardar el álbum en la base de datos
    res.status(201).json(newAlbum); // Responder con el álbum creado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para obtener todos los álbumes
route.get("/all", async (req, res) => {
  try {
    const albums = await Album.find(); // Obtener todos los álbumes
    res.status(200).json(albums); // Responder con la lista de álbumes
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para obtener un álbum por su ID
route.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id); // Buscar el álbum por ID
    if (!album) {
      return res.status(404).json({ message: "Álbum no encontrado" }); // Manejo de errores si no se encuentra
    }
    res.status(200).json(album); // Responder con el álbum encontrado
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para actualizar un álbum
route.put("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retornar el documento actualizado
      runValidators: true, // Aplicar validadores
    });
    if (!album) {
      return res.status(404).json({ message: "Álbum no encontrado" }); // Manejo de errores si no se encuentra
    }
    res.status(200).json(album); // Responder con el álbum actualizado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para eliminar un álbum
route.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id); // Buscar y eliminar el álbum por ID
    if (!album) {
      return res.status(404).json({ message: "Álbum no encontrado" }); // Manejo de errores si no se encuentra
    }
    res.status(204).send(); // Responder con un estado 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
});

// Exportar el módulo de rutas
module.exports = route;
