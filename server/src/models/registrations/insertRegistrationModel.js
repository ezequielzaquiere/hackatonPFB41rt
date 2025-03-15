//Importamos dependencias
import crypto from 'crypto';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

//Importamos models
import selectUserByIdModel from '../users/selectUserByIdModel.js';
import selectHackathonDetailsByIdModel from '../hackathones/selectHackathonDetailsByIdModel.js';

//Importamos los utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendEmailUtil from '../../utils/sendEmailUtil.js';

//Importamos la pool
import getPool from '../../db/getPool.js';

const insertRegistrationModel = async (userId, hackathonId) => {
    const pool = await getPool();

    //Obtenemos los datos del usuario
    const user = await selectUserByIdModel(userId);

    //Obtenemos los datos del hackathon
    const hackathon = await selectHackathonDetailsByIdModel(hackathonId);

    //Comprobamos si esta inscrito
    const [registration] = await pool.query(
        `SELECT id FROM registrations WHERE userId = ? AND hackathonId = ? `,
        [userId, hackathonId]
    );

    //Si ya lo esta lanzamos un error
    if (registration.length > 0) {
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

    //Asunto del email
    const subject = `${user.firstName}, confirma tu asistencia`;

    //Formateamos las fechas para hacerlas más visuales
    const formattedStartingDate = format(
        new Date(hackathon.startingDate),
        "EEEE, d 'de' MMMM 'de' yyyy 'a las' hh:mm a",
        { locale: es }
    );
    const formattedDeadLine = format(
        new Date(hackathon.deadline),
        "EEEE, d 'de' MMMM 'de' yyyy 'a las' hh:mm a",
        { locale: es }
    );

    //En caso de que no haya localizacio la cambiamos
    let hackathonLocation = hackathon.location;
    if (hackathonLocation === null) {
        hackathonLocation = 'En todas partes';
    }

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
                                    background-color: #191919;
                                    color: #ffffff;
                                    margin: 0;
                                    padding: 0;
                                    text-align: center;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 40px auto;
                                    background: #222222;
                                    padding: 20px;
                                    border-radius: 10px;
                                    box-shadow: 0 0 15px rgba(122, 62, 143, 0.3);
                                    text-align: center;
                                }
                                h1 {
                                    color: #9A4EAE;
                                    font-size: 24px;
                                    margin-bottom: 10px;
                                }
                                p {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    color: #d4a6e1;
                                }
                                .btn {
                                    display: inline-block;
                                    margin-top: 20px;
                                    padding: 14px 28px;
                                    font-size: 18px;
                                    color: #ffffff !important;
                                    background-color: #7A3E8F;
                                    text-decoration: none;
                                    border-radius: 8px;
                                    transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
                                    font-weight: bold;
                                }
                                .btn:hover {
                                    background-color: #9A4EAE;
                                    transform: scale(1.05);
                                }
                                .footer {
                                    margin-top: 20px;
                                    font-size: 14px;
                                    color: #d4a6e1;
                                }
                                ul {
                                    list-style: none;
                                    padding: 0;
                                    margin: 20px 0;
                                    text-align: left;
                                }
                                li {
                                    background: #2A2A2A;
                                    padding: 12px;
                                    margin: 6px 0;
                                    border-radius: 6px;
                                    border-left: 4px solid #9A4EAE;
                                    color: #d4a6e1;
                                    font-size: 16px;
                                    line-height: 1.5;
                                }
                                .date {
                                    font-weight: bold;
                                    color: #ffffff;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>¡Confirmación de Participación!</h1>
                                <p>Gracias por registrarte en <strong>${hackathon.title}</strong>. Para confirmar tu participación, haz clic en el botón de abajo.</p>
                                
                                <ul>
                                    <li>🔹 <strong>Hackathon:</strong> ${hackathon.title}</li>
                                    <li>📜 <strong>Descripción:</strong> ${hackathon.summary}</li>
                                    <li class="date">📅 <strong>Fecha de inicio:</strong> ${formattedStartingDate}</li>
                                    <li class="date">📅 <strong>Fecha de finalización:</strong> ${formattedDeadLine}</li>
                                    <li>🌍 <strong>Tipo:</strong> ${hackathon.type}</li>
                                    <li>📍 <strong>Localización:</strong> ${hackathonLocation}</li>
                                </ul>
                                
                                <a href="${process.env.CLIENT_URL}/hackathon/validate/${hackathonId}/${confirmationCode}" class="btn">
                                    ¡Confirma tu asistencia!
                                </a>

                                <p class="footer">Si no solicitaste este registro, puedes ignorar este correo.</p>
                            </div>
                        </body>
                        </html>`;

    //Enviamos el correo de confirmacion
    await sendEmailUtil(user.email, subject, htmlEmail);
};

export default insertRegistrationModel;
