const express = require("express");
const route = express.Router();

function createUserList(cantUsers) {
  const usuarios = [];

  for (let i = 1; i <= cantUsers; i++) {
    const usuario = {
      uid: i,
      id: generarMongoId(), // ID similar al de MongoDB
      name: `Usuario${i}`,
      email: `usuario${i}@ejemplo.com`,
      created_at: new Date().toISOString(), // Fecha de creación
      birthdate: `1990-05-${Math.ceil(Math.random() * 28)}`, // Fecha de nacimiento aleatoria
      favorite_songs: [
        // Lista de canciones favoritas
        `Song -> ${Math.ceil(Math.random() * 100)}`,
        `Song -> ${Math.ceil(Math.random() * 100)}`,
        `Song -> ${Math.ceil(Math.random() * 100)}`,
      ],
    };
    usuarios.push(usuario);
  }

  return usuarios;
}

const cantUsers = 30;
const users = createUserList(cantUsers);

// Función para generar un ID similar al de MongoDB
function generarMongoId() {
  return (
    Math.random().toString(16).substring(2, 10) +
    Math.random().toString(16).substring(2, 10)
  );
}

route.get("/", (request, response) => {
  response.status(200).send("Esta es la ruta principal backend");
});

route.get("/all", (request, response) => {
  console.info(`Se crearon ${users.length} usuario/s.`);
  response.status(200).send(users);
});

route.get("/body", (request, response) => {
  const { uid, id, name, email, created_at, birthdate, favorite_songs } =
    request.body;

  const userData = {
    uid,
    id,
    name,
    email,
    created_at,
    birthdate,
    favorite_songs,
  };
  response.status(200).send(userData);
});

route.post("/signup", (request, response) => {
  const { name, email, password, confirm_pass, terms } = request.body;

  const userData = { name, email, password, confirm_pass, terms };
  console.log(userData);
  response.status(200).send(userData);
});

route.get("/:id", (request, response) => {
  // Convertir el id a número
  const id = parseInt(request.params.id);
  console.log("uid --> ", id);
  const userFound = users.filter((user) => user.uid === id);

  if (userFound.length > 0) {
    response.status(200).send(userFound);
  } else {
    // Manejo de errores
    response.status(404).send({ message: "Usuario no encontrado." });
  }
});

/** Recordar siempre exportar el modulo creado */
module.exports = route;
