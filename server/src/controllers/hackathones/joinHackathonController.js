//Import models
import insertRegistrationModel from '../../models/hackathones/insertRegistrationModel.js';
//Import utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Funcion que une un dev con un hackathon
const joinHackathonController = async (req, res, next) => {
    try {
        //Comprobamos si el usuario es dev
        if (req.user.role !== 'dev') {
            generateErrorUtil(401, 'No tienes los permisos necesarios');
        }
        //Obtener hackathonId
        const { hackathonId } = req.params;

        //Insertamos el codigo de confrimacion y enviamos el correo
        await insertRegistrationModel(req.user.id, hackathonId);

        //Enviamos la respuesta
        res.status(200).send({
            status: 'ok',
            message:
                'Te has unido al Hackathon! Confirma tu participacion en el correo que se te ha enviado!',
        });
    } catch (err) {
        next(err);
    }
};

export default joinHackathonController;
