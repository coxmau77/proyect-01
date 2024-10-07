const mongoose = require("mongoose");
const { Schema } = mongoose;

// Esquema para las canciones
const cancionSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El título de la canción es obligatorio"],
    trim: true, // Elimina espacios en blanco al inicio y final
    minLength: [1, "El título debe tener al menos 1 carácter"],
    maxLength: [100, "El título no puede tener más de 100 caracteres"],
  },
  duracion: {
    type: Number,
    required: [true, "La duración de la canción es obligatoria"],
    min: [1, "La duración debe ser al menos de 1 segundo"], // Validación: No permite duración 0 o negativa
  },
});

// Esquema para el álbum
const albumSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El título del álbum es obligatorio"], // Validación: Título requerido
    trim: true,
    minLength: [1, "El título debe tener al menos 1 carácter"],
    maxLength: [100, "El título no puede tener más de 100 caracteres"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"], // Validación: Descripción requerida
    trim: true,
    minLength: [5, "La descripción debe tener al menos 5 caracteres"],
    maxLength: [200, "La descripción no puede tener más de 200 caracteres"],
  },
  anio: {
    type: Number,
    required: [true, "El año de lanzamiento es obligatorio"], // Validación: Año requerido
    min: [1, "El año de lanzamiento debe ser mayor que 0"], // No permite valores negativos o cero
  },
  canciones: [cancionSchema], // Relación con el esquema de canciones
  portada: {
    type: String,
    required: [true, "La URL de la portada es obligatoria"], // Validación: URL de portada requerida
    validate: {
      validator: function (url) {
        // Expresión regular simple para validar formato de URL
        const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
        return urlRegex.test(url);
      },
      message: "La URL de la portada no es válida",
    },
  },
});

// Crear el modelo de Álbum
const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
