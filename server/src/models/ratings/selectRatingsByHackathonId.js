//Importamos la conexion a la base de datos
import getPool from '../../db/getPool.js';

//Funcion que obtiene los ratings de un hackathon concreto por hackathonId
const selectRatingsByHackathonId = async (hackathonId) => {
    const pool = await getPool();

    const [ratings] = await pool.query(
        'SELECT userId, rating FROM ratings WHERE hackathonId = ?',
        [hackathonId]
    );

    return ratings;
};

export default selectRatingsByHackathonId;
