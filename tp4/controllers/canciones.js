import { conn } from "../db.js";

const getCanciones = async (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */

    const rows = await conn.query(`
      SELECT 
        c.id,
        c.nombre,
        ar.nombre AS nombre_artista,
        al.nombre AS nombre_album,
        c.duracion,
        c.reproducciones
      FROM canciones c
      JOIN albumes al ON c.album = al.id
      JOIN artistas ar ON al.artista = ar.id
    `);
    res.json(rows[0]);
};

const getCancion = async (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */

    const id = req.params.id

    const rows = await conn.query(
        `SELECT 
            c.id,
            c.nombre,
            ar.nombre AS nombre_artista,
            al.nombre AS nombre_album,
            c.duracion,
            c.reproducciones
        FROM canciones c
        JOIN albumes al ON c.album = al.id
        JOIN artistas ar ON al.artista = ar.id
        WHERE c.id = ?`, [id]
    )

    res.json(rows[0])
};

const createCancion = async (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)

    const { nombre, album, duracion } = req.body

    await conn.query("INSERT INTO canciones (nombre, album, duracion, reproducciones) VALUES (?, ?, ?, 0)", [nombre, album, duracion])

    res.json({ nombre, album, duracion })
};

const updateCancion = async (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)

    const { nombre, album, duracion } = req.body
    const id = req.params.id

    await conn.query("UPDATE canciones SET nombre = ?, album = ?, duracion = ? WHERE id = ?", [nombre, album, duracion, id])

    res.json({ nombre, album, duracion })
};

const deleteCancion = async (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params.id

    await conn.query("DELETE FROM canciones WHERE id = ?", [id])

    res.json({ id })
};

const reproducirCancion = async (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params

    const id = req.params.id

    await conn.query("UPDATE canciones SET reproducciones = reproducciones + 1 WHERE id = ?", [id])

    res.json({ id })
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;