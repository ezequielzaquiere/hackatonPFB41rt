import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
//Funcion que se conecta a la Base de datos para retornar un usuario con un Id dado

const selectUserByIdModel = async (userId) => {
    const pool = await getPool;

    const [users] = await pool.query(
        'SELECT id, username, firstName, lastName, password, email, avatar FROM users WHERE id = ?',
        [userId]
    );
    if (users.length < 1) {
        generateErrorUtil('Usuario no encontrado', 404);
    }
    return users[0];
};
export default selectUserByIdModel;
