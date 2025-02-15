//TODO:REVISAR LOS NOMBRES DE LOS INSERTS DE LA TABLA
//TODO:REVISAR PORQUE CREO QUE VA A HACER FALTA UN MODEL PARA LOS HACKATHONLANG

//Imports
import getPool from '../../db/getPool.js';

//Funcion inserta un evento Hackathon a la base de datos
const insertHackathonModel = async ({
    adminId,
    title,
    summary,
    formatedStartingDate,
    formatedDeadline,
    type,
    location,
    themeId,
    programmingLangId,
    details,
    attachedFile,
    imgName,
}) => {
    const pool = await getPool();

    const [newHackathon] = await pool.query(
        `
        INSERT INTO hackathonList  (userId, title, summary, startingDate, deadline, type, location, themeId, programmingLangId, details, attachedFile, image, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        `,
        [
            adminId,
            title,
            summary,
            formatedStartingDate,
            formatedDeadline,
            type,
            location,
            themeId,
            programmingLangId,
            details,
            attachedFile,
            imgName,
            new Date(),
        ]
    );

    return newHackathon.insertId;
};

export default insertHackathonModel;
