//Importamos los models
import selectRegistrationByUserIdAndHackathonId from '../models/registrations/selectRegistrationByUserIdAndHackathonId.js';
//Funcion que comprueba el estado de la participacion
const hackathonRegistrationStatusMiddleware = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;

        //Obtenemos la participacion
        const registration = await selectRegistrationByUserIdAndHackathonId(
            req.user.id,
            hackathonId
        );
        if (registration) {
            //Creamos una propiedad en el objeto req con el estado de la participacion
            req.registration = registration.status || null;
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default hackathonRegistrationStatusMiddleware;
