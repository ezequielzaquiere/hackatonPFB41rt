//Dependencias
import bcrypt from 'bcrypt';

//Conexión con la DB
import getPool from '../../db/getPool.js';

//Función generadora de errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion que actualiza la contraseña de un usuario autenticado
const updateUserPassRecoverModel = async (userId, newPassword) => {
    const pool = await getPool();

    //Obtener la contraseña actual del usuario
    const [users] = await pool.query(
        `SELECT password FROM users WHERE id = ?`,
        [userId]
    );

    //Si no existe, generar error
    if (users.length < 1) {
        generateErrorUtil(404, 'Usuario no encontrado');
    }

    const password = users[0].password;

    //Hashear la nueva contraseña
    const hashedPass = await bcrypt.hash(newPassword, 10);

    //Actualizar la contraseña del usuario
    await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [
        hashedPass,
        userId,
    ]);
};

export default updateUserPassRecoverModel;
