// Importamos los modelos necesarios.
import showUserPrivateInfoModel from '../../models/users/showUserPrivateInfoModel.js';

// Función controladora que retorna el perfil privado del usuario.
const privateUserProfileController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const user = await showUserPrivateInfoModel(req.user.id);
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
