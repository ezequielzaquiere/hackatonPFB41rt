// Importar los modelos.
import useRecoveryPassCodeModel from '../../models/users/userRecoveryPassCodeModel.js';

// Importar la función que genera errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que envía un código de recuperación de contraseña al email indicado.
const useRecoveryPassCodeController = async (req, res, next) => {
    try {
        // Obtenemos el código de recuperación de contraseña.
        const { recoverPassCode } = req.params;

        //Traer el ID del usuario.
        const userId = req.user.id;

        // Obtenemos los datos necesarios.
        const { newPassword, repeatedNewPassword } = req.body;

        // Lanzamos un error si falta algún campo.
        if (!newPassword || !repeatedNewPassword) {
            generateErrorUtil(400, 'Faltan campos');
        }

        // Si las contraseñas no coinciden lanzamos un error.
        if (newPassword !== repeatedNewPassword) {
            generateErrorUtil(400, 'Las contraseñas no coinciden');
        }

        // Actualizar la contraseña del usuario.
        await useRecoveryPassCodeModel(userId, newPassword, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default useRecoveryPassCodeController;
