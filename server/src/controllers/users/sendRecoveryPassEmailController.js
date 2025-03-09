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
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #191919; color: #ffffff; border-radius: 10px;">
                    <h2 style="text-align: center; color: #9A4EAE;">Recuperación de Contraseña</h2>

                    <p style="font-size: 16px; text-align: center;">
                        Se ha solicitado un cambio de contraseña para la cuenta vinculada a este email.
                        Si no has sido tú, puedes ignorar este mensaje.
                    </p>

                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.CLIENT_URL}/users/${user.id}/password/${recoverPassCode}"
                            style="display: inline-block; padding: 12px 25px; font-size: 18px; 
                            background-color: #7A3E8F; color: #ffffff; text-decoration: none; 
                            font-weight: bold; border-radius: 5px;">
                            ¡Click aquí para actualizar tu contraseña!
                        </a>
                    </div>

                    <p style="font-size: 14px; text-align: center; color: #cccccc;">
                        Si no solicitaste este cambio, no es necesario realizar ninguna acción.
                    </p>

                    <hr style="border: 1px solid #444;">
                    <p style="text-align: center; font-size: 12px; color: #999;">
                        &copy; ${new Date().getFullYear()} Hackverse. Todos los derechos reservados.
                    </p>
                 </div>
`;

            console.log(emailBody);
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
