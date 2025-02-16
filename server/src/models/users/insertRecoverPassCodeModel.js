// Importar la función que permite conectarse a la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y agrega un código de recuperación de contraseña.
const insertRecoverPassCodeModel = async (recoverPassCode, email) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Actualizamos los datos del usuario.
    await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);
};

export default insertRecoverPassCodeModel;
