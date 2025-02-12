import getPool from '../db/getPool.js';

//Funcion que se conecta a la Base de datos para retornar un usuario con un email dado

const selectUserByEmailModel = async (email) => {
    const pool = await getPool;

    const [users] = await pool.query(
        'SELECT id, password, active, role FROM users WHERE email = ?',
        [email]
    );
    return users[0];
};
export default selectUserByEmailModel;
