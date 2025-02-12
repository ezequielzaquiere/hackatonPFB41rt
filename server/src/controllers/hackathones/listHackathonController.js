//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Conexión con la DB
import getPool from '../../db/getPool.js';

//Función controladora que lista los hackatones
const listHackathonController = async (req, res) => {
    try {
        const [hackathones] = await getPool.query('SELECT * FROM hackathones');
        res.status(200).json(hackathones);
    } catch (error) {
        generateErrorUtil(
            500,
            'Error al obtener las temáticas de los hackatones',
            error
        );
    }
};

export default listHackathonController;
