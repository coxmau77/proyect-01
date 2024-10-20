// const express = require("express");
// const Album = require("../models/album.model");
// const Song = require("../models/song.model");
// const route = express.Router();

// // Agregar una canción a un álbum
// route.put("/:id/song/add", async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

//     const { titulo, duracion } = req.body;

//     // Crear una instancia de Song usando el esquema definido
//     const newSong = new Song({ titulo, duracion });

//     // Validar la canción antes de agregarla al álbum
//     const error = newSong.validateSync();
//     if (error) return res.status(400).json({ message: error.message });

//     // Verificar si la canción ya existe en el álbum
//     const songExists = album.canciones.some((c) => c.titulo === titulo);
//     if (songExists) {
//       return res
//         .status(400)
//         .json({ message: "La canción ya existe en el álbum" });
//     }

//     // Agregar la nueva canción al álbum
//     album.canciones.push(newSong);
//     await album.save();

//     res.status(200).json({
//       message: "Canción agregada exitosamente",
//       album,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Eliminar una canción de un álbum
// route.put("/:id/song/remove", async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) return res.status(404).json({ message: "Álbum no encontrado" });

//     const { songId } = req.body;

//     // Verificar si la canción existe en el álbum
//     const songIndex = album.canciones.findIndex(
//       (c) => c._id.toString() === songId
//     );
//     if (songIndex === -1) {
//       return res
//         .status(404)
//         .json({ message: "La canción no fue encontrada en el álbum" });
//     }

//     // // Buscar la canción en el álbum usando el ID proporcionado
//     // const cancionEncontrada = album.canciones.find(
//     //   (cancion) => cancion._id.toString() === songId
//     // );

//     // // Verificar si la canción no fue encontrada
//     // if (!cancionEncontrada) {
//     //   return res
//     //     .status(404)
//     //     .json({ message: "La canción no fue encontrada en el álbum" });
//     // }

//     // Eliminar la canción del álbum
//     album.canciones.splice(songIndex, 1);
//     await album.save();

//     res.status(200).json({
//       message: "Canción eliminada exitosamente",
//       album,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = route;
