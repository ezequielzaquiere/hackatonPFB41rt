// Importamos la función que retorna una conexión con la base de datos.
import { getDate } from 'date-fns';
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna todos los hackathones.
const listNextHackathonesModel = async () => {
    //Función que devuelve la fecha de la solicitud
    const getDateRequest = () => {
        const date = new Date();
        return date.toISOString().slice(0, 19).replace('T', ' '); // Formato: "YYYY-MM-DD HH:mm:ss"
    };
    console.log(`"${getDateRequest()}"`);
    // Obtenemos el pool.
    const pool = await getPool();

    // Listado de hackathones ordenados por startingDate
    const [hackathones] = await pool.query(
        `
            SELECT *,
             (
				SELECT COUNT(*) 
				FROM registrations reg 
				WHERE reg.hackathonId = hl.id AND reg.status = 'confirmada'
			) AS participantCount
            FROM hackathonList hl
            WHERE startingDate >= ?
            GROUP BY hl.id
            ORDER BY startingDate;

        `,
        [getDateRequest()]
    );

    return hackathones;
};

export default listNextHackathonesModel;
