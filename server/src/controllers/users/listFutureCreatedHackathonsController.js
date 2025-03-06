// Importamos los modelos necesarios.
import listFutureCreatedHackathonsModel from "../../models/users/listFutureCreatedHackathonsModel.js";
// Función controladora que devuelve los hackatones a los que un usuario está inscrito
const listFutureCreatedHackathonsController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const { username } = req.params;
        
        const user = await listFutureCreatedHackathonsModel(username);
        
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

export default listFutureCreatedHackathonsController;