// Importamos la función que conecta a la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y verifica si un usuario ha participado e un hackathon.
const checkUserParticipationModel = async (hackathonId, userId) => {
    // Obtenemos el pool.
    const pool = await getPool();

    const [result] = await pool.query(
        `SELECT id FROM registrations WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId]
    );
    // Retorna true si el usuario ha participado, false si no.
    return result.length > 0;
};
export default checkUserParticipationModel;
