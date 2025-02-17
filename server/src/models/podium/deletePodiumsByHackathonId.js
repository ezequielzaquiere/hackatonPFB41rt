//Imports
import getPool from '../../db/getPool.js';

//Funcion que elimina los datos del podium en funcion del id de la participacion
const deletePodiumsByHackathonId = async (registrationsId) => {
    const pool = await getPool();

    //ELiminamos las posiciones de los podiums
    await pool.query(
        `
        DELETE FROM podium WHERE registrationId IN (?)
        `,
        [registrationsId]
    );
};
export default deletePodiumsByHackathonId;
