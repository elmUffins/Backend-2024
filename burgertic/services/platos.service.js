import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const getPlatos = async () => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query("SELECT * FROM platos");

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPlatoById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM platos WHERE id = $1",
            [id]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const createPlato = async (plato) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO platos (tipo, nombre, precio, descripcion) VALUES ($1, $2, $3, $4)",
            [plato.tipo, plato.nombre, plato.precio, plato.descripcion]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const updatePlato = async (id, plato) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "UPDATE platos SET tipo = $1, nombre = $2, precio = $3, descripcion = $4 WHERE id = $5",
            [plato.tipo, plato.nombre, plato.precio, plato.descripcion, id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const deletePlato = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "DELETE FROM platos WHERE id = $1",
            [id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPlatosByTipo = async (tipo) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM platos WHERE tipo = $1",
            [tipo]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

export default {
    getPlatos,
    getPlatoById,
    createPlato,
    updatePlato,
    deletePlato,
    getPlatosByTipo,
};
