//Importar dependencias
import express from 'express';

//Importar middlewares
import isUserAuthMiddleware from '../middlewares/isUserAuthMiddleware.js';
import isHackathonAvaliableMiddleware from '../middlewares/isHackathonAvaliableMiddleware.js';
//Importar funciones controladoras de hackathones
import {
    newHackathonController,
    listHackathonesController,
    listHackathonesThemesController,
    editHackathonController,
} from '../controllers/hackathones/index.js';

//Crear router
const router = express.Router();

//Endpoint crear nuevo hackathon
router.post('/new', isUserAuthMiddleware, newHackathonController);

//Endpoint que permite modificar la informacion de un hackathon
router.put(
    '/:hackathonId',
    isUserAuthMiddleware,
    isHackathonAvaliableMiddleware,
    //TODO:IGUAL HACE FALTA ALGO MAS?
    editHackathonController
);

//Endpoint lista hackatones
router.get('/hackathones', listHackathonesController);

//Endpoint lista temáticas hackatones
router.get('/hackathones/themes', listHackathonesThemesController);

export default router;
