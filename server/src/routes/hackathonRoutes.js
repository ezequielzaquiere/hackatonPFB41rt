//Importar dependencias
import express from 'express';

//Importar middlewares
import {
    isUserAuthMiddleware,
    isHackathonAvaliableMiddleware,
    isAdminMiddleware,
    areHackathonResultsPublishedMiddleware,
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
    ratingHackathonController,
    filterHackathonesController,
    listHackathonParticipantsController,
    registerHackathonPositionsAndPublishController,
    bestHackathonesController,
} from '../controllers/hackathones/index.js';
import listNextHackathonesController from '../controllers/hackathones/listNextHackathonesController.js';

//Crear router
const router = express.Router();

//Endpoint crear nuevo hackathon
router.post(
    '/new',
    isUserAuthMiddleware,
    isAdminMiddleware,
    newHackathonController
);

//Endpoint que permite modificar la informacion de un hackathon
router.patch(
    '/:hackathonId',
    isUserAuthMiddleware,
    isAdminMiddleware,
    isHackathonAvaliableMiddleware,
    editHackathonController
);

//Endpoint que permite eliminar un hackathon y todo lo relacionado con el
router.delete(
    '/:hackathonId',
    isUserAuthMiddleware,
    isAdminMiddleware,
    deleteHackathonController
);

//Endpoint lista hackatones
router.get('/hackathones', listHackathonesController);

//Endpoint lista temáticas hackatones
router.get('/hackathones/themes', listHackathonesThemesController);

//Endpoint devuelve hackathones a partir de la fecha de solicitud
router.get('/hackathones/fromToday', listNextHackathonesController);

//Endpoint tres mejores hackathones por rating
router.get('/hackathones/bestHackathones', bestHackathonesController);

// Ruta para obtener los detalles de un hackathon específico por ID
router.get('/hackathones/details/:id', hackathonDetailController);

// Ruta para obtener la lista de tecnologías de los hackathones
router.get('/hackathones/langs', listHackathonesLangsController);

//Ruta rating de un hackathon
router.post(
    '/:hackathonId/ratings',
    isUserAuthMiddleware,
    ratingHackathonController
);

//Endpoint para enseñar lista pública de usuarios registrados en un hackathon
router.get(
    '/:hackathonId/participants',
    areHackathonResultsPublishedMiddleware,
    listHackathonParticipantsController
);

//Endpoint para que admins puedan ver la lista de usuarios registrados en su hackathon
router.get(
    '/:hackathonId/participants/private',
    listHackathonParticipantsController
);

//Ruta para postear el podio y hacer pública la lista de participantes
router.post(
    '/:hackathonId/publish',
    registerHackathonPositionsAndPublishController
);

//Endpoint que filtra hackathones.
router.get('/hackathones/filter', filterHackathonesController);

export default router;
