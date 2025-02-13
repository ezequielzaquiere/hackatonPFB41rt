//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importar modelos necesarios
import listHackathonModel from '../../models/listHackathonModel.js';

//Función controladora que lista los hackatones
const listHackathonController = async (req, res, next) => {
    try {
        //Obtener los filtros (query params)
        const { title, creator } = req.query;

        //Obtener los hackathones
        const hackathones = await listHackathonModel(title, creator);

        res.status(200).sned({
            status: 'ok',
            data: {
                hackathones,
            },
        });
    } catch (error) {
        generateErrorUtil(
            500,
            'Error al obtener las temáticas de los hackathones',
            error
        );
    }
};

export default listHackathonController;
