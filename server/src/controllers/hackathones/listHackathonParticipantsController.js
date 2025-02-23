// Importamos los modelos necesarios.
import listHackathonParticipantsModel from "../../models/registrations/listHackathonParticipantsModel.js";
import selectHackathonDetailsByIdModel from "../../models/hackathones/selectHackathonDetailsByIdModel.js";

//Función controladora que devuelve los usuarios de un hackaton determinado
const listHackathonParticipantsController = async (req, res, next) => {
    try {
        // Obtenemos los datos de usuario.
        const {hackathonId} = req.params;

        const hackathonUsers = await listHackathonParticipantsModel(hackathonId);



        res.send({
            status: 'ok',
            data: {
                hackathonUsers,
            },    
        });
    } catch (err) {
        next(err);
    }
};

export default listHackathonParticipantsController;