// Importar las dependencias.
import bcrypt from 'bcrypt';

// Importar la función que establece conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importar la función que genera errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos y actualiza la contraseña con un código de recuperación.
const updateUserPassModel = async (password, recoverPassCode) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Obtenemos a todos los usuarios con el código de recuperación de contraseña dado.
    const [users] = await pool.query(
        `SELECT id FROM users WHERE recoverPassCode = ?`,
        [recoverPassCode]
    );

    // Si no existe ningún usuario lanzamos un error.
    if (users.length < 1) {
        generateErrorUtil('Código de recuperación incorrecto', 404);
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Actualizamos la contraseña del usuario.
    await pool.query(
        `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode]
    );
};

export default updateUserPassModel;
