//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importamos la conexion a la base de datos
import getPool from '../../db/getPool.js';

//Funcion que obtiene los detalles de un hackathon concreto por id
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
            h.location, 
            h.themeId,
            h.details,
            h.attachedFile, 
            AVG(r.rating) AS avgRating, 
            h.image 
        FROM hackathonList h
        INNER JOIN users u ON u.id = h.userId
        LEFT JOIN ratings r ON r.hackathonId = h.id 
        WHERE h.id = ?
        GROUP BY h.id
        `,
        [hackathonId]
    );

    if (!hackathonList.length) {
        generateErrorUtil(404, 'Hackathon no encontrado');
    }

    //Convertimos a tipo Number la media de ratings
    hackathonList[0].avgRating = Number(hackathonList[0].avgRating);

    return hackathonList[0];
};

export default selectHackathonDetailsByIdModel;
