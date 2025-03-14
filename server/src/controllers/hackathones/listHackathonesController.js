//Modelo que trae todos los hackathones creados
import listHackathonesModel from '../../models/hackathones/listHackathonesModel.js';

//Función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que lista todos los hackatones creados
const listHackathonesController = async (req, res, next) => {
    try {
        //Obtener los hackathones
        const hackathones = await listHackathonesModel();

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

export default listHackathonesController;
