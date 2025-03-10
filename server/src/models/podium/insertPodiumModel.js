// Import de la función que retorna una conexión con la base de datos
import getPool from '../../db/getPool.js';


// Función que se conecta a la base de datos y asigna usuarios al podio
const insertPodiumModel = async (first, second, third, hackathonId) => {
    
    const pool = await getPool();

    //Recibe IDs de usuario y el ID del hackathon, mapea a los registros correspondientes y les asigna el podio
    // Insertamos la posición en podio
    const [insertPodium] = await pool.query(
        `
            INSERT INTO podium (registrationId, position, createdAt)
            VALUES 
            ((SELECT reg.id FROM registrations reg 
            WHERE reg.hackathonId=? AND reg.userId = ?), 1, NOW()),
            ((SELECT reg.id FROM registrations reg 
            WHERE reg.hackathonId=? AND reg.userId = ?), 2, NOW()),
            ((SELECT reg.id FROM registrations reg 
            WHERE reg.hackathonId=? AND reg.userId = ?), 3, NOW());

        `,
        [hackathonId, first, hackathonId, second, hackathonId, third]
    );
    return insertPodium;
};

export default insertPodiumModel;