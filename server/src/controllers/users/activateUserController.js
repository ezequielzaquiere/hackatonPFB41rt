// Importamos los modelos.
import updateActiveUserModel from '../../models/users/updateActiveUserModel.js';

// Función controladora que registra un nuevo usuario.
const activateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro.
        const { regCode } = req.params;

        // Registramos al usuario.
        await updateActiveUserModel(regCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};

export default activateUserController;
