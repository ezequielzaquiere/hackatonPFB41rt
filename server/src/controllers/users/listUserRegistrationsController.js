// Importamos los modelos necesarios.
import listUserRegistrationsModel from "../../models/users/listUserRegistrationsModel.js";

// Función controladora que devuelve los hackatones a los que un usuario está inscrito
const listUserRegistrationsController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const { id } = req.params;
        
        const user = await listUserRegistrationsModel(id);
        
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

export default listUserRegistrationsController;