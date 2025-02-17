//Importamos dependencias
import { isAfter, isEqual, differenceInHours } from 'date-fns';
//Importamos model
import selectHackathonDetailsByIdModel from '../models/hackathones/selectHackathonDetailsByIdModel.js';
//Importamos util
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Funcion que coprueba si el hackathon sigue activo
const isHackathonAvaliableMiddleware = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;

        //Obtenemos los datos del hackathon (nos interesa fecha de finalizacion)
        const hackathon = await selectHackathonDetailsByIdModel(hackathonId);

        //Lanzamos error si no existe
        if (!hackathon) {
            generateErrorUtil(400, 'El hackathon no existe');
        }

        //Fechas
        const now = new Date();
        const dateDeadline = hackathon.deadline;

        //Comparamos las fechas para saber si el hackathon a finalizado
        if (isAfter(now, dateDeadline) || isEqual(now, dateDeadline)) {
            generateErrorUtil(400, 'El hackathon a terminado');
        }

        //Comparamos las fechas para saber si alguien todavia puede darse de baja o inscribirse
        if (differenceInHours(dateDeadline, now) < 24) {
            generateErrorUtil(
                400,
                'Se ha pasado el plazo de modificacion de la inscripcion.'
            );
        }

        next();
    } catch (err) {
        next(err);
    }
};
export default isHackathonAvaliableMiddleware;
