// Importamos las dependencias.
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Importamos la función que me permite conectarme a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que envía un email.
import sendEmailUtil from '../../utils/sendEmailUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos para crear un nuevo usuario.
const insertUserModel = async (
    username,
    firstName,
    lastName,
    email,
    password,
    role
) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Obtenemos el listado de usuarios que tengan el nombre de usuario que recibimos
    // por body.
    let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);

    // Lanzamos un error si ya existe un usuario con ese nombre.
    if (users.length > 0) {
        generateErrorUtil('Nombre de usuario no disponible', 409);
    }

    // Obtenemos el listado de usuarios que tengan el email que recibimos por body.
    [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

    // Lanzamos un error si ya existe un usuario con ese email.
    if (users.length > 0) {
        generateErrorUtil('Email no disponible', 409);
    }

    // Generamos un código de registr.
    const regCode = crypto.randomBytes(15).toString('hex');

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario en la tabla correspondiente.
    await pool.query(
        `
            INSERT INTO users (username, firstName, lastName, email, password, role, regCode, lastAuthUpdate)
            VALUES (?, ?, ?, ?, ?, "dev", ?, ?)
        `,
        [username, firstName, lastName, email, hashedPass, regCode, new Date()]
    );

    // Asunto del email de verificación.
    const emailSubject = 'Activa tu usuario en Hackverse';

    // Cuerpo del email de verificación.
    const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #191919; color: #ffffff; border-radius: 10px;">
        <h2 style="text-align: center; color: #9A4EAE;">¡Bienvenid@ ${username} a Hackverse!</h2>

        <p style="font-size: 16px; text-align: center;">
            Gracias por registrarte en <strong>Hackverse</strong>. Para activar tu cuenta, haz clic en el siguiente botón:
        </p>

        <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.client_URL}/users/validate/${regCode}"
                style="display: inline-block; padding: 12px 25px; font-size: 18px; 
                background-color: #7A3E8F; color: #ffffff; text-decoration: none; 
                font-weight: bold; border-radius: 5px;">
                ¡Activa tu usuario!
            </a>
        </div>

        <p style="font-size: 14px; text-align: center; color: #cccccc;">
            Si no te registraste en Hackverse, ignora este mensaje.
        </p>

        <hr style="border: 1px solid #444;">
        <p style="text-align: center; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} Hackverse. Todos los derechos reservados.
        </p>
    </div>
`;

    // Enviamos el email.
    await sendEmailUtil(email, emailSubject, emailBody);
};

export default insertUserModel;
