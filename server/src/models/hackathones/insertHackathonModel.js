//TODO:REVISAR LOS NOMBRES DE LOS INSERTS DE LA TABLA

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
    details,
    docName,
    imgName,
}) => {
    const pool = await getPool();

    const [newHackathon] = await pool.query(
        `
        INSERT INTO hackathonList  (userId, title, summary, startingDate, deadline, type, location, themeId, details, attachedFile, image, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

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
            details,
            docName,
            imgName,
            new Date(),
        ]
    );

    return newHackathon.insertId;
};

export default insertHackathonModel;
