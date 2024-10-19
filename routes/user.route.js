const express = require("express");
const User = require("../models/user.model");
const route = express.Router();

// Crear un nuevo usuario
// Ruta: POST /api/user/signin
// Se espera recibir un cuerpo con los datos del usuario
route.post("/signin", async (request, response) => {
  try {
    const { email } = request.body;

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response
        .status(400)
        .json({ message: `El email -{ ${email} }- ya es usuario registrado` });
    }

    const newUser = new User(request.body);
    await newUser.save();
    response.status(201).json({
      message: "Usuario creado exitosamente",
      user: newUser,
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Obtener todos los usuarios
// Ruta: GET /users/all
// Devuelve un arreglo con todos los usuarios, excluyendo sus contraseñas
route.get("/all", async (request, response) => {
  try {
    const users = await User.find().select("-password"); // Excluimos el campo de contraseña

    if (users.length === 0) {
      return response
        .status(404)
        .json({ message: "No se encuentran usuarios registrados." });
    }

    response.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      count: users.length, // Cantidad de usuarios encontrados
      users,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Buscar un usuario por correo electrónico
// Ruta: GET /users/:email
route.get("/email/:email", async (request, response) => {
  try {
    const email = request.params.email;

    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email }).select("-password"); // Excluir la contraseña de la respuesta
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    response.status(200).json({
      message: "Usuario encontrado exitosamente",
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Rutas de prueba
// Ruta: GET /users/prueba
// Devuelve un mensaje simple para verificar que el servidor está funcionando
route.get("/prueba", (request, response) => {
  response.send("Ruta de prueba para verificar el servidor");
});

// Obtener un usuario por ID
// Ruta: GET /api/user/:id
route.get("/:id", async (request, response) => {
  // console.log(request.params.id);
  try {
    const userId = request.params.id;

    const user = await User.findById(userId).select("-password"); // Excluimos la contraseña

    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    response.status(200).json({
      message: "Usuario encontrado exitosamente",
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
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
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    response.status(200).json({
      message: "Usuario actualizado exitosamente",
      user,
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
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
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    response.status(200).json({
      message: "Usuario actualizado parcialmente con éxito",
      user,
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Eliminar un usuario por ID
// Ruta: DELETE /users/:id
// Elimina un usuario de la base de datos
route.delete("/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    response.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = route;
