//TODO:REVISAR LOS NOMBRES DE LOS INSERTS DE LA TABLA

//Imports
import getPool from '../../db/getPool.js';
//Funcion inserta un evento Hackathon a la base de datos
const insertHackathonModel = async ({
    adminId,
    title,
    summary,
    description,
    theme,
    technologies,
    type,
    location,
    startingDate,
    finishingDate,
    imgName,
    docName,
}) => {
    const pool = await getPool();

    const now = new Date();

    const [newHackathon] = await pool.query(
        `
        INSERT INTO /*NOMBRE TABLA*/  (createdBy ,title,summary, description, theme, technologies,type,location,startingDate,finishingDate,imgName,docName, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        `,
        [
            adminId,
            title,
            summary,
            description,
            theme,
            technologies,
            type,
            location,
            startingDate,
            finishingDate,
            imgName,
            docName,
            now,
        ]
    );

    return newHackathon.insertId;
};

export default insertHackathonModel;
