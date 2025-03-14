//Conexión a la DB
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna todos los hackathones.
const listHackathonesModel = async () => {
    const pool = await getPool();

    //Lista de todos los hackathones
    const [hackathones] = await pool.query(
        `
            SELECT *
            FROM hackathonList hl
            GROUP BY hl.id;

        `
    );

    return hackathones;
};

export default listHackathonesModel;
