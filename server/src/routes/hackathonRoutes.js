//Importar dependencias
import express from 'express';

//Importar middlewares
import {
    isUserAuthMiddleware,
    isHackathonAvaliableMiddleware,
} from '../middlewares/index.js';

//Importar funciones controladoras
import {
    newHackathonController,
    listHackathonesController,
    listHackathonesThemesController,
    listHackathonesLangsController,
    hackathonDetailController,
    editHackathonController,
    deleteHackathonController,
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
    editHackathonController
);

//Endpoint que permite eliminar un hackathon y todo lo relacionado con el
router.delete('/:hackathonId', isUserAuthMiddleware, deleteHackathonController);

//Endpoint lista hackatones
router.get('/hackathones', listHackathonesController);

//Endpoint lista temáticas hackatones
router.get('/hackathones/themes', listHackathonesThemesController);

// Ruta para obtener los detalles de un hackathon específico por ID
router.get('/hackathones/:id', hackathonDetailController);

// Ruta para obtener la lista de tecnologías de los hackathones
router.get('/hackathones/Langs', listHackathonesLangsController);

export default router;
