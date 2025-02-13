//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Conexión con la DB
import getPool from '../../db/getPool.js';

//Función controladora que lista las temáticas de los Hackatones
const themesListController = async (req, res) => {
    try {
        const [themesHackathones] = await getPool.query(
            'SELECT themes FROM hackathonList'
        );
        res.status(200).json(themesHackathones);
    } catch (error) {
        generateErrorUtil(
            500,
            'Error al obtener las temáticas de los hackatones',
            error
        );
    }
};

export default themesListController;
