//Importar dependencias
import express from 'express';

// Importamos los middlewares.
import isUserAuthMiddleware from '../middlewares/isUserAuthMiddleware.js';

//Importar funciones controladoras
import {
    privateUserProfileController,
    registerUserController,
    changePasswordController,
    loginUserController,
    activateUserController,
} from '../controllers/users/index.js';

//Crear router
const router = express.Router();

//Endpoint para registrar usuario
router.post('/register', registerUserController);

//Endpoint para login usuario
router.post('/login', loginUserController);

//Cambiar contraseña
router.post('/changePassword', changePasswordController);

// Información privada del usuario.
router.get('/:id', isUserAuthMiddleware, privateUserProfileController);

//Activar un usuario
router.put('/validate/:regCode', activateUserController);

export default router;
