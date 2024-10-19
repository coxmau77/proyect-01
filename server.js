// Iniciar la aplicación
// startServer();
const express = require("express");
const path = require("node:path");
require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env
const mongoose = require("mongoose");

// Variables de entorno
const urlDb = process.env.DB_URI_DRIVERS; // URL de la base de datos
const port = process.env.PORT || 3000; // Puerto de la aplicación

// Rutas
// const userRoute = require("./routes/user.route");
// const albumRoute = require("./routes/album.route");
const routes = require("./routes/index.js"); // modularización de las rutas

const app = express();

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para procesar solicitudes con cuerpo en formato JSON
app.use(express.json());

// Configuración de rutas
// app.use("/api/user", userRoute); // Rutas para usuarios
// app.use("/api/album", albumRoute); // Rutas para álbumes
app.use("/", routes);

// Función para conectar a la base de datos y levantar el servidor
const startServer = async () => {
  try {
    await mongoose.connect(urlDb); // Conexión a MongoDB
    console.log("Conexión exitosa a la base de datos");

    // Iniciar el servidor en el puerto especificado
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
  }
};

// Iniciar el servidor
startServer();
