// Import de la función que retorna una conexión con la base de datos
import getPool from '../../db/getPool.js';


// Función que se conecta a la base de datos y asigna usuarios al podio
const insertPodiumModel = async (first, second, third, hackathonId) => {
    
    const pool = await getPool();


    // Insertamos la posición en podio
    const [insertPodium] = await pool.query(
        `
            INSERT INTO podium (registrationId, position, createdAt)
            VALUES (?, 1, NOW()), (?, 2, NOW()), (?, 3, NOW())

        `,
        [first, second, third]
    );
    return insertPodium;
};

export default insertPodiumModel;