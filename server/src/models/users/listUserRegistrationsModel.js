//Importamos pool
import getPool from '../../db/getPool.js';

//Funciñon que devuelve infomación de los hackathones a los que un usuario está inscrito
const listUserRegistrations = async (user) => {

    const pool = await getPool();

    const [userParticipations] = await pool.query(
        `
        SELECT h.title,
         h.summary,
        (
            SELECT AVG(rating)
            FROM ratings r
            WHERE r.hackathonId = h.id
        ) AS avgRating,
        (
			SELECT COUNT(*) 
			FROM registrations reg 
			WHERE reg.hackathonId = h.id AND reg.status = 'confirmada'
		) AS participantCount,
        h.image
        FROM registrations reg
        INNER JOIN hackathonList h ON h.Id = reg.hackathonId
        WHERE reg.userId = ? AND reg.status = 'confirmada'
        ORDER BY avgRating;
        `,
        [user]
    );

    return userParticipations;

};

export default listUserRegistrations;