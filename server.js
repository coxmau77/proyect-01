//modulo 15 server.js
// Modulo 16 - express que va a hace que /public sea la app que va a ver el usuario
const express = require("express");
const path = require("node:path");
// Requerir dotenv
require("dotenv").config();

const mongoose = require("mongoose");
const urlDb = process.env.DB_URI_DRIVERS;

// Requerimientos de las rutas
const userRoute = require("./routes/user.route");
const albumRoute = require("./routes/album.route");

const app = express();
const port = process.env.PORT; // Obtener el puerto desde las variables de entorno

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// middlewares
// Middleware app.use(express.json()); para analizar cuerpos de solicitud con formato JSON
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/album", albumRoute);

// Función para conectar a la base de datos y levantar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos MongoDB (sin las opciones obsoletas)
    await mongoose.connect(urlDb);
    console.log("Conexión exitosa a la base de datos");

    // Levantar el servidor si la conexión fue exitosa
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    // Capturar cualquier error durante la conexión
    console.error("Error al conectar a la base de datos:", error.message);
  }
};

// Iniciar la aplicación
startServer();
