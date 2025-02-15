//Importamos models
import cancelRegistrationHackathonModel from '../../models/registrations/cancelRegistrationHackathonModel.js';
//Importamos util
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion que actualiza el estado de la participacion en un hackathon
const cancelRegistrationHackathonController = async (req, res, next) => {
    try {
        if (req.local.registration === 'cancelada') {
            generateErrorUtil(409, 'Ya has cancelado tu participacion');
        }
        const { hackathonId } = req.params;

        if (!hackathonId) {
            generateErrorUtil(400, 'Falta el id del hackathon');
        }

        //Actualizamos el estado de la participacion
        await cancelRegistrationHackathonModel(req.user.id, hackathonId);

        res.status(200).send({
            status: 'ok',
            message: 'Has cancelado tu participación!',
        });
    } catch (err) {
        next(err);
    }
};
export default cancelRegistrationHackathonController;
