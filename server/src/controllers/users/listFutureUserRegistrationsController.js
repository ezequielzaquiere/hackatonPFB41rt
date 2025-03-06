// Importamos los modelos necesarios.
import listFutureUserRegistrationsModel from "../../models/users/listFutureUserRegistrationsModel.js";

// Función controladora que devuelve los hackatones a los que un usuario está inscrito
const listFutureUserRegistrationsController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const { username } = req.params;
        
        const user = await listFutureUserRegistrationsModel(username);
        
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

export default listFutureUserRegistrationsController;