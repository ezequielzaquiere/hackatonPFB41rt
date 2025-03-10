//Imports
import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';
import selectUserByIdModel from '../models/users/selectUserByIdModel.js';
//Middleware que comprueba si el user esta autenticado.

const isUserAuthMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateErrorUtil(401, 'No estás autenticado');
        }
        try {
            const tokenData = jwt.verify(authorization, process.env.SECRET);

            //Ultima fecha de modificacion de la contraseña
            const user = await selectUserByIdModel(tokenData.id);

            const lastAuthUpdate = new Date(user.lastAuthUpdate);

            //Fecha de emision del token
            const tokenEmissionDate = new Date(tokenData.iat * 1000);

            //Comparamos la fecha de emision del token conla ultima actualizacion
            if (tokenEmissionDate < lastAuthUpdate) {
                generateErrorUtil(401, 'Token no valido');
            }

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
