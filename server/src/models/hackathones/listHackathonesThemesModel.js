// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna todos los hackathones.
const listHackathonesThemesModel = async (hackathon = '', theme = '') => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Listado de entradas.
    const [hackathonesTheme] = await pool.query(
        `
            SELECT *
            FROM themes t
            GROUP BY t.id
        `,
        [`%${hackathon}%`, `%${theme}%`]
    );

    return hackathonesTheme;
};

export default listHackathonesThemesModel;
