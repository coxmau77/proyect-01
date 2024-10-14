const express = require("express");
const User = require("../models/user.model");
const route = express.Router();

// Crear un nuevo usuario
// Ruta: POST /users
// Se espera recibir un cuerpo con los datos del usuario
route.post("/", async (request, response) => {
  try {
    const newUser = new User(request.body); // Creamos una nueva instancia de User con los datos del request
    await newUser.save(); // Guardamos el usuario en la base de datos
    response.status(201).json(newUser); // Enviamos una respuesta con el nuevo usuario creado
  } catch (error) {
    response.status(400).json({ message: error.message }); // Enviamos un error si algo falla en la creación
  }
});

// Obtener todos los usuarios
// Ruta: GET /users
// Devuelve un arreglo con todos los usuarios, excluyendo sus contraseñas
route.get("/all", async (request, response) => {
  try {
    const users = await User.find().select("-password"); // Buscamos todos los usuarios y excluimos el campo de contraseña
    response.status(200).json(users); // Enviamos la lista de usuarios
  } catch (error) {
    response.status(500).json({ message: error.message }); // Enviamos un error si algo falla en la consulta
  }
});

// Obtener un usuario por ID
// Ruta: GET /users/:id
// Se obtiene un usuario basado en el ID, excluyendo el campo de contraseña
route.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id).select("-password"); // Buscamos el usuario por ID y excluimos la contraseña
    if (!user)
      return response.status(404).json({ message: "Usuario no encontrado" }); // Verificamos si existe el usuario
    response.status(200).json(user); // Enviamos la respuesta con los datos del usuario
  } catch (error) {
    response.status(500).json({ message: error.message }); // Enviamos un error si algo falla en la consulta
  }
});

// Actualizar un usuario por ID (PUT)
// Ruta: PUT /users/:id
// Se actualizan todos los campos del usuario
route.put("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true, // Para devolver el usuario actualizado
      runValidators: true, // Para aplicar las validaciones del esquema
    });
    if (!user)
      return response.status(404).json({ message: "Usuario no encontrado" }); // Verificamos si el usuario existe
    response.status(200).json(user); // Enviamos la respuesta con el usuario actualizado
  } catch (error) {
    response.status(400).json({ message: error.message }); // Enviamos un error si algo falla en la actualización
  }
});

// Actualización parcial de un usuario (PATCH)
// Ruta: PATCH /users/:id
// Actualiza solo los campos que se envíen en el request
route.patch("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true, // Para devolver el usuario actualizado
      runValidators: true, // Para aplicar las validaciones del esquema
    });
    if (!user)
      return response.status(404).json({ message: "Usuario no encontrado" }); // Verificamos si el usuario existe
    response.status(200).json(user); // Enviamos la respuesta con los datos actualizados del usuario
  } catch (error) {
    response.status(400).json({ message: error.message }); // Enviamos un error si algo falla
  }
});

// Eliminar un usuario por ID
// Ruta: DELETE /users/:id
// Elimina un usuario de la base de datos
route.delete("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id); // Buscamos y eliminamos el usuario por ID
    if (!user)
      return response.status(404).json({ message: "Usuario no encontrado" }); // Verificamos si el usuario existe
    response.status(204).send(); // Enviamos una respuesta vacía indicando que el usuario fue eliminado
  } catch (error) {
    response.status(500).json({ message: error.message }); // Enviamos un error si algo falla
  }
});

// Rutas de prueba
// Ruta: GET /users/prueba
// Devuelve un mensaje simple para verificar que el servidor está funcionando
route.get("/prueba", (request, response) => {
  response.send("Ruta de prueba para verificar el servidor");
});

module.exports = route;
