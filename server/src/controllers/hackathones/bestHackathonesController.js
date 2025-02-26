//Importar modelos
import bestHackathonesModel from '../../models/hackathones/bestHackathonesModel.js';

//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que lista los hackatones
const bestHackathonesController = async (req, res, next) => {
    try {
        //Obtener los hackathones
        const [bestHackathones] = await bestHackathonesModel();
        res.send({
            status: 'ok',
            data: {
                bestHackathones,
            },
        });
    } catch (error) {
        generateErrorUtil(
            500,
            'Error al obtener los mejores hackathones',
            error
        );
    }
};

export default bestHackathonesController;
