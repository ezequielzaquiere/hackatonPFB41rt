//TODO:COMPROBAR LA HORA PARA QUE ESTE EN EL FORMATO CORRECTO
//TODO QUITAR MI EMAIL PARA PROBAR
//TODO:PROBABLEMENTE TENGA QUE FORMATEAR LA FECHA A UN FORMATO UTIL PARA USAR EN EL EMAIL
//Importamos dependencias
import crypto from 'crypto';
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

    //TODO:QUITAR LAS FECHAS
    console.log(hackathon.startingDate);
    console.log(hackathon.deadline);

    //Asunto del email
    const subject = `${user.firstName},confirma tu asistencia`;

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
                                ul {
                                    list-style: none;
                                    padding: 0;
                                    margin: 20px 0;
                                    text-align: left;
                                }
                                li {
                                    background: #f3e5f5;
                                    padding: 10px;
                                    margin: 5px 0;
                                    border-radius: 5px;
                                    color: #4a148c;
                                    font-size: 16px;
                                    line-height: 1.5;
                                }
                                li::before {
                                    content: "◉";
                                    color: #8e24aa;
                                    font-weight: bold;
                                    display: inline-block;
                                    width: 20px;
                                }
                                li.date::before {
                                content: "📅";
                                font-size: 18px;
                                width: 20px;
                            }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Confirmación de participación</h1>
                                <p>Gracias por registrarte en ${hackathon.title}. Para confirmar tu participación, por favor, haz clic en el botón de abajo.</p>
                                <ul>
                                    <li>
                                        <strong>Hackathon:</strong> ${hackathon.title}
                                    </li>
                                    <li>
                                        <strong>Descripción:</strong> ${hackathon.summary}
                                    </li>
                                    <li class="date">
                                        <strong>Fecha de inicio:</strong> ${hackathon.startingDate}
                                    </li>
                                    <li class="date">
                                        <strong>Fecha de finalización:</strong> ${hackathon.deadline}
                                    </li>
                                    <li>
                                        <strong>Tipo:</strong> ${hackathon.type}
                                    </li>
                                    <li>
                                        <strong>Localización:</strong> ${hackathon.location}
                                    </li>
                                </ul>
                                <a href="${process.env.CLIENT_URL}/api/register/${hackathonId}/${confirmationCode}" class="btn">¡Confirma tu asistencia!</a>
                                <p class="footer">Si no solicitaste este registro, puedes ignorar este correo.</p>
                            </div>
                        </body>
                        </html>
                        `;

    //Enviamos el correo de confirmacion
    //TODO:QUITAR MI EMAIL POR USER.EMAIL
    await sendEmailUtil('jesboom2@gmail.com', subject, htmlEmail);
};

export default insertRegistrationModel;
