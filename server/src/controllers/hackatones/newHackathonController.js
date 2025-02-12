//Import dependencias

//Import modals

//Importar utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion controlladora que crea un nuevo hackathon (solo admin)
const newHackathonController = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            generateErrorUtil(401, 'No tienes los permisos necesarios');
        }

        const {
            title,
            description,
            host, //Este no lo tengo claro
            theme,
            technologies,
            type,
            location, //Si es online podriamos poner Everywhere, Worldwide
            startingDate,
            finishingDate,
        } = req.body;

        const { image, document } = req.files;

        if (
            !title ||
            !description ||
            !host || //<=========================
            !theme ||
            !technologies ||
            !type ||
            !location ||
            !startingDate ||
            !finishingDate ||
            !req.files
        ) {
            generateErrorUtil(400, 'Faltan datos');
        }
        console.log(image);
        console.log(document);

        res.status(201).send({
            status: 'ok',
            message: 'Evento hackathon creado',
        });
    } catch (err) {
        next(err);
    }
};

export default newHackathonController;
