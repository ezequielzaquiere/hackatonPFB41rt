//Importar modelos necesarios
import listHackathonesModel from '../../models/hackathones/listHackathonesModel.js';

//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que lista los hackatones
const listHackathonesController = async (req, res, next) => {
    try {
        //Obtener los hackathones
        const hackathones = await listHackathonesModel();

        res.send({
            status: 'ok',
            data: {
                hackathones,
            },
        });
    } catch (error) {
        generateErrorUtil(
            500,
            'Error al obtener la lista de hackathones',
            error
        );
    }
};

export default listHackathonesController;
