// Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importar el modelo
import listHackathonesLocationsModel from '../../models/hackathones/listHackathonesLocationsModel.js';

// Función controladora que lista los lenguajes de programacion de los Hackatones
const listHackathonesLocationsController = async (req, res, next) => {
    try {
        // Obtenemos los lenguajes de los hackathones
        const Locations = await listHackathonesLocationsModel();

        res.send({
            status: 'ok',
            data: Locations,
        });
    } catch (error) {
        const customError = generateErrorUtil(
            500,
            'Error al obtener los localizaciones'
        );
        res.status(customError.status).send(customError);
    }
};

export default listHackathonesLocationsController;
