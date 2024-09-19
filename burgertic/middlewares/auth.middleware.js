import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado o formato incorrecto" });
    }

    // Del header, se asigna el token a la variable 'token', ignorando el 'Bearer'
    const token = authHeader.split(" ")[1];

    try {
        const verification = jwt.verify(token, 'vigisoscra');
        req.userId = verification.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }

    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
};

export const verifyAdmin = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await UsuariosService.getUsuarioById(id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "ARAFUE" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    */
};
