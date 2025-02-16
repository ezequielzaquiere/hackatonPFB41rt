//Importar midllewares
import isUserAuthMiddleware from './isUserAuthMiddleware.js';
import isHackathonAvaliableMiddleware from './isHackathonAvaliableMiddleware.js';
import hackathonRegistrationStatusMiddleware from './hackathonRegistrationStatusMiddleware.js';

//Exportar los middlewares en un solo objeto
export {
    isUserAuthMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
};
