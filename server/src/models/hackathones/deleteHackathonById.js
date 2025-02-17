//Imports
import getPool from '../../db/getPool.js';

//Funcion que elimina los datos de un hackathon
const deleteHackathonById = async (hackathonId) => {
    const pool = await getPool();

    //ELiminamos el hackathon
    await pool.query(
        `
        DELETE FROM hackathonList WHERE id = ?
        `,
        [hackathonId]
    );
};
export default deleteHackathonById;
