// // const express = require("express");
// // const Album = require("../models/album.model");
// // const route = express.Router();

// // // Crear un nuevo álbum
// // // Ruta: POST /albums/add
// // route.post("/add", async (request, response) => {
// //   try {
// //     const { titulo } = request.body;

// //     // Verificar si el álbum ya existe
// //     const existingAlbum = await Album.findOne({ titulo });
// //     if (existingAlbum) {
// //       return response.status(400).json({ message: "El álbum ya existe" });
// //     }

// //     const newAlbum = new Album(request.body);
// //     await newAlbum.save();
// //     response.status(201).json({
// //       message: "Álbum creado exitosamente",
// //       album: newAlbum,
// //     });
// //   } catch (error) {
// //     response.status(400).json({ message: error.message });
// //   }
// // });

// // // // Crear un nuevo álbum
// // // // Ruta: POST /albums/add
// // // route.post("/add", async (request, response) => {
// // //   try {
// // //     const { titulo, descripcion, anio, canciones, portada } = request.body;

// // //     // Verificar si el álbum ya existe por el título único
// // //     const existingAlbum = await Album.findOne({ titulo });
// // //     if (existingAlbum) {
// // //       return response.status(400).json({ message: "El álbum ya existe" });
// // //     }

// // //     // Crear la instancia del nuevo álbum
// // //     const newAlbum = new Album({
// // //       titulo,
// // //       descripcion,
// // //       anio,
// // //       canciones,
// // //       portada,
// // //     });

// // //     // Guardar el nuevo álbum
// // //     await newAlbum.save();

// // //     // Responder con éxito
// // //     response.status(201).json({
// // //       message: "Álbum creado exitosamente",
// // //       album: newAlbum,
// // //     });
// // //   } catch (error) {
// // //     // Manejo de errores, mostrando el mensaje del error específico
// // //     response.status(400).json({ message: error.message });
// // //   }
// // // });

// // // Editar un álbum por ID
// // // Ruta: PUT /albums/:id
// // route.put("/:id", async (request, response) => {
// //   try {
// //     const album = await Album.findByIdAndUpdate(
// //       request.params.id,
// //       request.body,
// //       {
// //         new: true,
// //         runValidators: true,
// //       }
// //     );
// //     if (!album)
// //       return response.status(404).json({ message: "Álbum no encontrado" });

// //     response.status(200).json({
// //       message: "Álbum actualizado exitosamente",
// //       album,
// //     });
// //   } catch (error) {
// //     response.status(400).json({ message: error.message });
// //   }
// // });

// // // Actualización parcial de un álbum (PATCH)
// // // Ruta: PATCH /albums/:id
// // route.patch("/:id", async (request, response) => {
// //   try {
// //     const album = await Album.findByIdAndUpdate(
// //       request.params.id,
// //       request.body,
// //       {
// //         new: true,
// //         runValidators: true,
// //       }
// //     );
// //     if (!album)
// //       return response.status(404).json({ message: "Álbum no encontrado" });

// //     response.status(200).json({
// //       message: "Álbum actualizado parcialmente con éxito",
// //       album,
// //     });
// //   } catch (error) {
// //     response.status(400).json({ message: error.message });
// //   }
// // });

// // // Agregar o eliminar una canción de un álbum
// // // Ruta: PUT /albums/:id/song
// // route.put("/:id/song", async (request, response) => {
// //   try {
// //     const album = await Album.findById(request.params.id);
// //     if (!album)
// //       return response.status(404).json({ message: "Álbum no encontrado" });

// //     const { action, song } = request.body;

// //     // Agregar una canción, verificando que no esté duplicada
// //     if (action === "add") {
// //       const songExists = album.canciones.some((c) => c.titulo === song.titulo);
// //       if (songExists) {
// //         return response
// //           .status(400)
// //           .json({ message: "La canción ya existe en el álbum" });
// //       }
// //       album.canciones.push(song);
// //       await album.save();
// //       return response.status(200).json({
// //         message: "Canción agregada exitosamente",
// //         album,
// //       });
// //     } else if (action === "remove") {
// //       album.canciones = album.canciones.filter(
// //         (c) => c._id.toString() !== song._id
// //       );
// //       await album.save();
// //       return response.status(200).json({
// //         message: "Canción eliminada exitosamente",
// //         album,
// //       });
// //     }
// //   } catch (error) {
// //     response.status(400).json({ message: error.message });
// //   }
// // });

// // // Obtener todos los álbumes
// // // Ruta: GET /albums/all
// // route.get("/all", async (request, response) => {
// //   try {
// //     const albums = await Album.find();
// //     response.status(200).json({
// //       message: "Álbumes obtenidos exitosamente",
// //       albums,
// //     });
// //   } catch (error) {
// //     response.status(500).json({ message: error.message });
// //   }
// // });

// // // Obtener un álbum específico por ID
// // // Ruta: GET /albums/:id
// // route.get("/:id", async (request, response) => {
// //   try {
// //     const album = await Album.findById(request.params.id);
// //     if (!album)
// //       return response.status(404).json({ message: "Álbum no encontrado" });

// //     response.status(200).json({
// //       message: "Álbum obtenido exitosamente",
// //       album,
// //     });
// //   } catch (error) {
// //     response.status(500).json({ message: error.message });
// //   }
// // });

// // // Eliminar un álbum por ID
// // // Ruta: DELETE /albums/:id
// // route.delete("/:id", async (request, response) => {
// //   try {
// //     const album = await Album.findByIdAndDelete(request.params.id);
// //     if (!album)
// //       return response.status(404).json({ message: "Álbum no encontrado" });

// //     response.status(200).json({ message: "Álbum eliminado exitosamente" });
// //   } catch (error) {
// //     response.status(500).json({ message: error.message });
// //   }
// // });

// // module.exports = route;

// const express = require("express");
// const Album = require("../models/album.model");
// const Song = require("../models/song.model");
// const route = express.Router();

// // Ruta para agregar un nuevo álbum
// // POST /api/album/add
// route.post("/add", async (request, response) => {
//   try {
//     const { titulo } = request.body;

//     // Verificar si el álbum ya existe
//     const existingAlbum = await Album.findOne({ titulo });
//     if (existingAlbum) {
//       return response.status(400).json({ message: "El álbum ya existe" });
//     }

//     // Crear un nuevo álbum
//     const newAlbum = new Album(request.body);
//     await newAlbum.save();
//     response.status(201).json({
//       message: "Álbum creado exitosamente",
//       album: newAlbum,
//     });
//   } catch (error) {
//     response.status(400).json({ message: error.message });
//   }
// });

// // Ruta para agregar una canción a un álbum
// // PUT /api/album/:id/song/add
// route.put("/:id/song/add", async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

//     const { titulo, duracion } = req.body;

//     // Verificar si la canción ya existe
//     const songExists = album.canciones.some((c) => c.titulo === titulo);
//     if (songExists) {
//       return res
//         .status(400)
//         .json({ message: "La canción ya existe en el álbum" });
//     }

//     // Crear una nueva canción y agregarla al álbum
//     const newSong = new Song({ titulo, duracion });
//     album.canciones.push(newSong);
//     await album.save();

//     res.status(200).json({ message: "Canción agregada exitosamente", album });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Ruta para eliminar una canción de un álbum
// // PUT /api/album/:id/song/remove
// route.put("/:id/song/remove", async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

//     const { songId } = req.body;

//     // Encontrar el índice de la canción
//     const songIndex = album.canciones.findIndex(
//       (c) => c._id.toString() === songId
//     );
//     if (songIndex === -1) {
//       return res
//         .status(404)
//         .json({ message: "La canción no fue encontrada en el álbum" });
//     }

//     // Eliminar la canción del álbum
//     album.canciones.splice(songIndex, 1);
//     await album.save();

//     res.status(200).json({ message: "Canción eliminada exitosamente", album });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Ruta para obtener todos los álbumes
// // GET /api/album/all
// route.get("/all", async (request, response) => {
//   // try {
//   //   const albums = await Album.find();
//   //   response.status(200).json({ message: "Álbumes obtenidos exitosamente", albums });
//   // } catch (error) {
//   //   response.status(500).json({ message: error.message });
//   // }

//   try {
//     const albums = await Album.find();

//     if (albums.length === 0) {
//       return response.status(404).json({
//         message: "No se encontraron álbumes",
//       });
//     }

//     response.status(200).json({
//       message: "Álbumes obtenidos exitosamente",
//       albums,
//     });
//   } catch (error) {
//     response.status(500).json({ message: error.message });
//   }
// });

// // Ruta para obtener un álbum por ID
// // GET /api/album/:id
// route.get("/:id", async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

//     res.status(200).json({ message: "Álbum obtenido exitosamente", album });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Ruta para eliminar un álbum por ID
// // DELETE /api/album/:id
// route.delete("/:id", async (req, res) => {
//   try {
//     const album = await Album.findByIdAndDelete(req.params.id);
//     if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

//     res.status(200).json({ message: "Álbum eliminado exitosamente" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = route;

const express = require("express");
const Album = require("../models/album.model");
const Song = require("../models/song.model");
const route = express.Router();

// Ruta para agregar un nuevo álbum
// POST /api/album/add
route.post("/add", async (request, response) => {
  try {
    const { title } = request.body;

    // Verificar si el álbum ya existe
    const existingAlbum = await Album.findOne({ title });
    if (existingAlbum) {
      return response.status(400).json({ message: "El álbum ya existe" });
    }

    // Crear un nuevo álbum
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

// Ruta para eliminar una canción de un álbum
// PUT /api/album/:id/song/remove
route.put("/:id/song/remove", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

    const { songId } = req.body;

    // Encontrar el índice de la canción
    const songIndex = album.songs.findIndex((c) => c._id.toString() === songId);
    if (songIndex === -1) {
      return res
        .status(404)
        .json({ message: "La canción no fue encontrada en el álbum" });
    }

    // Eliminar la canción del álbum
    album.songs.splice(songIndex, 1);
    await album.save();

    res.status(200).json({ message: "Canción eliminada exitosamente", album });
  } catch (error) {
    res.status(400).json({ message: error.message });
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

    response.status(200).json({
      message: "Álbumes obtenidos exitosamente",
      albums,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
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
