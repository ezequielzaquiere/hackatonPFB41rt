//TODO:MIRARA LA TABLA HACKATHONLANG ,ME PARECE QUE SOBRA EL programmingLangId INT UNSIGNED NOT NULL,
//TODO:FOREIGN KEY(programmingLangId) REFERENCES programmingLangs(id), EN HACKATHON LIST
//TODO:COMPROBAR SI UNA IMAGEN ES UNA IMAGEN? LO MISMO CON DOCS?
//Importar models
import insertHackathonModel from '../../models/hackathones/insertHackathonModel.js';

//Importar utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import saveImgUtil from '../../utils/saveImgUtil.js';
import saveDocUtil from '../../utils/saveDocUtil.js';
import validateDatesUtil from '../../utils/validateDatesUtil.js';

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

        //Comprobamos si las fechas son correctas
        const { formatedStartingDate, formatedDeadline } = validateDatesUtil(
            startingDate,
            deadline
        );

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
        //Si hay imagen guardamos la imagen (necesario poner el tipo)
        if (image) {
            imgName = await saveImgUtil(image, 'imgHack');
        }
        //Si hay un documento (solo pdf) lo guardamos
        if (attachedFile) {
            docName = await saveDocUtil(attachedFile);
        }

        await insertHackathonModel({
            adminId,
            title,
            summary,
            formatedStartingDate,
            formatedDeadline,
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
