const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt"); // Para comparar contraseñas encriptadas
const jwt = require("jsonwebtoken"); // Para generar tokens JWT

/**RUTAS ESTÁTICAS */

// Ruta principal index de usuarios
// Ruta: GET /api/user
router.get("/", (request, response) => {
  response.status(200).json({
    message:
      "Ruta Backend default, seria como el index de las rutas donde gestionas todo lo relacionado a usuarios, alta, baja o modificaciones",
  });
});

// Crear un nuevo usuario
// Ruta: POST /api/user/signin
// Se espera recibir un cuerpo con los datos del usuario, incluyendo email, edad y contraseña
router.post("/signin", async (request, response) => {
  try {
    const { email, age, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({
        message: `El email - { ${email} } - ya está registrado`,
      });
    }

    if (age < 12) {
      return response.status(400).json({
        message: "La edad mínima permitida es de 12 años",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...request.body, password: hashedPassword });

    await newUser.save();
    response.status(201).json({
      message: "Usuario creado exitosamente",
      user: { id: newUser._id, email: newUser.email, age: newUser.age },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return response.status(400).json({ message: validationErrors });
    }
    response.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta de Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por su email
    const user = await User.findOne({ email });

    // Si el usuario no existe, enviar un error
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la contraseña encriptada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT si las credenciales son válidas
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Clave secreta para firmar el token
      { expiresIn: "5h" } // Tiempo de expiración del token
    );

    // console.log(">>> ", token);
    // Retornar el token al cliente
    res.json({ token, user });
  } catch (error) {
    console.error("Error en la autenticación", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Obtener todos los usuarios
// Ruta: GET /api/user/all
// Ruta: GET /api/user/all?limit=1
// Devuelve un arreglo con todos los usuarios, excluyendo sus contraseñas
router.get("/all", async (request, response) => {
  try {
    // Obtener el parámetro "limit" de la consulta, con un valor predeterminado de 10
    const limit = parseInt(request.query.limit) || 10;

    // Buscar usuarios excluyendo el campo de contraseña y aplicando el límite
    const users = await User.find().select("-password").limit(limit);

    // Verificar si se encontraron usuarios
    if (users.length === 0) {
      return response.status(404).json({
        message: "No se encuentran usuarios registrados.",
      });
    }

    // Respuesta exitosa con la cantidad de usuarios obtenidos
    response.status(200).json({
      message: `Usuarios obtenidos exitosamente. Se encontraron ${users.length} usuario(s) por default ?limit=10.`,
      count: users.length, // Cantidad de usuarios encontrados
      users,
    });
  } catch (error) {
    // Manejo de errores
    response.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

// Ruta para obtener todos los datos de usuarios con un límite, inclusive la contraseñas
// Ruta: GET /api/user/private
// Ruta: GET /api/user/private?limit=1
router.get("/private", async (request, response) => {
  try {
    // Obtener el parámetro "limit" de la consulta, con un valor predeterminado de 10
    const limit = parseInt(request.query.limit) || 10;

    // Obtener los usuarios con el límite especificado
    const users = await User.find().limit(limit);

    // Verificar si se encontraron usuarios
    if (users.length === 0) {
      return response.status(404).json({
        message: "No se encontraron usuarios",
      });
    }

    // Incluir la cantidad de usuarios en el mensaje de respuesta
    response.status(200).json({
      message: `Datos sencibles de Usuarios obtenidos exitosamente. Se encontraron ${users.length} usuario(s).`,
      users,
    });
  } catch (error) {
    // Manejo de errores
    response.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});
// Rutas de prueba
// Ruta: GET /users/prueba
// Devuelve un mensaje simple para verificar que el servidor está funcionando
router.get("/prueba", (request, response) => {
  response.send("Ruta de prueba para verificar el servidor");
});

/** RUTAS DINÁMICAS */

// Obtener un usuario por ID
// Ruta: GET /api/user/:id
router.get("/:id", async (request, response) => {
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

router.get("/private/:id", async (request, response) => {
  // console.log(request.params.id);
  try {
    const userId = request.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    response.status(200).json({
      message: "Datos sencibles de Usuario encontrado exitosamente",
      user,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Buscar un usuario por correo electrónico
// Ruta: GET /users/:email
router.get("/email/:email", async (request, response) => {
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

// Ruta para encontrar un usuario por su nombre exácto
// Ruta GET /api/user/name/:name
router.get("/name/:name", async (request, response) => {
  try {
    // Obtener el nombre de los parámetros de la ruta
    const { name } = request.params;

    // Buscar el primer usuario que coincida con el nombre exacto (insensible a mayúsculas)
    const user = await User.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") }, // Coincidencia exacta insensible a mayúsculas
    }).select("-password"); // Excluir el campo de contraseña

    // Verificar si se encontró el usuario
    if (!user) {
      return response.status(404).json({
        message: `No se encontró ningún usuario con el nombre: ${name}`,
      });
    }

    // Respuesta exitosa con el usuario encontrado
    response.status(200).json({
      message: "Usuario encontrado exitosamente",
      user,
    });
  } catch (error) {
    // Manejo de errores
    response.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

// Actualizar un usuario por ID (PUT)
// Ruta: PUT /users/:id
// Se actualizan todos los campos del usuario
router.put("/:id", async (request, response) => {
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
router.patch("/:id", async (request, response) => {
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
// Elimina un usuario de la base de datos y devuelve el nombre del usuario eliminado
router.delete("/:id", async (request, response) => {
  try {
    // Buscar y eliminar el usuario por su ID
    const user = await User.findByIdAndDelete(request.params.id);

    // Si no se encuentra el usuario
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    // Enviar respuesta exitosa con el nombre del usuario eliminado
    response.status(200).json({
      message: `Usuario '${user.name}' eliminado exitosamente`,
    });
  } catch (error) {
    // Manejo de errores
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
