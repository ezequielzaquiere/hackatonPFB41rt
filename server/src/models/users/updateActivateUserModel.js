// Importamos la función que me permite conectarme a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que lanza un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos y actualiza la columna active del usuario.
const updateActiveUserModel = async (regCode) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Obtenemos a todos los usuarios con el código de registro recibido.
    const [users] = await pool.query(`SELECT id FROM users WHERE regCode = ?`, [
        regCode,
    ]);

    // Si no hay ningún usuario con ese código de registro lanzamos un error.
    if (users.length < 1) {
        generateErrorUtil('Código de registro inválido', 404);
    }

    // Actualizamos el estado del usuario.
    await pool.query(
        `UPDATE users SET active = TRUE, regCode = null WHERE regCode = ?`,
        [regCode]
    );
};

export default updateActiveUserModel;
