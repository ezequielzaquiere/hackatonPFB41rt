//Imports
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Middleware que comprueba si el user es del tipo dev

const isDevMiddleware = (req, res, next) => {
    try {
        if (req.user.role !== 'dev') {
            generateErrorUtil(401, 'No tienes los permisos de dev');
        }
        next();
    } catch (err) {
        next(err);
    }
};

export default isDevMiddleware;
