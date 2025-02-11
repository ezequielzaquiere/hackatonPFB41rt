//Imports

import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Middleware que comprueba si el user esta autenticado.

const isUserAuthMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateErrorUtil(401, 'No estás autenticado');
        }
        try {
            const tokenData = jwt.verify(authorization, process.env.SECRET);

            req.user = tokenData;

            next();
        } catch (err) {
            console.error(err);

            generateErrorUtil(401, 'Token inválido o caducado');
        }
    } catch (err) {
        next(err);
    }
};

export default isUserAuthMiddleware;
