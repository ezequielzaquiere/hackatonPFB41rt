// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que me permite conectarme a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
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
