// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna los lenguajes de los hackathones.
const listHackathonesLangsModel = async (
    hackathon = '',
    programmingLang = ''
) => {
    // Obtenemos el pool de conexión a la base de datos.
    const pool = await getPool();

    // Listado de lenguajes de programación con filtros opcionales.
    const [hackathonesLangs] = await pool.query(
        `
        SELECT * FROM programmingLangs
        WHERE (? = '' OR programmingLang LIKE ?)
        `,
        [hackathon, `%${hackathon}%`, programmingLang, `%${programmingLang}%`]
    );

    return hackathonesLangs;
};

export default listHackathonesLangsModel;
