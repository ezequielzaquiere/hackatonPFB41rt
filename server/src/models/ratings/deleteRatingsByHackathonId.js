//Importamos la conexion a la base de datos
import getPool from '../../db/getPool.js';

//Funcion que elimina las valoraciones de un hackathon segun el hackathonId
const deleteRatingsByHackathonId = async (hackathonId) => {
    const pool = await getPool();

    await pool.query(
        `
        DELETE FROM ratings WHERE hackathonId = ?
        `,
        [hackathonId]
    );
};

export default deleteRatingsByHackathonId;
