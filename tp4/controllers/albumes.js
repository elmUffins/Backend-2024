import { conn } from "../db.js";

const getAlbumes = async (_, res) => {

    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */

    const rows = await conn.query(`
        SELECT
            al.id,
            al.nombre,
            ar.nombre AS nombre_artista
        FROM albumes al
        JOIN artistas ar ON al.artista = ar.id
    `)

    res.json(rows[0])
};

const getAlbum = async (req, res) => {

    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */

    const id = req.params.id

    const rows = await conn.query(`
        SELECT
            al.id,
            al.nombre,
            ar.nombre AS nombre_artista
        FROM albumes al
        JOIN artistas ar ON al.artista = ar.id
        WHERE al.id = ?
    `, [id])

    res.json(rows[0])
};

const createAlbum = async (req, res) => {

    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

    const { nombre, artista } = req.body

    await conn.query("INSERT INTO albumes (nombre, artista) VALUES (?, ?)", [nombre, artista])

    res.json({ nombre, artista })
};

const updateAlbum = async (req, res) => {

    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

    const { nombre, artista } = req.body
    const id = req.params.id

    await conn.query("UPDATE albumes SET nombre = ?, artista = ? WHERE id = ?", [nombre, artista, id])

    res.json({ nombre, artista })
};

const deleteAlbum = async (req, res) => {

    const id = req.params.id

    await conn.query("DELETE FROM albumes WHERE id = ?", [id])

    res.json({ id })
};

const getCancionesByAlbum = async (req, res) => {

    const id = req.params.id

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
        WHERE al.id = ?
    `, [id])

    res.json(rows[0])
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;