import { conn } from "../db.js";

const getCanciones = async (_, res) => {

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

    const filas = await conn.query(`
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
    res.json(filas[0]);
};

const getCancion = async (req, res) => {

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

    const filas = await conn.query(
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

    res.json(filas[0])
};

const createCancion = async (req, res) => {

    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */

    const { nombre, album, duracion } = req.body

    await conn.query("INSERT INTO canciones (nombre, album, duracion, reproducciones) VALUES (?, ?, ?, 0)", [nombre, album, duracion])

    res.json({ nombre, album, duracion })
};

const updateCancion = async (req, res) => {

    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */

    const { nombre, album, duracion } = req.body
    const id = req.params.id

    await conn.query("UPDATE canciones SET nombre = ?, album = ?, duracion = ? WHERE id = ?", [nombre, album, duracion, id])

    res.json({ nombre, album, duracion })
};

const deleteCancion = async (req, res) => {

    const id = req.params.id

    await conn.query("DELETE FROM canciones WHERE id = ?", [id])

    res.json({ id })
};

const reproducirCancion = async (req, res) => {

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