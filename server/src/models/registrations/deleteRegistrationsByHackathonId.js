//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
//Importamos la pool
import getPool from '../../db/getPool.js';

//Funcion que elimina los registros en funcion del hackathonId
const deleteRegistrationsByHackathonId = async (hackathonId) => {
    const pool = await getPool();

    //Obtenemos el codigo de participacion de la DB
    const [registration] = await pool.query(
        `SELECT id FROM registrations WHERE hackathonId = ?`,
        [hackathonId]
    );

    //Comprobamos si existe la participacion
    if (!registration.length) {
        generateErrorUtil(404, 'No existe la participacion');
    }

    //Eliminamos las participaciones
    await pool.query(`DELETE FROM registrations WHERE hackathonId = ?`, [
        hackathonId,
    ]);
};

export default deleteRegistrationsByHackathonId;
