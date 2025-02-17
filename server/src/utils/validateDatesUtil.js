//TODO:REVISAR LAS FECHAS PORQUE AL UPDATE HACE ALGO RARO
//Importamos las dependencias
import {
    differenceInHours,
    format,
    isAfter,
    isBefore,
    isValid,
    parseISO,
} from 'date-fns';
//Importamos los utils
import generateErrorUtil from './generateErrorUtil.js';

const validateDatesUtil = (startingDate, deadline) => {
    try {
        //Parseamos las fechas para convertirlas en JS
        const parseStartingDate = parseISO(startingDate);
        const parseDeadline = parseISO(deadline);

        //Formato de las fechas
        if (!isValid(parseStartingDate)) {
            generateErrorUtil(400, 'Formato de fecha de inicio no valida');
        }
        if (!isValid(parseDeadline)) {
            generateErrorUtil(
                400,
                'Formato de fecha de finalizacion no valida'
            );
        }

        //Si la fecha de inicio es posterior a la fecha actual
        const now = new Date();
        if (!isBefore(now, parseStartingDate)) {
            generateErrorUtil(
                400,
                'La fecha de inicio no puede ser anterior a la fecha actual'
            );
        }

        //Si la fecha de deadline es posterior a la de inicio
        if (!isAfter(parseDeadline, parseStartingDate)) {
            generateErrorUtil(
                400,
                'La fecha de finalizacion tiene que ser posterior a la fecha de inicio'
            );
        }

        //Si hay mas de un dia de diferencia entre las fechas //TODO: REVISAR BIEN QUE ES UN LIO SE PUEDEN USAR HORAS TAMBIEN
        if (differenceInHours(parseDeadline, parseStartingDate) < 24) {
            generateErrorUtil(
                400,
                'Tienes que dejar minimo un dia para que la gente se inscriba'
            );
        }

        //Formateamos las fechas para que no haya problemas a la hora de subirlas a la BD
        const formatedStartingDate = format(
            parseStartingDate,
            'yyyy-MM-dd HH:mm:ss'
        );
        const formatedDeadline = format(parseDeadline, 'yyyy-MM-dd HH:mm:ss');

        //Devolvemos las fechas formateadas
        return { formatedStartingDate, formatedDeadline };
    } catch (err) {
        console.error(err);

        generateErrorUtil(500, 'Error al validar las fechas');
    }
};

export default validateDatesUtil;
