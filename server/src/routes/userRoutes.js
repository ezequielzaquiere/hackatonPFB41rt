//Importar dependencias
import express from 'express';

//Importar middlewares
import { isUserAuthMiddleware } from '../middlewares/index.js';
//Importar funciones controladoras
import {
    registerUserController,
    changePasswordController,
} from '../controllers/users/index.js';

//Crear router
const router = express.Router();

//Endpoint para registrar usuario
router.post('/register', registerUserController);

//Cambiar contraseña
router.post('/changePassword', changePasswordController);

export default router;
