// Importamos la función que retorna una conexión con la base de datos.
import { getDate } from 'date-fns';
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna todos los hackathones que aún no han empezado que ha creado un usuario admin
const listFutureCreatedHackathonsModel = async (creator) => {
    //Función que devuelve la fecha de la solicitud
    const getDateRequest = () => {
        const date = new Date();
        return date.toISOString().slice(0, 19).replace('T', ' '); // Formato: "YYYY-MM-DD HH:mm:ss"
    };
    // Obtenemos el pool.
    const pool = await getPool();

    // Listado de hackathones ordenados por más cerca de empezar
    const [hackathones] = await pool.query(
        `
            SELECT hl.id,
                hl.title,
                hl.userId,
                hl.startingDate,
                hl.deadline,
                u.username,
                (
                    SELECT AVG(rating)
                    FROM ratings r
                    WHERE r.hackathonId = hl.id
                ) AS avgRating,
                (
			        SELECT COUNT(*) 
			        FROM registrations reg 
			        WHERE reg.hackathonId = hl.id AND reg.status = 'confirmada'
		        ) AS participantCount,
                 hl.image
            FROM hackathonList hl
            INNER JOIN users u ON hl.userId = u.id
            WHERE hl.deadline >= ? AND u.username = ?
            GROUP BY hl.id
            ORDER BY startingDate;

        `,
        [getDateRequest(), creator]
    );

    return hackathones;
};

export default listFutureCreatedHackathonsModel;