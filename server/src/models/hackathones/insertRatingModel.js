// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos e inserta un voto.
const insertRatingModel = async (rating, hackathonId, userId) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Obtenemos las valoraciones del usuario que intenta votar sobre el hackathon.
    const [ratings] = await pool.query(
        `SELECT id FROM ratings WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId]
    );

    // Si el usuario ya ha valorado el hackathon habrá al menos una valoración en el array de votos.
    // Lanzamos un error.
    if (ratings.length > 0) {
        generateErrorUtil(409, 'Ya has valorado este hackathon');
    }

    // Insertamos el rating.
    await pool.query(
        `
            INSERT INTO ratings (rating, userId, hackathonId, createdAt)
            VALUES (?, ?, ?, ?)
        `,
        [rating, userId, hackathonId, new Date()]
    );
};

export default insertRatingModel;
