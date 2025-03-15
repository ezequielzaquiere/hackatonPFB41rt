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
    listHackathonesThemesController,
    listHackathonesLangsController,
    hackathonDetailController,
    editHackathonController,
    deleteHackathonController,
    ratingHackathonController,
    filterHackathonesController,
    listHackathonParticipantsController,
    registerHackathonPositionsAndPublishController,
    listBestHackathonesController,
    selectRatingsByHackathonIdAndUserIdController,
    listHackathonesLocationsController,
    listNextHackathonesController,
} from '../controllers/hackathones/index.js';

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

//Endpoint que lista todas las temáticas de los hackatones
router.get('/hackathones/themes', listHackathonesThemesController);

//Endpoint que devuelve todos los hackathones a partir de la fecha de solicitud
router.get('/hackathones/fromToday', listNextHackathonesController);

//Endpoint que devuelve los tres mejores hackathones por avgRating
router.get('/hackathones/bestHackathones', listBestHackathonesController);

// Ruta para obtener los detalles de un hackathon específico por ID
router.get('/hackathones/details/:id', hackathonDetailController);

// Ruta para obtener la lista de tecnologías de los hackathones
router.get('/hackathones/langs', listHackathonesLangsController);

// Ruta para obtener la lista de localizaciones
router.get('/hackathones/location', listHackathonesLocationsController);

//Ruta rating de un hackathon
router.post(
    '/:hackathonId/ratings',
    isUserAuthMiddleware,
    ratingHackathonController
);

//Ruta rating de un hackathon dado un userId
router.get(
    '/:hackathonId/ratings/:userId',
    selectRatingsByHackathonIdAndUserIdController
);

//Endpoint para que admins puedan ver la lista de usuarios registrados en su hackathon
router.get(
    '/:hackathonId/participants/private',
    listHackathonParticipantsController
);

//Ruta para postear el podio y hacer pública la lista de participantes
router.post(
    '/:hackathonId/publish',
    isUserAuthMiddleware,
    isAdminMiddleware,
    registerHackathonPositionsAndPublishController
);

//Endpoint que filtra hackathones.
router.get('/hackathones/filter', filterHackathonesController);

export default router;
