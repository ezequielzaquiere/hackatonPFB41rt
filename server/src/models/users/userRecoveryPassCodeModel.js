//Importar dependencias.
import bcrypt from 'bcrypt';

//Importar función que establece conexión con la DB.
import getPool from '../../db/getPool.js';

//Importar función generadora de errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Funcion que usa el código de recuperación de contraseña de un usuario autenticado.
const useRecoveryPassCodeModel = async (userId, newPassword) => {
    const pool = await getPool();

    console.log(userId);
    //Obtenemos la contraseña actual del usuario.
    const users = await pool.query(`SELECT password FROM users WHERE id = ?`, [
        userId,
    ]);

    //Si no existe, generamos error.
    if (users.length < 1) {
        generateErrorUtil(404, 'Usuario no encontrado');
    }

    //Hashear la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPassword, 10);

    // Actualizamos la contraseña del usuario.
    await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [
        hashedPass,
        userId,
    ]);
};

export default useRecoveryPassCodeModel;
