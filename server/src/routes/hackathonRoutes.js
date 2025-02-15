//Importar dependencias
import express from 'express';

//Importar middlewares
import { isUserAuthMiddleware } from '../middlewares/index.js';

//Importar funciones controladoras
import {
    newHackathonController,
    listHackathonesController,
    listHackathonesThemesController,
    joinHackathonController,
} from '../controllers/hackathones/index.js';

//Crear router
const router = express.Router();

//Endpoint crear nuevo hackathon
router.post('/new', isUserAuthMiddleware, newHackathonController);

//Endpoint lista hackatones
router.get('/hackathones', listHackathonesController);

//Endpoint lista temáticas hackatones
router.get('/hackathones/themes', listHackathonesThemesController);

//Endpoint que registra a un usuario en un hackathon
router.post(
    '/:hackathonId/join',
    isUserAuthMiddleware,
    joinHackathonController
);

//Endpoint que confirma que un usuario participara en un hackathon //TODO:COMPROBAR SI YA HA CONFIRMADO(MIDDLEWARE?)
router.put('/:hackathonId/join/:confirmationCode');

export default router;
