//Importar dependencias
import express from 'express';

// Importamos los middlewares.
import isUserAuthMiddleware from '../middlewares/isUserAuthMiddleware.js';

//Importar funciones controladoras
import {
    privateUserProfileController,
    registerUserController,
    loginUserController,
    updateActivateUserController,
    sendRecoveryPassEmailController,
    useRecoveryPassCodeController,
    updateUserProfileController,
    updateUserPassController,
} from '../controllers/users/index.js';

//Crear router
const router = express.Router();

//Endpoint para registrar usuario
router.post('/register', registerUserController);

//Activar un usuario
router.put('/validate/:regCode', updateActivateUserController);

//Endpoint para login usuario
router.post('/login', loginUserController);

// Información privada del usuario.
router.get('/:id', isUserAuthMiddleware, privateUserProfileController);

//Endpoint para cambiar la contraseña dada la actual.
router.put('/password/change', updateUserPassController);

// Enviar código de recuperación de contraseña al email del usuario.
router.put('/password/reset', sendRecoveryPassEmailController);

// Actualiza la contraseña de un usuario con un código de recuperación.
router.put('/password/reset/:recoverPassCode', useRecoveryPassCodeController);

//Endpoint que muestra los datos del usuario.
router.put('/profile', updateUserProfileController);

//Endpoint que muestra los datos del usuario.
router.get('/profile', updateUserProfileController);

//Endpoint que edita los datos del usuario.
router.put(
    '/profile/edit/:id',
    isUserAuthMiddleware,
    updateUserProfileController
);

export default router;
