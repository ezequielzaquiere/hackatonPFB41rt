//TODO:TERMINAR Y COMPROBAR LAS HORAS
//TODO:MIRARA LA TABLA HACKATHONLANG ,ME PARECE QUE SOBRA EL programmingLangId INT UNSIGNED NOT NULL,
//TODO:FOREIGN KEY(programmingLangId) REFERENCES programmingLangs(id), EN HACKATHON LIST
//TODO:COMPROBAR SI UNA IMAGEN ES UNA IMAGEN? LO MISMO CON DOCS?
//Importar dependencias
import {
    differenceInDays,
    isAfter,
    isBefore,
    isValid,
    parseISO,
} from 'date-fns';
//Importar models
import insertHackathonModel from '../../models/hackathones/insertHackathonModel.js';

//Importar utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import saveImgUtil from '../../utils/saveImgUtil.js';
import saveDocUtil from '../../utils/saveDocUtil.js';

//Funcion controlladora que crea un nuevo hackathon (solo admin)
const newHackathonController = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            generateErrorUtil(401, 'No tienes los permisos necesarios');
        }

        const adminId = req.user.id;

        if (!req.body.data) {
            generateErrorUtil(400, 'Faltan los datos del Hackathon');
        }
        //Dado que enviamos un json y otros archivos, necesitamos parsear el objeto data(dodne mandamos el json)
        let hackathonData;
        try {
            hackathonData = JSON.parse(req.body.data);
        } catch {
            generateErrorUtil(400, 'Hay un error en el JSON');
        }

        const {
            title,
            summary,
            startingDate,
            deadline,
            type,
            location = 'En todas partes',
            themeId,
            programmingLangId,
            details,
        } = hackathonData;

        const image = req.files?.image;
        const attachedFile = req.files?.document;

        //Comprobamos si estan los datos imprescindibles
        if (
            !adminId ||
            !title ||
            !summary ||
            !startingDate ||
            !deadline ||
            !type ||
            !themeId ||
            !programmingLangId
        ) {
            generateErrorUtil(400, 'Faltan datos');
        }

        //Validamos si las fechas son validas
        //Parseamos las fechas para convertirlas en JS
        const parseStartingDate = parseISO(startingDate);
        const parseDeadline = parseISO(deadline);

        //Formato de las fechas
        if (!isValid(parseStartingDate)) {
            generateErrorUtil(400, 'Fecha de inicio no valida');
        }
        if (!isValid(parseDeadline)) {
            generateErrorUtil(400, 'Fecha de finalizacion no valida');
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
        if (differenceInDays(parseDeadline, parseStartingDate) < 2) {
            generateErrorUtil(
                400,
                'Tienes que dejar minimo un dia para que la gente se inscriba'
            );
        }

        //Si es presencial es obligatoria la localizacion
        if (
            type === 'presencial' &&
            (location === null || location === 'En todas partes')
        ) {
            generateErrorUtil(400, 'Faltan campo de localizacion');
        }

        //Manejo de archivos (imagenes y pdf)
        let docName = '';
        let imgName = '';
        //Si hay banner guardamos la imagen del banner
        if (image) {
            imgName = await saveImgUtil(image);
        }
        //Si hay un documento (solo pdf) lo guardamos
        if (attachedFile) {
            docName = await saveDocUtil(attachedFile);
        }

        await insertHackathonModel({
            adminId,
            title,
            summary,
            parseStartingDate,
            parseDeadline,
            type,
            themeId,
            location,
            programmingLangId,
            details,
            docName,
            imgName,
        });

        res.status(201).send({
            status: 'ok',
            message: 'Evento hackathon creado',
        });
    } catch (err) {
        next(err);
    }
};

export default newHackathonController;
