// Importamos los modelos necesarios.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

// Función controladora que retorna el perfil privado del usuario.
const privateUserProfileController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const { username, firstName, lastName, email, avatar } =
            await selectUserByIdModel(req.user.id);
        res.send({
            status: 'ok',
            data: {
                username,
                firstName,
                lastName,
                email,
                avatar,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default privateUserProfileController;
