//Importamos dependencias
import { isAfter, isEqual, differenceInDays, parseISO } from 'date-fns';
//Importamos model
import selectHackathoByIdModel from '../models/hackathones/selectHackathonByIdModel.js';
//Importamos util
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Funcion que coprueba si el hackathon sigue activo
const isHackathonAvaliableMiddleware = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;

        //Obtenemos los datos del hackathon (nos interesa fecha de finalizacion)
        const hackathon = await selectHackathoByIdModel(hackathonId);

        const now = new Date();
        const dateDeadline = parseISO(hackathon.deadline);

        //Comparamos las fechas para saber si el hackathon a finalizado
        if (isAfter(now, dateDeadline) || isEqual(now, dateDeadline)) {
            generateErrorUtil(400, 'El hackathon a terminado');
        }

        //Comparamos las fechas para saber si alguien todavia puede darse de baja o inscribirse
        if (differenceInDays(dateDeadline, now) < 1) {
            generateErrorUtil(
                400,
                'Se ha pasado el plazo de modificacion de inscripcion.'
            );
        }

        next();
    } catch (err) {
        next(err);
    }
};
export default isHackathonAvaliableMiddleware;
