// Iniciar la aplicación
// startServer();
const express = require("express");
const path = require("node:path");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env

// Variables de entorno
const urlDb = process.env.DB_URI_DRIVERS; // URL de la base de datos
const port = process.env.PORT || 3000; // Puerto de la aplicación

// Health Check Path : para hacer nuestro deploy, Render nos pide que agregamos una ruta a la cual hará requests periódicamente para comprobar la salud de la app.
app.use("/health", (req, res) => res.sendStatus(200));

// Rutas
// const userRoute = require("./routes/user.route");
// const albumRoute = require("./routes/album.route");
const routes = require("./routes"); // modularización de las rutas

// Middleware para procesar solicitudes con cuerpo en formato JSON
app.use(express.json());

// Habilitar CORS solo para ciertas rutas o métodos
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "https://proyect-01.onrender.com",
        "http://localhost:3000",
        "https://proyect-01.vercel.app",
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS Baby!"));
    },
  })
);
app.disable("x-powered-by"); // Oculta el nobre de la biblioteca Express

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

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
