// Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importamos la conexión a la base de datos
import getPool from '../../db/getPool.js';

// Función que obtiene los detalles de un hackathon concreto por ID
const selectHackathonDetailsByIdModel = async (hackathonId) => {
    const pool = await getPool();

    const [hackathonList] = await pool.query(
        `SELECT 
            h.id, 
            h.userId, 
            u.username, 
            h.title, 
            h.summary, 
            h.startingDate, 
            h.deadline, 
            h.type,
            h.themeId,
            h.location,
            h.resultsPublished,
            t.theme,
            h.details,
            h.attachedFile, 
            AVG(r.rating) AS avgRating,
            (
                SELECT JSON_ARRAYAGG(pl.programmingLang)
                FROM hackathonLangs hl
                JOIN programmingLangs pl ON hl.programmingLangId = pl.id
                WHERE hl.hackathonId = h.id
            ) AS programmingLangs,
            (
            SELECT JSON_ARRAYAGG(hl.programmingLangId)
            FROM hackathonLangs hl
            WHERE hl.hackathonId = h.id
            ) AS programmingLangIds,
            (
                SELECT COUNT(*) 
                FROM registrations reg 
                WHERE reg.hackathonId = h.id AND reg.status = 'confirmada'
            ) AS participantCount,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT (
                        'position', p.position,
                        'userId', u.id,
                        'username', u.username
                    )
                ) FROM podium p
                INNER JOIN registrations reg ON reg.id = p.registrationId
                INNER JOIN users u ON u.id = reg.userId
                WHERE reg.hackathonId = h.id
            ) AS topThree,
            h.image 
        FROM hackathonList h
        INNER JOIN users u ON u.id = h.userId
        INNER JOIN themes t ON t.id = h.themeId
        LEFT JOIN ratings r ON r.hackathonId = h.id 
        WHERE h.id = ?
        GROUP BY h.id
        `,
        [hackathonId]
    );

    if (!hackathonList.length) {
        generateErrorUtil(404, 'Hackathon no encontrado');
    }

    // Convertimos a tipo Number la media de ratings
    hackathonList[0].avgRating = Math.floor(Number(hackathonList[0].avgRating));

    return hackathonList[0];
};

export default selectHackathonDetailsByIdModel;
