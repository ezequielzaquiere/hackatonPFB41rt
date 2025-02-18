//Importar modelos.
import updateUserPassModel from '../../models/users/updateUserPassModel.js';

//Importar función generadora de errores.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que actualiza una contraseña dada la actual.
const updateUserPassController = async (req, res, next) => {
    try {
        //Obtenemos el id del usuario autenticado.
        const userId = req.user?.userId;

        const { currentPassword, newPassword } = req.body;

        //Verificamos que ambos campos existen.
        if (!currentPassword || !newPassword) {
            generateErrorUtil(400, 'Faltan campos obligatorios');
        }

        //Llamamos al modelo para actualizar la contraseña.
        await updateUserPassModel(userId, currentPassword, newPassword);

        res.status(200).send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserPassController;
