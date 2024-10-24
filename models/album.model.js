const mongoose = require("mongoose");
const { Schema } = mongoose;

// Esquema de Canción
const songSchema = new Schema({
  title: {
    type: String,
    required: [true, "El título de la canción es obligatorio"],
    trim: true,
    minLength: [1, "El título debe tener al menos 1 carácter"],
    maxLength: [100, "El título no puede tener más de 100 caracteres"],
  },
  duration: {
    type: String,
    required: [true, "La duración de la canción es obligatoria"],
    min: [1, "La duración debe ser al menos de 1 segundo"],
  },
});

// Método para validar títulos duplicados en canciones
songSchema.methods.isTitleUnique = function (songs) {
  const titles = songs.map((song) => song.title);
  return titles.length === new Set(titles).size;
};

// Esquema de Álbum
const albumSchema = new Schema(
  {
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
      required: [true, "El nombre de la banda es obligatorio"],
      trim: true,
      minLength: [3, "El nombre de la banda debe tener al menos 3 caracteres"],
      maxLength: [
        100,
        "El nombre de la banda no puede tener más de 100 caracteres",
      ],
    },
    songs: {
      type: [songSchema], // Utilizamos el esquema de canciones dentro del álbum
      validate: {
        validator: function (songs) {
          return songs.length === 0 || songSchema.methods.isTitleUnique(songs);
        },
        message: "No se pueden agregar canciones duplicadas en el álbum",
      },
      default: [], // Permite crear álbumes sin canciones
    },
    cover: {
      type: String,
      required: [true, "La URL de la portada es obligatoria"],
      validate: {
        validator: function (url) {
          const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
          return urlRegex.test(url);
        },
        message: "La URL de la portada no es válida",
      },
    },
  },
  {
    collection: "albumes",
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
