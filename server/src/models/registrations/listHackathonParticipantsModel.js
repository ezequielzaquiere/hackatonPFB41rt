
import getPool from '../../db/getPool.js';

const listHackathonParticipants = async (hackathonId) => {

    const pool = await getPool();

    const [hackathonParticipants] = await pool.query(
        `
        SELECT u.username, u.avatar, p.position, reg.status
        FROM registrations reg
        INNER JOIN users u ON u.id = reg.userId
        INNER JOIN podium p ON p.registrationId = reg.id
        WHERE reg.hackathonId = ? AND reg.status = 'confirmada'
        ORDER BY u.username;
        `,
        [hackathonId]
    );

    return hackathonParticipants;

};

export default listHackathonParticipants;