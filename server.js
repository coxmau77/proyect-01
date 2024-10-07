//modulo 15 server.js
// Modulo 16 - express que va a hace que /public sea la app que va a ver el usuario
const express = require("express");
const path = require("node:path");

// Requerimientos de las rutas
const userRoute = require("./routes/user.route");

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// middlewares
// Middleware app.use(express.json()); para analizar cuerpos de solicitud con formato JSON
app.use(express.json());
app.use("/api/user", userRoute);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
