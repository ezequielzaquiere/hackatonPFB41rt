//Modelo que trae los hackathones a partir de la fecha de solicitud
import listNextHackathonesModel from '../../models/hackathones/listNextHackathonesModel.js';

//Función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que trae los hackathones a partir de la fecha de solicitud
const listNextHackathonesController = async (req, res, next) => {
    try {
        //Obtener los hackathones
        const hackathones = await listNextHackathonesModel();

        //Respuesta
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
