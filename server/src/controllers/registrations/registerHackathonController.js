//Import models
import insertRegistrationModel from '../../models/registrations/insertRegistrationModel.js';
//Import utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion que une un dev con un hackathon
const registerHackathonController = async (req, res, next) => {
    try {
        if (req.registration) {
            if (req.registration === 'confirmada') {
                generateErrorUtil(409, 'La asistencia ya ha sido confirmada');
            }
        }
        //Obtener hackathonId
        const { hackathonId } = req.params;

        //Insertamos el codigo de confrimacion y enviamos el correo
        await insertRegistrationModel(req.user.id, hackathonId);

        //Enviamos la respuesta
        res.status(200).send({
            status: 'ok',
            message:
                'Te has unido! Confirma tu participacion en el correo que se te ha enviado!',
        });
    } catch (err) {
        next(err);
    }
};

export default registerHackathonController;
