//Importamos pool
import getPool from '../../db/getPool.js';

//Función para hacer pública la lista de participantes
const editPublicRegistration = async (hackathonId) => {
    
    const pool = await getPool();

    
    await pool.query(`
        UPDATE hackathonlist SET resultsPublished = TRUE WHERE id = ?
        `,
        [hackathonId]
    );

};

export default editPublicRegistration;
