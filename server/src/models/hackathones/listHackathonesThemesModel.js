//Conexión a la DB
import getPool from '../../db/getPool.js';

//Función que se conecta a la base de datos y retorna todos los temas de los hackathones
const listHackathonesThemesModel = async () => {
    const pool = await getPool();

    //Lista de todos los temas de los hackathones
    const [hackathonesTheme] = await pool.query(
        `
            SELECT id,theme
            FROM themes t
            GROUP BY t.id

        `
    );

    return hackathonesTheme;
};

export default listHackathonesThemesModel;
