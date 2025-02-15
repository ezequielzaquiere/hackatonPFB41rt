//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
//Importamos la pool
import getPool from '../../db/getPool.js    ';

//Funcion que conecta con la base de datos y cambia el estado de participacion
const cancelRegistrationHackathonModel = async (userId, hackathonId) => {
    const pool = await getPool();

    //Obtenemos el codigo de participacion de la DB
    const [registration] = await pool.query(
        `SELECT id FROM registrations WHERE userId = ? AND hackathonId= ?`,
        [userId, hackathonId]
    );

    //Si no existe lanzamos un error
    if (!registration.length) {
        generateErrorUtil(404, 'No estas participando en este hackathon');
    }

    //Eliminamos la participacion
    await pool.query(`DELETE FROM registrations WHERE id = ?`, [
        registration[0].id,
    ]);
};

export default cancelRegistrationHackathonModel;
