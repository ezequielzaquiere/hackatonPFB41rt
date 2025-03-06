//Import models
import cancelRegistrationHackathonModel from '../../models/registrations/cancelRegistrationHackathonModel.js';
//Import utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion que permite cancelar la participacion en un hackathon
const cancelRegistrationController = async (req, res, next) => {
    try {
        //Obtener hackathonId
        const { hackathonId } = req.params;

        //Obtenemos el id del usuario
        const userId = req.user.id;

        //Cambiamos el estado del registro a cancelada
        await cancelRegistrationHackathonModel(hackathonId, userId);

        res.status(200).send({
            status: 'ok',
            message: 'Has cancelado tu participacion',
        });
    } catch (err) {
        next(err);
    }
};
export default cancelRegistrationController;
