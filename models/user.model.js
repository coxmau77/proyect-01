// user.model.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Asegúrate de importar bcrypt
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minLength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxLength: [30, "El nombre no puede tener más de 30 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      lowercase: true,
      trim: true,
      unique: true,
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
      validate: {
        validator: function (password) {
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
      required: [true, "La edad es obligatoria"],
      min: [12, "La edad debe ser al menos 12"],
      max: [100, "La edad no puede exceder los 100 años"],
    },
    favoriteAlbums: {
      type: [String],
      default: [],
    },
    favoriteSongs: {
      type: [String],
      default: [],
    },
  },
  {
    collection: "usuarios",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
