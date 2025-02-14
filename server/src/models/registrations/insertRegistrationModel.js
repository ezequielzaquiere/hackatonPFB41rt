//Importamos dependencias
import crypto from 'crypto';
//Importamos models
import selectUserByIdModel from '../users/selectUserByIdModel.js';
//Importamos los utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendEmailUtil from '../../utils/sendEmailUtil.js';

//Importamos la pool
import getPool from '../../db/getPool.js';

const insertRegistrationModel = async (userId, hackathonId) => {
    const pool = getPool();

    //Obtenemos los datos del usuario
    const user = await selectUserByIdModel(userId);

    //Comprobamos si esta inscrito
    const [registration] = await pool.query(
        `'SELECT id FROM registrations WHERE userId = ? AND hackathonId = ? '`,
        [userId, hackathonId]
    );

    //Si ya lo esta lanzamos un error
    if (registration.lenth > 0) {
        generateErrorUtil(409, 'Ya te has registrado en el hackathon');
    }

    //Generamos un codigo de confirmacion de participacion
    const confirmationCode = crypto.randomBytes(15).toString('hex');

    //Insertamos el codigo de confirmacion
    await pool.query(
        `
            INSERT INTO registrations (userId, hackathonId, confirmationCode, createdAt)
            VALUES (?, ?, ?, ?)
        `,
        [userId, hackathonId, confirmationCode, new Date()]
    );

    //TODO:personalizar mas el email(secundario) como obtener datos del hackathon,...
    //Asunto del email
    const subject = `${user.firstName},confirma tu participacion`;

    //Plantilla del email de confirmacion
    const htmlEmail = `<!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Confirmación de Participación</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f3e5f5;
                                    color: #4a148c;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 40px auto;
                                    background: #ffffff;
                                    padding: 20px;
                                    border-radius: 10px;
                                    box-shadow: 0 0 10px rgba(74, 20, 140, 0.2);
                                    text-align: center;
                                }
                                h1 {
                                    color: #6a1b9a;
                                }
                                p {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    color: #4a148c;
                                }
                                .btn {
                                    display: inline-block;
                                    margin-top: 20px;
                                    padding: 12px 24px;
                                    font-size: 18px;
                                    color: #fff;
                                    background-color: #8e24aa;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    transition: background 0.3s ease-in-out;
                                }
                                .btn:hover {
                                    background-color: #6a1b9a;
                                }
                                .footer {
                                    margin-top: 20px;
                                    font-size: 14px;
                                    color: #7b1fa2;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>¡Confirmación de Participación!</h1>
                                <p>Gracias por registrarte en nuestro evento. Para confirmar tu participación, por favor haz clic en el botón de abajo.</p>
                                <a href="${process.env.CLIENT_URL}/api/hackathon/${hackathonId}/join/${confirmationCode}" class="btn">Confirmar Asistencia</a>
                                <p class="footer">Si no solicitaste este registro, puedes ignorar este correo.</p>
                            </div>
                        </body>
                        </html>
                        `;

    //Enviamos el correo de confirmacion
    await sendEmailUtil(user.email, subject, htmlEmail);
};

export default insertRegistrationModel;
