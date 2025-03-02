//Importar dependencias.
import bcrypt from 'bcrypt';

//Importar función que establece conexión con la DB.
import getPool from '../../db/getPool.js';

//Importar función generadora de errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Funcion que actualiza la contraseña de un usuario autenticado.
const updateUserPassRecoverModel = async (userId, newPassword) => {
    const pool = await getPool();

    //Obtenemos la contraseña actual del usuario.
    const [users] = await pool.query(
        `SELECT password FROM users WHERE id = ?`,
        [userId]
    );

    //Si no existe, generamos error.
    if (users.length < 1) {
        generateErrorUtil(404, 'Usuario no encontrado');
    }

    const password = users[0].password;

    //Hashear la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPassword, 10);

    // Actualizamos la contraseña del usuario.
    await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [
        hashedPass,
        userId,
    ]);
};

export default updateUserPassRecoverModel;
