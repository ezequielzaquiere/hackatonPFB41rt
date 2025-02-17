//Imports
import getPool from '../../db/getPool.js';

//Funcion que elimina la relacion entre un hackathon y los lenguajes utilizados usando hackathonId
const deleteRelationHackathonLang = async (hackathonId) => {
    const pool = await getPool();

    //ELiminamos la relacion entre los hackathones y el lenguaje de programacion
    await pool.query(
        `
        DELETE FROM hackathonLangs WHERE hackathonId = ?
        `,
        [hackathonId]
    );
};
export default deleteRelationHackathonLang;
