//Import models
import cancelRegistrationHackathonModel from '../../models/registrations/cancelRegistrationHackathonModel.js';
//Import utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion que permite cancelar la participacion en un hackathon
const cancelRegistrationController = async (req, res, next) => {
    try {
        //Comprobamos si el usuario es dev
        if (req.user.role !== 'dev') {
            generateErrorUtil(401, 'No tienes los permisos necesarios');
        }

        //Comprobamos el estado del registro
        if (req.registration) {
            if (req.registration === 'pendiente') {
                generateErrorUtil(
                    409,
                    'Todavia no has confirmado tu asistencia'
                );
            }

            if (req.registration === 'cancelada') {
                generateErrorUtil(409, 'Ya has cancelado tu participación');
            }
        }
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
