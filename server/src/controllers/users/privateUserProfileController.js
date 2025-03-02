// Importamos los modelos necesarios.
import selectUserByIdModel from '../../models/users/showUserPrivateInfoModel.js';

// Función controladora que retorna el perfil privado del usuario.
const privateUserProfileController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const user = await selectUserByIdModel(req.user.id);
        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default privateUserProfileController;
