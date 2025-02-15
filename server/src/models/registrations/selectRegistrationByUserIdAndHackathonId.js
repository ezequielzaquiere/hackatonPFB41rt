//Importamos la pool
import getPool from '../../db/getPool.js';

//Importamos util
import generateErrorUtil from '../../utils/generateErrorUtil.js';

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

    //Si la participacion no existe lanzamos un error
    if (!registration.length) {
        generateErrorUtil(404, 'Participación no encontrada');
    }
    return registration[0];
};
export default selectRegistrationByUserIdAndHackathonId;
