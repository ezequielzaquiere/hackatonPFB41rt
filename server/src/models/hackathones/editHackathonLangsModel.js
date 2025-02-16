//Imports
import getPool from '../../db/getPool.js';

//Import models
import insertNewHackathonLangs from './insertNewHackathonLangs.js';

//Funcion que modifica una reliacion entre el hackathonid y el programminglangid
const editHackathonLangsModel = async (hackathonId, programmingLangId) => {
    const pool = await getPool();

    //Eliminamos los lenguajes amteriores y creamos unos nuevos ya que
    //modificar los existentes no es suficiente
    await pool.query(
        `
        DELETE FROM hackathonLangs WHERE hackathonId=?
        `,
        [hackathonId]
    );

    //Ahora insertamos los nuevos lenguajes
    await insertNewHackathonLangs(hackathonId, programmingLangId);
};
export default editHackathonLangsModel;
