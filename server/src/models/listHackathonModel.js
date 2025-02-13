// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna todos los hackathones.
const listHackathonController = async (title = '', creator = '') => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Listado de entradas.
    const [hackathones] = await pool.query(
        `
            SELECT
                h.id,
                h.creator,
                h.title,
                h.summary,
                h.startingDate,
                h.deadline,
                h.location,
                h.theme,
                h.programmingLang,
                h.details,
                h.image,
                h.createdAt,
            FROM hackathonlist hl
            GROUP BY h.id
        `,
        [`%${title}%`, `%${creator}%`]
    );

    return hackathones;
};

export default listHackathonController;
