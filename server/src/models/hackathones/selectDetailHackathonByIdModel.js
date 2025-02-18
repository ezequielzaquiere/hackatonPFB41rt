// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna un hackathon por su ID.
const getHackathonByIdModel = async (id) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Consulta para obtener el hackathon con la ID proporcionada.
    const [hackathon] = await pool.query(
        `
            SELECT title,startingDate,deadline,type,location,themeId,details,image
            FROM hackathonList
            WHERE id = ?
        `,
        [id]
    );

    return hackathon;
};

export default getHackathonByIdModel;
