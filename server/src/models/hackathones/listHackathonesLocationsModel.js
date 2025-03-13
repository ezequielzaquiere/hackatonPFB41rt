// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos y retorna las localizaciones.
const listHackathonesLocationsModel = async () => {
    // Obtenemos el pool de conexión a la base de datos.
    const pool = await getPool();

    // Listado de Localizaciones
    const [hackathonesLocations] = await pool.query(
        `
        SELECT DISTINCT location FROM hackathonList 
        `
    );

    return hackathonesLocations;
};

export default listHackathonesLocationsModel;
