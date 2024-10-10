const express = require("express");
const Album = require("../models/album.model");
const route = express.Router();

// Crear un nuevo álbum
route.post("/add", async (req, res) => {
  try {
    const newAlbum = new Album(req.body);
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Editar un álbum
route.put("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });
    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Agregar o eliminar una canción en un álbum
route.put("/:id/song", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

    const { action, song } = req.body;
    if (action === "add") {
      album.canciones.push(song);
    } else if (action === "remove") {
      album.canciones = album.canciones.filter(
        (c) => c._id.toString() !== song._id
      );
    }
    await album.save();
    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los álbumes
route.get("/all", async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un álbum específico
route.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un álbum
route.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = route;
