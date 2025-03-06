
import getPool from '../../db/getPool.js';

const listHackathonParticipants = async (hackathonId) => {

    const pool = await getPool();

    const [hackathonParticipants] = await pool.query(
        `
        SELECT u.id, u.username, u.avatar, reg.status
        FROM registrations reg
        INNER JOIN users u ON u.id = reg.userId
        WHERE reg.hackathonId = ? AND reg.status = 'confirmada'
        ORDER BY u.username;
        `,
        [hackathonId]
    );

    return hackathonParticipants;

};

export default listHackathonParticipants;