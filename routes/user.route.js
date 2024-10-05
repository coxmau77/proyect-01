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

route.get("/all", (request, response) => {
  response.status(200).send("Debe mostrar todos los usuarios");
});

route.get("/personajes", (request, response) => {
  response.status(200).send(personajesSimpson);
});

route.get("/body", (request, response) => {
  //   console.log(request.body);
  const { nombre, email, direccion, telefonos } = request.body;
  console.log(
    `${nombre}, ${email}, ${direccion.calle}, ${direccion.ciudad}, ${direccion.pais} ${telefonos}`
  );
  response
    .status(200)
    .send(
      `${nombre}, ${email}, ${direccion.calle}, ${direccion.ciudad}, ${direccion.pais} ${telefonos}`
    );
});

route.get("/:id", (request, response) => {
  // Convertir el id a número
  const id = parseInt(request.params.id);
  console.log("id --> ", id);

  const personajeFiltrado = personajesSimpson.filter(
    (personaje) => personaje.id === id
  );

  if (personajeFiltrado.length > 0) {
    response.status(200).send(personajeFiltrado);
  } else {
    // Manejo de errores
    response.status(404).send({ message: "Personaje no encontrado." });
  }
});

/** Recordar siempre exportar el modulo creado */
module.exports = route;
