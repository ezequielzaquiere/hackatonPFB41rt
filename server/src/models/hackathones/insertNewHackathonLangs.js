//Imports
import getPool from '../../db/getPool.js';

//Funcion que introdice una reliacion entre el hackathonid y el programminglangid
const insertNewHackathonLangs = async (hackathonId, programmingLangId) => {
    const pool = await getPool();

    //Hacemos un map de los programminglangid para poder insertarlos
    const consultas = programmingLangId.map((langId) =>
        pool.query(
            `
        INSERT INTO hackathonLangs  (programmingLangId, hackathonId, createdAt)
        VALUES (?, ?, ?)

        `,
            [langId, hackathonId, new Date()]
        )
    );

    //Ejecutamos todas las consultas a la vez
    await Promise.all(consultas);
};
export default insertNewHackathonLangs;
