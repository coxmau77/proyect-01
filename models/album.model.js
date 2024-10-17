const mongoose = require("mongoose");
const { Schema } = mongoose;
const Song = require("./song.model"); // Importamos el esquema de Song

// Definición del esquema de Álbum
const albumSchema = new Schema({
  title: {
    type: String,
    required: [true, "El título del álbum es obligatorio"],
    trim: true,
    minLength: [1, "El título debe tener al menos 1 carácter"],
    maxLength: [100, "El título no puede tener más de 100 caracteres"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
    minLength: [5, "La descripción debe tener al menos 5 caracteres"],
    maxLength: [200, "La descripción no puede tener más de 200 caracteres"],
  },
  year: {
    type: Number,
    required: [true, "El año de lanzamiento es obligatorio"],
    min: [1, "El año de lanzamiento debe ser mayor que 0"],
  },
  band: {
    type: String,
    required: [true, "El nombre de la banda es obligatorio"], // Validación para asegurar que se proporcione el nombre
    // // unique: true, // Evitar bandas duplicadas
    trim: true,
    minLength: [3, "El nombre de la banda debe tener al menos 3 caracteres"],
    maxLength: [
      100,
      "El nombre de la banda no puede tener más de 100 caracteres",
    ],
  },
  songs: [
    {
      type: Song.schema, // Referencia al esquema de canciones
      validate: {
        validator: function (canciones) {
          // Validar que no existan canciones duplicadas en el álbum
          const titulos = canciones.map((cancion) => cancion.titulo);
          return titulos.length === new Set(titulos).size;
        },
        message: "No se pueden agregar canciones duplicadas en el álbum",
      },
    },
  ],
  // songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], // Referencia a canciones

  cover: {
    // Cambiar 'portada' a 'coverImage'
    type: String,
    required: [true, "La URL de la portada es obligatoria"],
    validate: {
      validator: function (url) {
        // Validar que la URL tenga un formato correcto
        const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
        return urlRegex.test(url);
      },
      message: "La URL de la portada no es válida",
    },
  },
});

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
