//Importar dependencias.
import bcrypt from 'bcrypt';

//Importar función que establece conexión con la DB.
import getPool from '../../db/getPool.js';

//Importar función generadora de errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Funcion que actualiza la contraseña de un usuario autenticado.
const updateUserPassModel = async (userId, currentPassword, newPassword) => {
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

    //Comparar la contraseña actual con la de la DB.
    const passwordMatch = await bcrypt.compare(currentPassword, password);

    if (!passwordMatch) {
        generateErrorUtil(401, 'La contraseña actual es incorrecta');
    }

    //Hashear la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPassword, 10);

    // Actualizamos la contraseña del usuario.
    await pool.query(
        `UPDATE users SET password = ?, lastAuthUpdate = ? WHERE id = ?`,
        [hashedPass, new Date(), userId]
    );
};

export default updateUserPassModel;
