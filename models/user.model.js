const mongoose = require("mongoose");
const { Schema } = mongoose;

// Definición del esquema del usuario
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"], // Validación: El campo es obligatorio
      trim: true, // Elimina espacios en blanco
      minLength: [3, "El nombre debe tener al menos 3 caracteres"], // Validación: Mínimo de caracteres
      maxLength: [30, "El nombre no puede tener más de 30 caracteres"], // Validación: Máximo de caracteres
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      lowercase: true,
      trim: true,
      unique: true, // Asegura que no se puedan registrar dos usuarios con el mismo email
      validate: {
        validator: function (email) {
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return emailRegex.test(email);
        },
        message: "El formato del email no es válido",
      },
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minLength: [6, "La contraseña debe tener al menos 6 caracteres"],
      maxLength: [50, "La contraseña no puede exceder los 50 caracteres"],
      validate: {
        validator: function (password) {
          // Expresión regular para validar al menos un número, una letra mayúscula y un carácter especial
          const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
          return passwordRegex.test(password);
        },
        message:
          "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial",
      },
    },
    age: {
      type: Number,
      required: [true, "La edad es obligatoria"], // Validación: El campo es obligatorio
      min: [12, "La edad debe ser al menos 12"], // Edad mínima
      max: [100, "La edad no puede exceder los 100 años"], // Edad máxima
    },
    favoriteAlbums: {
      type: [String], // Un array de strings para almacenar múltiples álbumes favoritos
      default: [], // Inicializa el array como vacío
    },
    favoriteSongs: {
      type: [String], // Un array de strings para almacenar múltiples canciones favoritas
      default: [], // Inicializa el array como vacío
    },
  },
  {
    collection: "user",
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
); // Especifica el nombre de la colección { collection: "user" } en singular

// Crear el modelo de Usuario
const User = mongoose.model("User", userSchema);

module.exports = User;
