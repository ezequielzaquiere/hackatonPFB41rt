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
    listHackathonesLangsController,
    hackathonDetailController,
} from '../controllers/hackathones/index.js';

//Crear router
const router = express.Router();

//Endpoint crear nuevo hackathon
router.post('/new', isUserAuthMiddleware, newHackathonController);

//Endpoint que registra a un usuario en un hackathon
router.post(
    '/:hackathonId/join',
    isUserAuthMiddleware,
    joinHackathonController
);

//Endpoint que confirma que un usuario participara en un hackathon //TODO:COMPROBAR SI YA HA CONFIRMADO(MIDDLEWARE?)
router.put('/:hackathonId/join/:confirmationCode');

//Endpoint lista hackatones
router.get('/hackathones', listHackathonesController);

//Endpoint lista temáticas hackatones
router.get('/hackathones/themes', listHackathonesThemesController);

// Ruta para obtener la lista de tecnologías de los hackathones
router.get('/hackathones/Langs', listHackathonesLangsController);

// Ruta para obtener los detalles de un hackathon específico por ID
router.get('/hackathones/:id', hackathonDetailController);

export default router;
