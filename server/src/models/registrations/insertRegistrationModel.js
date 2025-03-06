//TODO: Intentar poner efecto hover al boton?

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
                                    color: #9A4EAE;
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
                                    box-shadow: 0 0 10px rgba(154, 78, 174, 0.2);
                                    text-align: center;
                                }
                                h1 {
                                    color: #9A4EAE;
                                }
                                p {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    color: #c39acd;
                                }
                                .btn {
                                    display: inline-block;
                                    margin-top: 20px;
                                    padding: 12px 24px;
                                    font-size: 18px;
                                    color: #ffffff !important;
                                    background-color: #9A4EAE;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    transition: background 0.3s ease-in-out;
                                }
                                .btn:hover {
                                    background-color: #7B3D8B;
                                }
                                .footer {
                                    margin-top: 20px;
                                    font-size: 14px;
                                    color: #c39acd;
                                }
                                ul {
                                    list-style: none;
                                    padding: 0;
                                    margin: 20px 0;
                                    text-align: left;
                                }
                                li {
                                    background: #2A2A2A;
                                    padding: 10px;
                                    margin: 5px 0;
                                    border-radius: 5px;
                                    border-left: 4px solid #9A4EAE;
                                    color: #c39acd;
                                    font-size: 16px;
                                    line-height: 1.5;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Confirmación de participación</h1>
                                <p>Gracias por registrarte en ${hackathon.title}. Para confirmar tu participación, por favor, haz clic en el botón de abajo.</p>
                                <ul>
                                    <li>
                                        ◉ <strong>Hackathon:</strong> ${hackathon.title}
                                    </li>
                                    <li>
                                        ◉ <strong>Descripción:</strong> ${hackathon.summary}
                                    </li>
                                    <li class="date">
                                        📅 <strong>Fecha de inicio:</strong> ${formattedStartingDate}
                                    </li>
                                    <li class="date">
                                        📅 <strong>Fecha de finalización:</strong> ${formattedDeadLine}
                                    </li>
                                    <li>
                                        ◉ <strong>Tipo:</strong> ${hackathon.type}
                                    </li>
                                    <li>
                                        📍 <strong>Localización:</strong> ${hackathonLocation}
                                    </li>
                                </ul>
                                <a href="${process.env.CLIENT_URL}/hackathon/validate/${hackathonId}/${confirmationCode}" class="btn">
                                    ¡Confirma tu asistencia!
                                </a>
                                <p class="footer">Si no solicitaste este registro, puedes ignorar este correo.</p>
                            </div>
                        </body>
                        </html>

                        `;

    console.log(htmlEmail);

    //Enviamos el correo de confirmacion
    await sendEmailUtil(user.email, subject, htmlEmail);
};

export default insertRegistrationModel;
