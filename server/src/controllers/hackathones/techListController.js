// Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importar conexión con la base de datos
import getPool from '../../db/getPool.js';

// Controlador para listar las tecnologías utilizadas en los hackathones
const langsListController = async (req, res, next) => {
    try {
        const [langsHackathones] = await getPool().query(
            'SELECT programmingLang FROM programminglangs'
        );
        res.status(200).json(langsHackathones);
    } catch (error) {
        next(
            generateErrorUtil(
                500,
                'Error al obtener las tecnologías de los hackatones',
                error
            )
        );
    }
};

export default langsListController;
