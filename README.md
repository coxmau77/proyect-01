EL proyecto ya esta [desplegado en Vercel](https://vercel.com/mauricios-projects-8b7b5bd9/proyect-01/DL3DEv664moYAcmDv8k3TkV7kpak) a modo de prueba.

[repo](https://github.com/coxmau77/proyect-01)

## Atgregar una canción

Claro, aquí tienes un ejemplo de cómo agregar una canción a un álbum usando la ruta `/:id/song/add`. Para este ejemplo, supongamos que tienes un álbum existente con el ID `12345abcdef` y deseas agregar una nueva canción.

### 1. Preparar la solicitud

Aquí hay un ejemplo de cómo se vería el cuerpo de la solicitud (en formato JSON) para agregar una canción:

```json
{
  "titulo": "New Song Title",
  "duracion": 240 // Duración en segundos
}
```

### 2. Realizar la solicitud

Si estás utilizando `Postman`, `curl` o cualquier cliente HTTP, aquí te muestro cómo hacer la solicitud POST.

#### Usando `Postman`

1. **Método:** `PUT`
2. **URL:** `http://localhost:3000/api/album/12345abcdef/song/add`
3. **Headers:**
   - `Content-Type: application/json`
4. **Body:** (Selecciona "raw" y luego "JSON")
   ```json
   {
     "titulo": "New Song Title",
     "duracion": 240
   }
   ```

#### Usando `curl`

Si prefieres usar `curl` en la terminal, la solicitud sería:

```bash
curl -X PUT http://localhost:3000/api/album/12345abcdef/song/add \
-H "Content-Type: application/json" \
-d '{
  "titulo": "New Song Title",
  "duracion": 240
}'
```

### 3. Respuesta esperada

Si la canción se agrega correctamente, deberías recibir una respuesta similar a esta:

```json
{
  "message": "Canción agregada exitosamente",
  "album": {
    "_id": "12345abcdef",
    "titulo": "Título del Álbum",
    "descripcion": "Descripción del Álbum",
    "anio": 2023,
    "canciones": [
      {
        "_id": "abc123",
        "titulo": "New Song Title",
        "duracion": 240
      }
      // otras canciones
    ],
    "portada": "https://example.com/album-cover.jpg"
  }
}
```

### Notas

- Asegúrate de que el álbum con ID `12345abcdef` exista en la base de datos antes de hacer la solicitud.
- Verifica que la canción no exista ya en el álbum para evitar errores de duplicados.
