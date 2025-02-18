// Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importar el modelo
import listHackathonesLangModel from '../../models/hackathones/listHackathonesLangsModel.js';

// Función controladora que lista las temáticas de los Hackatones
const listHackathonesLangsController = async (req, res, next) => {
    try {
        // Obtener los filtros (query params)
        const { hackathon, programmingLangs } = req.query;

        // Obtenemos los lenguajes de los hackathones
        const hackathonesLang = await listHackathonesLangModel(
            hackathon,
            programmingLangs
        );

        res.send({
            status: 'ok',
            data: { hackathonesLang }, // se envían los datos obtenidos del modelo
        });
    } catch (error) {
        const customError = generateErrorUtil(
            500,
            'Error al obtener los lenguajes de los hackathones',
            error
        );
        res.status(customError.status).send(customError);
    }
};

export default listHackathonesLangsController;
