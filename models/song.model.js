const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
