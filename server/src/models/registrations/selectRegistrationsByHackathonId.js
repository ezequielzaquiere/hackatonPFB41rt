//Importamos la pool
import getPool from '../../db/getPool.js';

//Funcion que se conecta a la Base de datos para retornar una participacion con un userId y un hackathonId
const selectRegistrationsByHackathonId = async (hackathonId) => {
    const pool = await getPool();

    //Obtenemos la participacion
    const [registrations] = await pool.query(
        'SELECT id FROM registrations WHERE hackathonId= ?',
        [hackathonId]
    );

    return registrations;
};
export default selectRegistrationsByHackathonId;
