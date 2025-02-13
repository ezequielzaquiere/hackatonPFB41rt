//Importar dependencias
import express from 'express';

//Importar middlewares
import { isUserAuthMiddleware } from '../middlewares/index.js';

//Importar funciones controladoras
import {
    newHackathonController,
    themesListController,
    listHackathonController,
    joinHackathonController,
} from '../controllers/hackathones/index.js';

//Crear router
const router = express.Router();

//Endpoint crear nuevo hackathon
router.post('/new', isUserAuthMiddleware, newHackathonController);

//Endpoint que une a un hackathon
router.post('/join', joinHackathonController);

//Endpoint que confirma que un usuario participara
router.put('/join/:confirmCode');

//Endpoint lista hackatones
router.get('/hackathones', listHackathonController);

//Endpoint lista temáticas hackatones
router.get('/themesList', isUserAuthMiddleware, themesListController);

export default router;
