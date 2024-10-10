const mongoose = require("mongoose");
const { Schema } = mongoose;
const Song = require("./song.model"); // Importamos el esquema de Song

const albumSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El título del álbum es obligatorio"],
    trim: true,
    minLength: [1, "El título debe tener al menos 1 carácter"],
    maxLength: [100, "El título no puede tener más de 100 caracteres"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
    minLength: [5, "La descripción debe tener al menos 5 caracteres"],
    maxLength: [200, "La descripción no puede tener más de 200 caracteres"],
  },
  anio: {
    type: Number,
    required: [true, "El año de lanzamiento es obligatorio"],
    min: [1, "El año de lanzamiento debe ser mayor que 0"],
  },
  canciones: [Song.schema], // Usamos el esquema de Song
  portada: {
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
});

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
