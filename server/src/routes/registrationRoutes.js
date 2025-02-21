//Importar dependencias
import express from 'express';

//Importar middlewares
import {
    isUserAuthMiddleware,
    hackathonRegistrationStatusMiddleware,
    isHackathonAvaliableMiddleware,
    isDevMiddleware,
} from '../middlewares/index.js';

//Importar funciones controladoras
import {
    registerHackathonController,
    confirmRegistrationHackathonController,
    cancelRegistrationController,
    listHackathonParticipantsController,
    listUserRegistrationsController,
} from '../controllers/registrations/index.js';
//Crear router
const router = express.Router();

//Endpoint que registra a un usuario en un hackathon
router.post(
    '/:hackathonId',
    isUserAuthMiddleware,
    isDevMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    registerHackathonController
);

//Endpoint para enseñar hackathones en los que un usuario está registrado
router.get('/:userId/participations', listUserRegistrationsController);

//Endpoint para enseñar lista de usuarios registrados en un hackathon
router.get(
    '/:hackathonId/participants',
    listHackathonParticipantsController,
);

//Endpoint que confirma que un usuario participara en un hackathon
router.patch(
    '/:hackathonId/:confirmationCode',
    isUserAuthMiddleware,
    isDevMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    confirmRegistrationHackathonController
);

//Endpoint que cancela la inscripcion de usuario (No puede volver a inscribirse)
router.patch(
    '/:hackathonId',
    isUserAuthMiddleware,
    isDevMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    cancelRegistrationController
);
export default router;
