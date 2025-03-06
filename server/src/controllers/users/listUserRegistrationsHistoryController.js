// Importamos los modelos necesarios.
import listUserRegistrationHistoryModel from "../../models/users/listUserRegistrationsHistoryModel.js";

// Función controladora que devuelve los hackatones a los que un usuario está inscrito
const listUserRegistrationsHistoryController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const { username } = req.params;
        
        const user = await listUserRegistrationHistoryModel(username);
        
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

export default listUserRegistrationsHistoryController;