

import getPool from '../../db/getPool.js';

const listUserRegistrations = async (user) => {

    const pool = await getPool();

    const [userParticipations] = await pool.query(
        `
        SELECT userId, hackathonId
        FROM registrations reg
        WHERE reg.userId = ? AND reg.status = 'confirmada'
        
        `,
        [user]
    );

    return userParticipations[0];

};

export default listUserRegistrations;