//Import utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import removeDocUtil from '../../utils/removeDocUtil.js';
import removeImgUtil from '../../utils/removeImgUtil.js';

//Import models
import selectHackathonDetailsByIdModel from '../../models/hackathones/selectHackathonDetailsByIdModel.js';
import deleteRegistrationsByHackathonId from '../../models/registrations/deleteRegistrationsByHackathonId.js';
import selectRegistrationsByHackathonId from '../../models/registrations/selectRegistrationsByHackathonId.js';
import deletePodiumsByHackathonId from '../../models/podium/deletePodiumsByHackathonId.js';
import selectPodiumsByHackathonId from '../../models/podium/selectPodiumsByRegistrationsId.js';
import selectRatingsByHackathonId from '../../models/ratings/selectRatingsByHackathonId.js';
import deleteRatingsByHackathonId from '../../models/ratings/deleteRatingsByHackathonId.js';
import deleteRelationHackathonLang from '../../models/hackathones/deleteRelationHackathonLang.js';
import deleteHackathonById from '../../models/hackathones/deleteHackathonById.js';

//Funcion que permite eliminar un hackathon y todo lo relacionado con el
const deleteHackathonController = async (req, res, next) => {
    try {
        //Obtenemos el id del hackathon
        const { hackathonId } = req.params;

        //Comprobamos si el hackathon existe
        const hackathon = await selectHackathonDetailsByIdModel(hackathonId);

        //Si no existe lanzamos un error
        if (!hackathon) {
            generateErrorUtil(400, 'No se ha encontrado el hackathon');
        }
        //Obtenemos los ids de los registros si existen antes de eliminarlos
        const registrations =
            await selectRegistrationsByHackathonId(hackathonId);

        //Declaramos la variables vacias
        let registrationsId = [];
        let podiums = [];

        if (registrations.length > 0) {
            //Si existen los registros, obtenemos sus id
            registrationsId = registrations.map((value) => value.id);

            //Comprobamos si existen podiums con esos registrationsId
            podiums = await selectPodiumsByHackathonId(registrationsId);

            //Eliminamos los podiums, si hay ,segun los registrationsId
            if (podiums.length > 0) {
                await deletePodiumsByHackathonId(registrationsId);
            }
            //Eliminamos las participaciones relacionadas con ese hackathon
            await deleteRegistrationsByHackathonId(hackathonId);
        }
        //Comprobamos si hay valoraciones de ese hackathon
        const rating = await selectRatingsByHackathonId(hackathonId);

        //Si existen ratings los eliminamos
        if (rating.length > 0) {
            await deleteRatingsByHackathonId(hackathonId);
        }

        //Comprobamos si hay una imagen en el hackathon y si la hay la eliminamos
        if (hackathon.image) {
            await removeImgUtil(hackathon.image, 'imgHack');
        }

        //Comprobamos is hay un documento y si lo hay lo borramos
        if (hackathon.attachedFile) {
            await removeDocUtil(hackathon.attachedFile);
        }
        //Eliminamos la relacion entre el hackathon y el lenguaje de programacion
        await deleteRelationHackathonLang(hackathonId);

        //Eliminamos el hackathon
        await deleteHackathonById(hackathonId);

        //Enviamos la respuesta
        res.status(201).send({
            status: 'ok',
            message: 'Hackathon eliminado',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteHackathonController;
