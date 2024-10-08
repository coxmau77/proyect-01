const express = require("express"); // Importar express
const User = require("../models/user.model"); // Importar el modelo User
const route = express.Router(); // Crear un enrutador

// Ruta para crear un nuevo usuario
route.post("/", async (req, res) => {
  try {
    const userData = req.body; // Obtener los datos del cuerpo de la solicitud
    const newUser = new User(userData); // Crear una nueva instancia de User
    await newUser.save(); // Guardar el usuario en la base de datos
    res.status(201).json(newUser); // Responder con el usuario creado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para obtener todos los usuarios
route.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.status(200).json(users); // Responder con la lista de usuarios
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para obtener un usuario por su ID
route.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Buscar el usuario por ID
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" }); // Manejo de errores si no se encuentra
    }
    res.status(200).json(user); // Responder con el usuario encontrado
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para actualizar un usuario
route.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retornar el documento actualizado
      runValidators: true, // Aplicar validadores
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" }); // Manejo de errores si no se encuentra
    }
    res.status(200).json(user); // Responder con el usuario actualizado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Manejar errores
  }
});

// Ruta para eliminar un usuario
route.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Buscar y eliminar el usuario por ID
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" }); // Manejo de errores si no se encuentra
    }
    res.status(204).send(); // Responder con un estado 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
});

// Exportar el módulo de rutas
module.exports = route;
