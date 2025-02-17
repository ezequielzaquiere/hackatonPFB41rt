//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
//Importamos la pool
import getPool from '../../db/getPool.js';

//Funcion que cambia el estado de la participacion en un hackathon (cancelada)
const cancelRegistrationHackathonModel = async (hackathonId, userId) => {
    const pool = await getPool();

    //Obtenemos el codigo de participacion de la DB
    const [registration] = await pool.query(
        `SELECT id FROM registrations WHERE userId = ? AND hackathonId = ?`,
        [userId, hackathonId]
    );

    //Comprobamos si existe la participacion
    if (!registration.length) {
        generateErrorUtil(404, 'No existe la participacion');
    }

    //Actualizamos el estado de la participacion
    await pool.query(
        `UPDATE registrations SET status = "cancelada", modifiedAt = ? WHERE userId = ? AND hackathonId = ?`,
        [new Date(), userId, hackathonId]
    );
};

export default cancelRegistrationHackathonModel;
