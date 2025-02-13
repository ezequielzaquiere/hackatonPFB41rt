//Import dependencias
//Import models
//Import utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendEmailUtil from '../../utils/sendEmailUtil.js';

//Funcion que une un dev con un hackathon
const joinHackathonController = async (req, res, next) => {
    try {
        res.status(200).send({
            status: 'ok',
            message:
                'Te has unido! Confirma tu participacion en el correo que se te ha enviado!',
        });
    } catch (err) {
        next(err);
    }
};

export default joinHackathonController;
