//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importamos la conexion a la base de datos
import getPool from '../../db/getPool.js';

//Funcion que obtiene si un hackathon tiene sus participantes públicos o no
const checkPublished = async (hackathonId) => {
    
    const pool = await getPool();

    const [hackathonList] = await pool.query(
        `SELECT h.resultsPublished
        FROM hackathonList h
        WHERE h.id = ?
        `,
        [hackathonId]
    );

    if (!hackathonList.length) {
        generateErrorUtil(404, 'Hackathon no encontrado');
    }


    return hackathonList[0];
};

export default checkPublished;
