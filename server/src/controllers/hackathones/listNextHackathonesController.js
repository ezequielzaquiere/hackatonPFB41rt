//Importar modelos necesarios
import listNextHackathonesModel from '../../models/hackathones/listNextHackathonesModel.js';

//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que lista los hackatones
const listNextHackathonesController = async (req, res, next) => {
    try {
        //Obtener los hackathones
        const hackathones = await listNextHackathonesModel();

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

export default listNextHackathonesController;
