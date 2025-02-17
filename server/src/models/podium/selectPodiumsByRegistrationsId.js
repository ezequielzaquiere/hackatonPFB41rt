//Imports
import getPool from '../../db/getPool.js';

//Funcion que obtiene los datos de los podiums segun la participacion
const selectPodiumsByHackathonId = async (registrationsId) => {
    const pool = await getPool();

    const ids = Array.isArray(registrationsId)
        ? registrationsId
        : [registrationsId];

    //Consultamos la base de datos
    const [podiums] = await pool.query(
        `
        SELECT  id, position FROM podium WHERE registrationId IN (?)
        `,
        [ids]
    );
    return podiums;
};
export default selectPodiumsByHackathonId;
