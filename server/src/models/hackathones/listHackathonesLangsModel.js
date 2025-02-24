// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna los lenguajes de los hackathones.
const listHackathonesLangsModel = async (programmingLang = '') => {
    // Obtenemos el pool de conexión a la base de datos.
    const pool = await getPool();

    // Listado de lenguajes de programación con filtros opcionales.
    const [hackathonesLangs] = await pool.query(
        `
        SELECT pl.programmingLang, h.id AS hackathonId 
FROM hackathonList h
JOIN hackathonLangs hl ON h.id = hl.hackathonId
JOIN programmingLangs pl ON hl.programmingLangId = pl.id;


        `,
        [programmingLang, `%${programmingLang}%`]
    );

    return hackathonesLangs;
};

export default listHackathonesLangsModel;
