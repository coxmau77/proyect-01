## Obtener una cantidad especifica de albumes

Puedes crear una ruta que permita obtener una cantidad específica de álbumes mediante un parámetro de consulta (query parameter). Por ejemplo, puedes usar un parámetro como `limit` para especificar cuántos álbumes deseas obtener. A continuación te muestro cómo puedes modificar la ruta para implementar esta funcionalidad.

### Ruta para obtener una cantidad específica de álbumes:

```javascript
// Ruta para obtener una cantidad específica de álbumes
route.get("/all", async (request, response) => {
  try {
    // Obtener el parámetro "limit" de la consulta, por defecto 10 si no se especifica
    const limit = parseInt(request.query.limit) || 10;

    // Obtener los álbumes con el límite especificado
    const albums = await Album.find().limit(limit);

    if (albums.length === 0) {
      return response.status(404).json({
        message: "No se encontraron álbumes",
      });
    }

    // Incluir la cantidad de álbumes en el mensaje
    response.status(200).json({
      message: `Álbumes obtenidos exitosamente. Se encontraron ${albums.length} álbum(es).`,
      albums,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
});
```

### Explicación:

1. **Parámetro `limit` en la consulta**: El parámetro `limit` se obtiene de la URL de la consulta usando `request.query.limit`. Si el parámetro no está presente, se usa un valor predeterminado de 10 álbumes.

   - Ejemplo de una consulta con límite: `/api/album/all?limit=5` obtendría los primeros 5 álbumes.
   - Si no se especifica el parámetro `limit`, se obtendrán 10 álbumes por defecto.

2. **Función `limit()` de Mongoose**: Mongoose tiene un método llamado `.limit()` que permite limitar el número de documentos que se obtienen de la base de datos.

3. **Manejo de errores**: Si no se encuentran álbumes, se devuelve un mensaje de error con un estado `404`. Si ocurre algún error en el servidor, se devuelve un estado `500` con un mensaje adecuado.

### Ejemplo de Consulta:

- **Obtener 5 álbumes**:

  - URL: `/api/album/all?limit=5`

- **Respuesta exitosa**:
  ```json
  {
    "message": "Álbumes obtenidos exitosamente. Se encontraron 5 álbum(es).",
    "albums": [ ... ]  // Lista de álbumes
  }
  ```

De esta forma, puedes obtener una cantidad específica de álbumes dependiendo del valor que pases en la consulta.

## Crea una ruta para encontrar albumes por nombre de la banda

Para crear una ruta que permita encontrar álbumes filtrados por el nombre de la banda, puedes usar un parámetro de consulta (`query parameter`) o un parámetro de ruta (`route parameter`). En este caso, usaré un parámetro de consulta para buscar álbumes por el nombre de la banda. A continuación te muestro cómo hacerlo:

### Ruta para encontrar álbumes por nombre de banda:

```javascript
// Ruta para obtener álbumes por nombre de banda
route.get("/by-band", async (request, response) => {
  try {
    // Obtener el nombre de la banda desde los parámetros de consulta
    const { band } = request.query;

    // Verificar si el nombre de la banda fue proporcionado
    if (!band) {
      return response.status(400).json({
        message:
          "Debes proporcionar el nombre de la banda para realizar la búsqueda.",
      });
    }

    // Buscar los álbumes que coincidan con el nombre de la banda (insensible a mayúsculas/minúsculas)
    const albums = await Album.find({
      band: { $regex: new RegExp(band, "i") },
    });

    // Verificar si se encontraron álbumes
    if (albums.length === 0) {
      return response.status(404).json({
        message: `No se encontraron álbumes para la banda: ${band}`,
      });
    }

    // Respuesta exitosa con los álbumes encontrados
    response.status(200).json({
      message: `Álbumes de la banda '${band}' obtenidos exitosamente.`,
      albums,
    });
  } catch (error) {
    // Manejo de errores
    response
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
});
```

### Explicación:

1. **Parámetro de consulta (`band`)**: Se obtiene el nombre de la banda usando `request.query.band`. Si el parámetro no se proporciona, la ruta devuelve un mensaje de error con estado `400`.

   - Ejemplo de consulta: `/api/album/by-band?band=Guns N' Roses`

2. **Búsqueda insensible a mayúsculas/minúsculas**: Para hacer la búsqueda insensible a mayúsculas/minúsculas, se utiliza una expresión regular con la opción `"i"` (`$regex: new RegExp(band, "i")`).

3. **Manejo de errores**:
   - Si no se proporciona el nombre de la banda, devuelve un error `400` con un mensaje claro.
   - Si no se encuentran álbumes para la banda proporcionada, devuelve un error `404`.
   - Si ocurre algún problema con la base de datos o el servidor, devuelve un error `500`.

### Ejemplo de Consulta:

- **Buscar álbumes de Guns N' Roses**:
  - URL: `/api/album/by-band?band=Guns N' Roses`

### Ejemplo de Respuesta Exitosa:

```json
{
  "message": "Álbumes de la banda 'Guns N' Roses' obtenidos exitosamente.",
  "albums": [
    {
      "title": "Appetite for Destruction",
      "description": "El álbum debut que revolucionó el hard rock y el heavy metal.",
      "year": 1987,
      "band": "Guns N' Roses",
      "cover": "https://example.com/images/appetite_for_destruction.jpg"
    },
    {
      "title": "Use Your Illusion I",
      "description": "Un álbum icónico que mezcla géneros desde el hard rock hasta el blues.",
      "year": 1991,
      "band": "Guns N' Roses",
      "cover": "https://example.com/images/use_your_illusion_I.jpg"
    }
  ]
}
```

### Ejemplo de Error:

- **Si no se proporciona el nombre de la banda**:
  ```json
  {
    "message": "Debes proporcionar el nombre de la banda para realizar la búsqueda."
  }
  ```
- **Si no se encuentran álbumes para la banda**:
  ```json
  {
    "message": "No se encontraron álbumes para la banda: Guns N' Roses"
  }
  ```

De esta forma, puedes realizar una búsqueda de álbumes filtrada por el nombre de la banda.

## ruta que permita obtener un álbum específico basado en su título

Para crear una ruta que permita obtener un álbum específico basado en su título, puedes utilizar un parámetro de consulta (`query parameter`) similar al ejemplo anterior. A continuación te muestro cómo hacerlo:

### Ruta para obtener álbum por título:

```javascript
// Ruta para obtener álbum por título
route.get("/by-title", async (request, response) => {
  try {
    // Obtener el título del álbum desde los parámetros de consulta
    const { title } = request.query;

    // Verificar si el título fue proporcionado
    if (!title) {
      return response.status(400).json({
        message:
          "Debes proporcionar el título del álbum para realizar la búsqueda.",
      });
    }

    // Buscar el álbum que coincida con el título (insensible a mayúsculas/minúsculas)
    const album = await Album.findOne({
      title: { $regex: new RegExp(title, "i") },
    });

    // Verificar si se encontró el álbum
    if (!album) {
      return response.status(404).json({
        message: `No se encontró ningún álbum con el título: ${title}`,
      });
    }

    // Respuesta exitosa con el álbum encontrado
    response.status(200).json({
      message: `Álbum con título '${title}' obtenido exitosamente.`,
      album,
    });
  } catch (error) {
    // Manejo de errores
    response
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
});
```

### Explicación:

1. **Parámetro de consulta (`title`)**: Se obtiene el título del álbum usando `request.query.title`. Si el parámetro no se proporciona, la ruta devuelve un mensaje de error con estado `400`.

   - Ejemplo de consulta: `/api/album/by-title?title=Appetite for Destruction`

2. **Búsqueda insensible a mayúsculas/minúsculas**: Similar a la búsqueda por banda, se utiliza una expresión regular con la opción `"i"` para hacer la búsqueda insensible a mayúsculas/minúsculas.

3. **Manejo de errores**:
   - Si no se proporciona el título, devuelve un error `400` con un mensaje claro.
   - Si no se encuentra un álbum con el título especificado, devuelve un error `404`.
   - Si ocurre algún problema con la base de datos o el servidor, devuelve un error `500`.

### Ejemplo de Consulta:

- **Buscar un álbum con el título "Appetite for Destruction"**:
  - URL: `/api/album/by-title?title=Appetite for Destruction`

### Ejemplo de Respuesta Exitosa:

```json
{
  "message": "Álbum con título 'Appetite for Destruction' obtenido exitosamente.",
  "album": {
    "title": "Appetite for Destruction",
    "description": "El álbum debut que revolucionó el hard rock y el heavy metal.",
    "year": 1987,
    "band": "Guns N' Roses",
    "cover": "https://example.com/images/appetite_for_destruction.jpg"
  }
}
```

### Ejemplo de Error:

- **Si no se proporciona el título**:

  ```json
  {
    "message": "Debes proporcionar el título del álbum para realizar la búsqueda."
  }
  ```

- **Si no se encuentra un álbum con el título especificado**:
  ```json
  {
    "message": "No se encontró ningún álbum con el título: Appetite for Destruction"
  }
  ```

Este enfoque te permite buscar un álbum específico por su título de manera eficiente.
