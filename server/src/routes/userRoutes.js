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
    showUserInfoController,
    listUserRegistrationsController,
} from '../controllers/users/index.js';

//Crear router
const router = express.Router();

//Endpoint para registrar usuario
router.post('/register', registerUserController);

//Activar un usuario
router.patch('/validate/:regCode', updateActivateUserController);

//Endpoint para login usuario
router.post('/login', loginUserController);

// Información privada del usuario.
router.get('', isUserAuthMiddleware, privateUserProfileController);

//Endpoint para cambiar la contraseña dada la actual.
router.put('/password/change', isUserAuthMiddleware, updateUserPassController);

// Enviar código de recuperación de contraseña al email del usuario.
router.put('/password/reset', sendRecoveryPassEmailController);

// Actualiza la contraseña de un usuario con un código de recuperación.
router.put('/password/reset/:recoverPassCode', useRecoveryPassCodeController);

//Endpoint que muestra los datos del usuario.
router.get('/profile/:id', showUserInfoController);

//Endpoint para enseñar hackathones en los que un usuario está registrado
router.get('/profile/:id/participations', listUserRegistrationsController);

//Endpoint que edita los datos del usuario.
router.put('/profile/edit', isUserAuthMiddleware, updateUserProfileController);

export default router;
