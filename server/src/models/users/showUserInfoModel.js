//Importar función que establece conexión con la DB.
import getPool from '../../db/getPool.js';

//Importar función generadora de errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Modelo que actualiza el perfil del usuario.
const showUserInfoModel = async (id) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT username, avatar FROM users WHERE id = ?`,
        [id]
    );

    if (users.length < 1) {
        generateErrorUtil(409, 'Usuario no existe');
    }

    return users[0];
};

export default showUserInfoModel;
