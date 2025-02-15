//Importar dependencias
import express from 'express';

//Importar middlewares
import isUserAuthMiddleware from '../middlewares/isUserAuthMiddleware.js';

//Importar funciones controladoras de hackathones
import {
    newHackathonController,
    listHackathonesController,
    listHackathonesThemesController,
} from '../controllers/hackathones/index.js';

//Crear router
const router = express.Router();

//Endpoint crear nuevo hackathon
router.post('/new', isUserAuthMiddleware, newHackathonController);

//Endpoint lista hackatones
router.get('/hackathones', listHackathonesController);

//Endpoint lista temáticas hackatones
router.get('/hackathones/themes', listHackathonesThemesController);

export default router;
