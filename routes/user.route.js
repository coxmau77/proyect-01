const express = require("express");
const route = express.Router();

const personajesSimpson = [
  {
    id: 1,
    nombre: "Bart",
    apellido: "Simpson",
    email: "eatmyshorts@email.com",
    direccion: {
      calle: "Av. Siempreviva 742",
      ciudad: "Springfield",
      pais: "Estados Unidos",
    },
    telefonos: ["555-1234", "555-5678"],
  },
  {
    id: 2,
    nombre: "Homer",
    apellido: "Simpson",
    email: "homer.simpson@email.com",
    direccion: {
      calle: "Av. Siempreviva 742",
      ciudad: "Springfield",
      pais: "Estados Unidos",
    },
    telefonos: ["555-8765", "555-4321"],
  },
  {
    id: 3,
    nombre: "Marge",
    apellido: "Simpson",
    email: "marge.simpson@email.com",
    direccion: {
      calle: "Av. Siempreviva 742",
      ciudad: "Springfield",
      pais: "Estados Unidos",
    },
    telefonos: ["555-2468", "555-1357"],
  },
  {
    id: 4,
    nombre: "Lisa",
    apellido: "Simpson",
    email: "lisa.simpson@email.com",
    direccion: {
      calle: "Av. Siempreviva 742",
      ciudad: "Springfield",
      pais: "Estados Unidos",
    },
    telefonos: ["555-9876", "555-6543"],
  },
  {
    id: 5,
    nombre: "Maggie",
    apellido: "Simpson",
    email: "maggie.simpson@email.com",
    direccion: {
      calle: "Av. Siempreviva 742",
      ciudad: "Springfield",
      pais: "Estados Unidos",
    },
    telefonos: ["555-1111", "555-2222"],
  },
];

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

route.get("/all", (request, response) => {
  console.info(`Se crearon ${users.length} usuario/s.`);
  response.status(200).send(users);
});

route.get("/personajes", (request, response) => {
  response.status(200).send(personajesSimpson);
});

route.get("/body", (request, response) => {
  //   console.log(request.body);
  const { uid, id, name, email, created_at, birthdate, favorite_songs } =
    request.body;
  // console.log(
  //   `Name: ${name}, Email: ${email}, Created at: ${created_at}, Birth date: ${birthdate} | Favorite: ${favorite_songs}`
  // );
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
