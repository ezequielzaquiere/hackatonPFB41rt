
import getPool from '../../db/getPool.js';

const listHackathonParticipants = async (hackathon = '') => {

    const pool = await getPool();

    const [listHackathonParticipants] = await pool.query(
        `
        SELECT userId
        FROM registrations reg
        WHERE reg.hackathonId = ? AND reg.status = 'confirmada'
        GROUP BY reg.id
        
        `,
        [hackathon]
    );

    return listHackathonParticipants;

};

export default listHackathonParticipants;