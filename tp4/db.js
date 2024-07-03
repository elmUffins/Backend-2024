import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

// Guardamos las variables de entorno en un archivo .env para mantener buenas prácticas de seguridad
export const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});