// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna todos los hackathones.
const listHackathonesModel = async (title = '', creator = '') => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Listado de entradas.
    const [hackathones] = await pool.query(
        `
            SELECT *
            FROM hackathonList hl
            GROUP BY hl.id
        `,
        [`%${title}%`, `%${creator}%`]
    );

    return hackathones;
};

export default listHackathonesModel;
