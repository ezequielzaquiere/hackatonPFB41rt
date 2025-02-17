//Importar dependencias
import express from 'express';

//Importar middlewares
import {
    isUserAuthMiddleware,
    hackathonRegistrationStatusMiddleware,
    isHackathonAvaliableMiddleware,
} from '../middlewares/index.js';

//Importar funciones controladoras
import {
    registerHackathonController,
    confirmRegistrationHackathonController,
} from '../controllers/registrations/index.js';
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

//Endpoint que confirma que un usuario participara en un hackathon
router.put(
    '/:hackathonId/:confirmationCode',
    isUserAuthMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    confirmRegistrationHackathonController
);
export default router;
