// Importamos los modelos necesarios.
import listHackathonParticipants from "../../models/registrations/listHackathonParticipantsModel.js";

//Función controladora que devuelve los usuarios de un hackaton determinado
const listHackathonParticipantsController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const {hackathonId} = req.params;
        
        const user = await listHackathonParticipants(hackathonId);
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

export default  listHackathonParticipantsController;