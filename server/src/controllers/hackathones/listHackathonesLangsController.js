// Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importar el modelo
import listHackathonesLangModel from '../../models/hackathones/listHackathonesLangsModel.js';

// Función controladora que lista los lenguajes de programacion de los Hackatones
const listHackathonesLangsController = async (req, res, next) => {
    try {
        // Obtenemos los lenguajes de los hackathones
        const hackathonesLang = await listHackathonesLangModel();

        res.send({
            status: 'ok',
            data: hackathonesLang,
        });
    } catch (error) {
        const customError = generateErrorUtil(
            500,
            'Error al obtener los lenguajes de los hackathones'
        );
        res.status(customError.status).send(customError);
    }
};

export default listHackathonesLangsController;
