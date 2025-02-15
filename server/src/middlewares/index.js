//Importar midllewares
import isUserAuthMiddleware from './isUserAuthMiddleware.js';
import hackathonRegistrationStatusMiddleware from './hackathonRegistrationStatusMiddleware.js';
import isHackathonAvaliableMiddleware from './isHackathonAvaliableMiddleware.js';

//Exportar los middlewares en un solo objeto
export {
    isUserAuthMiddleware,
    hackathonRegistrationStatusMiddleware,
    isHackathonAvaliableMiddleware,
};
