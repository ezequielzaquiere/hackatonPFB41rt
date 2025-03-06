// Importamos los modelos necesarios.
import listCreatedHackathonsHistoryModel from "../../models/users/listCreatedHachathonsHistoryModel.js";

// Función controladora que devuelve los hackatones a los que un usuario está inscrito
const listCreatedHackathonsHistoryController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const { username } = req.params;
        
        const user = await listCreatedHackathonsHistoryModel(username);
        
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

export default listCreatedHackathonsHistoryController;