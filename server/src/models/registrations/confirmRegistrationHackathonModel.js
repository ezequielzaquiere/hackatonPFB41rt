//Importamos utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
//Importamos la pool
import getPool from '../../db/getPool.js    ';

//Funcion que conecta con la base de datos y cambia el estado de participacion
const confirmRegistrationHackathonModel = async (confirmationCode) => {
    const pool = await getPool();

    //Obtenemos el codigo de participacion de la DB
    const [registration] = await pool.query(
        `SELECT id FROM registrations WHERE confirmationCode = ?`,
        [confirmationCode]
    );

    //Si no existe lanzamos un error
    if (!registration.length) {
        generateErrorUtil(404, 'Codigo de confirmacion invalido');
    }

    //Actualizamos el estado de la participacion
    await pool.query(
        `UPDATE registrations SET status = "confirmada", modifiedAt = ?, confirmationCode = null WHERE confirmationCode = ?`,
        [new Date(), confirmationCode]
    );
};

export default confirmRegistrationHackathonModel;
