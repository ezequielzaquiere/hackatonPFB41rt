//Importamos models
import confirmRegistrationHackathonModel from '../../models/registrations/confirmRegistrationHackathonModel.js';
//Importamos util
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion que actualiza el estado de la participacion en un hackathon
const confirmRegistrationHackathonController = async (req, res, next) => {
    try {
        if (req.local.registration === 'confirmada') {
            generateErrorUtil(409, 'La asistencia ya ha sido confirmada');
        }

        if (req.local.registration === 'cancelada') {
            generateErrorUtil(
                409,
                'No puedes volverte a inscribir si ya has cancelado tu participacion'
            );
        }
        const { confirmationCode } = req.params;

        if (!confirmationCode) {
            generateErrorUtil(400, 'Falta el codigo de confirmacion');
        }

        //Actualizamos el estado de la participacion
        await confirmRegistrationHackathonModel(confirmationCode);

        res.status(200).send({
            status: 'ok',
            message: 'Has confirmado tu participación!',
        });
    } catch (err) {
        next(err);
    }
};
export default confirmRegistrationHackathonController;
