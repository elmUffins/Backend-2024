import Router from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------

export default router;
