//Importar los modelos.
import updateUserPassRecoverModel from '../../models/users/updateUserPassRecoveryModel.js';

// Importar la función que genera errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que envía un código de recuperación de contraseña al email indicado.
const useRecoveryPassCodeController = async (req, res, next) => {
    try {
        console.log('🛠️ Entrando en el controlador...');
        console.log('🔹 Params:', req.params);
        console.log('🔹 Body:', req.body);
        // Obtenemos el código de recuperación de contraseña.
        const { userId, recoverPassCode } = req.params;

        // Obtenemos los datos necesarios.
        const { newPassword } = req.body;

        // Lanzamos un error si falta algún campo.
        if (!newPassword) {
            generateErrorUtil(400, 'Falta la nueva contraseña');
        }

        // Actualizar la contraseña del usuario.
        await updateUserPassRecoverModel(userId, newPassword, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default useRecoveryPassCodeController;
