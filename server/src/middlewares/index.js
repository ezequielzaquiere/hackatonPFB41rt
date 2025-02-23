//Importar midllewares
import isUserAuthMiddleware from './isUserAuthMiddleware.js';
import isHackathonAvaliableMiddleware from './isHackathonAvaliableMiddleware.js';
import hackathonRegistrationStatusMiddleware from './hackathonRegistrationStatusMiddleware.js';
import isAdminMiddleware from './isAdminMiddleware.js';
import isDevMiddleware from './isDevMiddleware.js';
import areHackathonResultsPublishedMiddleware from './areHackathonResultsPublishedMiddleware.js';

//Exportar los middlewares en un solo objeto
export {
    isUserAuthMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    isAdminMiddleware,
    isDevMiddleware,
    areHackathonResultsPublishedMiddleware,
};
