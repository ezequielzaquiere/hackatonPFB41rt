//Modelos
import updateUserPassRecoverModel from '../../models/users/updateUserPassRecoveryModel.js';

//Función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que envía un código de recuperación de contraseña al email indicado.
const useRecoveryPassCodeController = async (req, res, next) => {
    try {
        //Obtener el código de recuperación de contraseña
        const { userId, recoverPassCode } = req.params;

        //Obtener los datos necesarios
        const { newPassword } = req.body;

        //Lanzar error si falta el campo
        if (!newPassword) {
            generateErrorUtil(400, 'Falta la nueva contraseña');
        }

        //Actualizar la contraseña del usuario en la DB
        await updateUserPassRecoverModel(userId, newPassword, recoverPassCode);

        //Respuesta
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default useRecoveryPassCodeController;
