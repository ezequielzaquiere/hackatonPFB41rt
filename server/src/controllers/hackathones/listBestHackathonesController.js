//Modelo que trae los 3 mejores hackathones valorados por avgRating
import listBestHackathonesModel from '../../models/hackathones/listBestHackathonesModel.js';

//Función generadora de errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que lista los tres mejores hackatones valorados por avgRating
const listBestHackathonesController = async (req, res, next) => {
    try {
        //Obtener los hackathones
        const [listBestHackathones] = await listBestHackathonesModel();

        //Respuesta
        res.send({
            status: 'ok',
            data: {
                listBestHackathones,
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

export default listBestHackathonesController;
