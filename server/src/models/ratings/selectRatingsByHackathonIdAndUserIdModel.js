//Importamos la conexion a la base de datos
import getPool from '../../db/getPool.js';

//Funcion que obtiene un rating específico dado un hackathonId y un userId
const selectRatingsByHackathonIdAndUserId = async (hackathonId, userId) => {

    const pool = await getPool();

    const ratings = await pool.query(
        'SELECT userId, hackathonId, rating FROM ratings WHERE hackathonId = ? AND userId = ?',
        [hackathonId, userId]
    );

    return ratings[0];
};

export default selectRatingsByHackathonIdAndUserId;