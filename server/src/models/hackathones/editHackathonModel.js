//TODO:PREGUNTAR SI ALGUIEN SABE ALGUNA FORMA MAS OPTIMA DE HACERLO
//TODO:MIRAR SI QUEREMOS AÑADIR MODIFIED BY

//Importamos la pool
import getPool from '../../db/getPool.js';

//Funcion que conecta con la DB y modifica la info de un hackathon
const editHackathonModel = async ({
    adminId, //TODO: SE VA A QUERER USAR? TIPO MODIFIED BY
    title,
    summary,
    formatedStartingDate,
    formatedDeadline,
    type,
    themeId,
    location,
    details,
    docName,
    imgName,
    hackathonId,
}) => {
    const pool = await getPool();

    //Si se cambia el titulo
    if (title) {
        await pool.query(
            `UPDATE hackathonList SET title = ?, modifiedAt = ? WHERE id = ?`,
            [title, new Date(), hackathonId]
        );
    }
    if (summary) {
        await pool.query(
            `UPDATE hackathonList SET summary = ?, modifiedAt = ? WHERE id = ?`,
            [summary, new Date(), hackathonId]
        );
    }
    if (formatedStartingDate) {
        await pool.query(
            `UPDATE hackathonList SET startingDate = ?, modifiedAt = ? WHERE id = ?`,
            [formatedStartingDate, new Date(), hackathonId]
        );
    }
    if (formatedDeadline) {
        await pool.query(
            `UPDATE hackathonList SET deadline = ?, modifiedAt = ? WHERE id = ?`,
            [formatedDeadline, new Date(), hackathonId]
        );
    }
    if (type) {
        await pool.query(
            `UPDATE hackathonList SET type = ?, modifiedAt = ? WHERE id = ?`,
            [type, new Date(), hackathonId]
        );
    }
    if (location) {
        await pool.query(
            `UPDATE hackathonList SET location = ?, modifiedAt = ? WHERE id = ?`,
            [location, new Date(), hackathonId]
        );
    }
    if (themeId) {
        await pool.query(
            `UPDATE hackathonList SET themeId = ?, modifiedAt = ? WHERE id = ?`,
            [themeId, new Date(), hackathonId]
        );
    }
    if (details) {
        await pool.query(
            `UPDATE hackathonList SET details = ?, modifiedAt = ? WHERE id = ?`,
            [details, new Date(), hackathonId]
        );
    }
    if (docName) {
        await pool.query(
            `UPDATE hackathonList SET attachedFile = ?, modifiedAt = ? WHERE id = ?`,
            [docName, new Date(), hackathonId]
        );
    }
    if (imgName) {
        await pool.query(
            `UPDATE hackathonList SET image = ?, modifiedAt = ? WHERE id = ?`,
            [imgName, new Date(), hackathonId]
        );
    }
};

export default editHackathonModel;
