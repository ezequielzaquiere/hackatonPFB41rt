//Importar modelos
import showUserInfoModel from '../../models/users/showUserInfoModel.js';

//función controladora que enseña datos del usuario no sensibles.
const showUserInfoController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await showUserInfoModel(id);

        res.send({
            status: 'ok',
            message: 'Datos de usuario desplegados',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default showUserInfoController;
