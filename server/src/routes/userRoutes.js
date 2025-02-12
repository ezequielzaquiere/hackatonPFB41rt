//Importar dependencias
import express from 'express';

//Importar middlewares

//Importar funciones controladoras
import {
    registerUserController,
    changePasswordController,
    loginUserController,
} from '../controllers/users/index.js';

//Crear router
const router = express.Router();

//Endpoint para registrar usuario
router.post('/register', registerUserController);

//Endpoint para login usuario
router.post('/login', loginUserController);

//Cambiar contraseña
router.post('/changePassword', changePasswordController);

export default router;
