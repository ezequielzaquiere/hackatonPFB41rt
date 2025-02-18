//Imports
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Middleware que comprueba si el user es del tipo admin

const isAdminMiddleware = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            generateErrorUtil(401, 'No tienes los permisos de admin');
        }
        next();
    } catch (err) {
        next(err);
    }
};

export default isAdminMiddleware;
