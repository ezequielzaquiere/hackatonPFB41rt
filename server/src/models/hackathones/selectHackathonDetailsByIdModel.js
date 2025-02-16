//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importamos la conexion a la base de datos
import getPool from '../../db/getPool.js';

//Funcion que obtiene los detalles de un hackathon concreto por id
const selectHackathonDetailsByIdModel = async (hackathonId) => {
    const pool = await getPool();

    const [hackathon] = await pool.query(
        'SELECT title, summary, startingDate, deadline, type, location, themeId, details, attachedFile, image FROM hackathonList WHERE id = ?',
        [hackathonId]
    );
    if (!hackathon.length) {
        generateErrorUtil(404, 'Hackathon no encontrado');
    }
    return hackathon[0];
};

export default selectHackathonDetailsByIdModel;
