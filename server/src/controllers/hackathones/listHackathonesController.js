//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importar modelos necesarios
import listHackathonesModel from '../../models/hackathones/listHackathonesModel.js';

//Función controladora que lista los hackatones
const listHackathonesController = async (req, res, next) => {
    try {
        //Obtener los filtros (query params)
        const { title, creator } = req.query;

        //Obtener los hackathones
        const hackathones = await listHackathonesModel(title, creator);

        res.send({
            status: 'ok',
            data: {
                hackathones,
            },
        });
    } catch (error) {
        generateErrorUtil(500, 'Error al obtener la lista de hackathones');
    }
};

export default listHackathonesController;
