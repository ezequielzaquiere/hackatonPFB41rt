//Modelo que trae la lista de temas de los hackathones
import listHackathonesThemesModel from '../../models/hackathones/listHackathonesThemesModel.js';

//Función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que lista las temáticas de los Hackatones
const listHackathonesThemesController = async (req, res) => {
    try {
        //Obtener los temas de los hackathones
        const hackathonesThemes = await listHackathonesThemesModel();

        //Respuesta
        res.send({
            status: 'ok',
            data: {
                hackathonesThemes,
            },
        });
    } catch (error) {
        generateErrorUtil(
            500,
            'Error al obtener las temáticas de los hackathones'
        );
    }
};

export default listHackathonesThemesController;
