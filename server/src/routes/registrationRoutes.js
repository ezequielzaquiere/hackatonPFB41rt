//Importar dependencias
import express from 'express';

//Importar middlewares
import {
    isUserAuthMiddleware,
    hackathonRegistrationStatusMiddleware,
    isHackathonAvaliableMiddleware,
} from '../middlewares/index.js';

//Importar funciones controladoras
import registerHackathonController from '../controllers/registrations/registerHackathonController.js';
//Crear router
const router = express.Router();

//Endpoint que registra a un usuario en un hackathon
router.post(
    '/:hackathonId',
    isUserAuthMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    registerHackathonController
);

export default router;
