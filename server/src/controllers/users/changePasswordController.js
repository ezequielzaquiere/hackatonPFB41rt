// Importamos los modelos necesarios.
import changePasswordModel from '../../models/users/changePasswordModel.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que envía un código de recuperación de contraseña al email indicado.
const changePasswordController = async (req, res, next) => {
    try {
        // Obtenemos el código de recuperación de contraseña.
        const { recoverPassCode } = req.params;

        // Obtenemos los datos necesarios.
        const { newPassword, repeatedNewPassword } = req.body;

        // Lanzamos un error si falta algún campo.
        if (!newPassword || !repeatedNewPassword) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Si las contraseñas no coinciden lanzamos un error.
        if (newPassword !== repeatedNewPassword) {
            generateErrorUtil('Las contraseñas no coinciden', 400);
        }

        // Actualizar la contraseña del usuario.
        await changePasswordModel(newPassword, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default changePasswordController;
