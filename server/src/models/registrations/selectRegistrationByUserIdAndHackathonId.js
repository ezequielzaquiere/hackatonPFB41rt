//Importamos la pool
import getPool from '../../db/getPool.js';

//Funcion que se conecta a la Base de datos para retornar una participacion con un userId y un hackathonId
const selectRegistrationByUserIdAndHackathonId = async (
    userId,
    hackathonId
) => {
    const pool = await getPool();

    //Obtenemos la participacion
    const [registration] = await pool.query(
        'SELECT id, confirmationCode, status FROM registrations WHERE userId = ? AND hackathonId= ?',
        [userId, hackathonId]
    );

    return registration.length > 0 ? registration[0] : null;
};
export default selectRegistrationByUserIdAndHackathonId;
