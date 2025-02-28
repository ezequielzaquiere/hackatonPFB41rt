//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importar modelo
import listHackathonesThemesModel from '../../models/hackathones/listHackathonesThemesModel.js';

//Función controladora que lista las temáticas de los Hackatones
const listHackathonesThemesController = async (req, res) => {
    try {
        //Obtener los temas de los hackathones
        const hackathonesThemes = await listHackathonesThemesModel();

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
