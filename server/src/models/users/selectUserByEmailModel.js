// Importar la función que conecta con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos para retornar un usuario con un email dado.
const selectUserByEmailModel = async (email) => {
    //Obtener el pool.
    const pool = await getPool();

    // Obtener el listado de usuarios con el email dado.
    const [users] = await pool.query(
        `SELECT id, password, active, role FROM users WHERE email = ?`,
        [email]
    );

    // Retornar el usuario que está en la posición cero. Si no existe un usuario en la
    // posición 0 se retornará un valor undefined.
    return users[0];
};

export default selectUserByEmailModel;
