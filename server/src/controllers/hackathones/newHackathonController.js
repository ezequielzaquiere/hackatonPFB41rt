//Import models
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

        if (req.body.data) {
            generateErrorUtil(400, 'Faltan los datos del Hackathon');
        }
        //Dado que enviamos un json y otros archivos, necesitamos parsear el objeto data(dodne mandamos el json)
        const hackathonData = JSON.parse(req.body.data);

        const {
            title,
            summary,
            description,
            theme,
            technologies,
            type,
            location = 'En todas partes',
            startingDate,
            finishingDate,
        } = hackathonData;

        const banner = req.files?.banner;
        const document = req.files?.document;

        //El banner es oligatorio //TODO: SI NO LO ES, PODEMOS INDICAR LA IMAGEN PREDETERMINADA?
        if (!banner) {
            generateErrorUtil(400, 'El banner es obligatorio');
        }
        //Si es presencial es obligatoria la localizacion
        if (type === 'presencial' && location === '') {
            generateErrorUtil(400, 'Faltan campo de localizacion');
        }

        if (
            !title ||
            !summary ||
            !description ||
            !theme ||
            !technologies ||
            !type ||
            !location ||
            !startingDate ||
            !finishingDate ||
            !banner
        ) {
            generateErrorUtil(400, 'Faltan datos');
        }

        //Guardamos la imagen del banner  //TODO<=================
        const imgName = await saveImgUtil(
            banner /*TODO:FALTA WIDTH DE LOS BANNERS*/
        );

        let docName = '';
        //Si hay un documento (solo pdf) lo guardamos
        if (document) {
            docName = await saveDocUtil(document);
        }

        await insertHackathonModel({
            adminId,
            title,
            summary,
            description,
            theme,
            technologies,
            type,
            location,
            startingDate,
            finishingDate,
            imgName,
            docName,
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
