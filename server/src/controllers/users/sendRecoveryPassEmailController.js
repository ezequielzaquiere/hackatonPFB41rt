// Importar las dependencias.
import crypto from 'crypto';

// Importar los modelos.
import insertRecoverPassCodeModel from '../../models/users/insertRecoverPassCodeModel.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

// Importamor la función que envía un mail.
import sendEmailUtil from '../../utils/sendEmailUtil.js';

// Importar la función generadora de errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que envía un código de recuperación de contraseña al email indicado.
const sendRecoveryPassEmailController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { email } = req.body;

        // Lanzamos un error si falta algún campo.
        if (!email) {
            generateErrorUtil(400, 'Faltan campos');
        }

        // Obtenemos los datos del usuario con el email recibido.
        const user = await selectUserByEmailModel(email);
        console.log(user); //Devuelve ID, password crypt, active, role

        // Si el usuario existe le enviamos un código de recuperación de contraseña.
        if (user) {
            // Generamos un código de recuperación de 30 caracteres.
            const recoverPassCode = crypto.randomBytes(15).toString('hex');

            // Insertamos en la base de datos el código.
            await insertRecoverPassCodeModel(recoverPassCode, email);

            // Asunto del email de recuperación de contraseña.
            const emailSubject = 'Recuperar contraseña en HackVerse :)';

            // Cuerpo del email de recuperación de contraseña.
            const emailBody = `
                Se ha solicitado un cambio de contraseña para la cuenta vinculada a este email. Si no has sido tú ignora este mensaje.

                <a href="${process.env.CLIENT_URL}/users/${user.id}/password/${recoverPassCode}">¡Click aquí para actualizar tu contraseña!</a>
            `;

            // Enviamos el email.
            await sendEmailUtil(email, emailSubject, emailBody);
        }

        res.send({
            status: 'ok',
            message:
                'Si existe un usuario con ese email recibirá en su correo un enlace de recuperación',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoveryPassEmailController;
