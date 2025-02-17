//Importar función que establece conexión con la DB.
import getPool from '../../db/getPool.js';

//Importar función generadora de errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Modelo que actualiza el perfil del usuario.
const updateUserProfileModel = async ({
    username,
    firstName,
    lastName,
    email,
    userId,
}) => {
    const pool = await getPool();

    if (username) {
        const [users] = await pool.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        if (users.length > 0 && users[0].userId !== userId) {
            generateErrorUtil(409, 'Nombre de usuario no disponible');
        }

        await pool.query(`UPDATE users SET username = ? WHERE id = ?`, [
            username,
            userId,
        ]);
    }

    if (firstName) {
        await pool.query(`UPDATE users SET firstName = ? WHERE id = ?`, [
            firstName,
            userId,
        ]);
    }

    if (lastName) {
        await pool.query(`UPDATE users SET lastName = ? WHERE id = ?`, [
            lastName,
            userId,
        ]);
    }

    if (email) {
        const [users] = await pool.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0 && users[0].userId !== userId) {
            generateErrorUtil(409, 'Email no disponible');
        }

        await pool.query(`UPDATE users SET email = ? WHERE id = ?`, [
            email,
            userId,
        ]);
    }
};

export default updateUserProfileModel;
