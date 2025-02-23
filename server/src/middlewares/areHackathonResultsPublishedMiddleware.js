
//Importamos model
import checkPublished from '../models/hackathones/checkPublished.js';

//Importamos generación de errores
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Funcion que coprueba si el hackathon sigue activo
const areHackathonResultsPublishedMiddleware = async (req, res, next) => {
    try {

        // Obtenemos los datos de usuario.
        const {hackathonId} = req.params;

        const hackathonPublished = await checkPublished(hackathonId);
        

        //Lanzamos error si no existe
        if (hackathonPublished.resultsPublished == 0) {
            generateErrorUtil(401, 'Todavía no se puede acceder');
        }

        next();
    } catch (err) {
        next(err);
    }
};
export default areHackathonResultsPublishedMiddleware;