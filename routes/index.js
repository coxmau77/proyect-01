const express = require("express");
const route = express.Router();

const userRoute = require("./user.route");
const albumRoute = require("./album.route");

// Middleware
route.use("/api/user", userRoute); // Rutas para usuarios
route.use("/api/album", albumRoute); // Rutas para álbumes

module.exports = route;
