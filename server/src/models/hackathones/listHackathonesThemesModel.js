// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna todos los hackathones.
const listHackathonesThemesModel = async () => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Listado de entradas.
    const [hackathonesTheme] = await pool.query(
        `
            SELECT *
            FROM themes t
            GROUP BY t.id

        `
    );

    return hackathonesTheme;
};

export default listHackathonesThemesModel;
