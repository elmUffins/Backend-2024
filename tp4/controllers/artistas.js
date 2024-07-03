import { conn } from "../db.js";

const getArtistas = async (_, res) => {

    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */

    const filas = await conn.query("SELECT * FROM artistas")

    res.json(filas[0])
};

const getArtista = async (req, res) => {

    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */

    const id = req.params.id

    const filas = await conn.query("SELECT * FROM artistas WHERE id = ?", [id])

    res.json(filas[0])

};

const createArtista = async (req, res) => {

    /*
        {
            "nombre": "Nombre del artista",
        }
    */

    const { nombre } = req.body

    await conn.query("INSERT INTO artistas (nombre) VALUES (?)", [nombre])

    res.json({ nombre })
};

const updateArtista = async (req, res) => {

    /*
        {
            "nombre": "Nombre del artista"
        }
    */

    const { nombre } = req.body
    const id = req.params.id

    await conn.query("UPDATE artistas SET nombre = ? WHERE id = ?", [nombre, id])

    res.json({ nombre })
};

const deleteArtista = async (req, res) => {

    const id = req.params.id

    await conn.query("DELETE FROM artistas WHERE id = ?", [id])

    res.json({ id })
};

const getAlbumesByArtista = async (req, res) => {

    const id = req.params.id

    const filas = await conn.query(`
        SELECT
            al.id,
            al.nombre,
            ar.nombre AS nombre_artista
            FROM albumes al
            JOIN artistas ar ON al.artista = ar.id
            WHERE ar.id = ?`, [id])

    res.json(filas[0])
};

const getCancionesByArtista = async (req, res) => {

    const id = req.params.id

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
        WHERE ar.id = ?`, [id])

    res.json(filas[0])
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;
