import getPool from '../../db/getPool.js';

const filterHackathonesModel = async ({
    title,
    programmingLang,
    startingDate,
    location,
}) => {
    const pool = await getPool();

    let query = `
        SELECT h.id, h.title, h.startingDate, h.location, pl.programmingLang
        FROM hackathonList h
        LEFT JOIN hackathonLangs hl ON h.id = hl.hackathonId
        LEFT JOIN programmingLangs pl ON hl.programmingLangId = pl.id
        WHERE 1=1
    `;

    const params = [];

    if (title) {
        query += ` AND LOWER(h.title) LIKE LOWER(?)`;
        params.push(`%${title.toLowerCase()}%`);
    }

    if (programmingLang) {
        query += ` AND LOWER(pl.programmingLang) LIKE LOWER(?)`;
        params.push(`%${programmingLang.toLowerCase()}%`);
    }

    if (startingDate) {
        query += ` AND h.startingDate >= ?`;
        params.push(startingDate);
    }

    if (location) {
        query += ` AND LOWER(h.location) LIKE LOWER(?)`;
        params.push(`%${location.toLowerCase()}%`);
    }

    console.log('SQL Query:', query);
    console.log('Params:', params);

    const [hackathones] = await pool.query(query, params);
    return hackathones;
};

export default filterHackathonesModel;
