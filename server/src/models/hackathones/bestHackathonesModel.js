//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importamos la conexion a la base de datos
import getPool from '../../db/getPool.js';

//Funcion que obtiene los detalles de un hackathon concreto por id
const bestHackathonesModel = async () => {
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
            h.location,
            t.theme,
            h.details,
            h.attachedFile, 
            AVG(r.rating) AS avgRating,
            (
				SELECT COUNT(*) 
				FROM registrations reg 
				WHERE reg.hackathonId = h.id AND reg.status = 'confirmada'
			) AS participantCount,
            h.image 
        FROM hackathonList h
        INNER JOIN users u ON u.id = h.userId
        INNER JOIN themes t ON t.id = h.themeId
        LEFT JOIN ratings r ON r.hackathonId = h.id 
        GROUP BY h.id
        ORDER BY avgRating DESC
        LIMIT 3;
        `
    );

    if (!hackathonList.length) {
        generateErrorUtil(404, 'Hackathon no encontrado');
    }

    return [hackathonList];
};

export default bestHackathonesModel;
