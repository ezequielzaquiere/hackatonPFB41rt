// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

const HackathonesDetailModel = async (hackathon = '', programmingLang = '') => {
    // Obtenemos el pool de conexión a la base de datos.
    const pool = await getPool();

    // Construimos la consulta con posibles filtros.
    let query = `
        SELECT h.*, GROUP_CONCAT(pl.programmingLang) AS programmingLanguages
        FROM hackathonList h
        LEFT JOIN hackathonLangs hl ON h.id = hl.hackathonId
        LEFT JOIN programmingLangs pl ON hl.programmingLangId = pl.id
    `;

    let params = [];
    let conditions = [];

    if (hackathon) {
        conditions.push(`h.title LIKE ?`);
        params.push(`%${hackathon}%`);
    }

    if (programmingLang) {
        conditions.push(`pl.programmingLang LIKE ?`);
        params.push(`%${programmingLang}%`);
    }

    if (conditions.length) {
        query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` GROUP BY h.id`;

    // Ejecutamos la consulta con los parámetros.
    const [hackathons] = await pool.query(query, params);

    return hackathons;
};

export default HackathonesDetailModel;
