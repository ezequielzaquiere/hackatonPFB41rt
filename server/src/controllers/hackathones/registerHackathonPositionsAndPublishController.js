
import selectHackathonDetailsByIdModel from '../../models/hackathones/selectHackathonDetailsByIdModel.js';
import listHackathonParticipants from '../../models/registrations/listHackathonParticipantsModel.js';
import insertPodiumModel from '../../models/podium/insertPodiumModel.js';
import editPublicRegistration from '../../models/hackathones/editPublicRegistrationsModel.js';

// Importamos la función que genera un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';


const registerHackathonPositionsAndPublish = async (req, res, next) => {
    try {
        
        const { hackathonId } = req.params;
        
        const {
            first,
            second,
            third
        } = req.body;


        // Obtenemos los datos del hackathon.
        let hackathon = await selectHackathonDetailsByIdModel(hackathonId);

        //Check para no volver a cambiar el podio una vez publicado
        if (hackathon.resultsPublised == 1) {
            generateErrorUtil(
                400, 
                'Ya se ha seleccionado el podio.')
        }
        
        //Check para ver que el hackathon ha terminado
        const now = new Date();
        const dateDeadline = hackathon.deadline;

        if (dateDeadline > now) {
            generateErrorUtil(
                400,
                'El hackathon aún no ha terminado.'
            )
        }
        
        
        //Recoger todos los usuarios registrados en un hackathon (confirmados)
        await listHackathonParticipants(hackathonId);


        //Dejar que el admin pueda introducir el top 3
        await insertPodiumModel(first, second, third, hackathonId);


        //Publicar la lista de registrados de hackathon
        editPublicRegistration(hackathonId);
            

        res.send({
            status: 'ok',
            message: 'Posiciones de podio añadidas y lista publicada!',

        });
    } catch (err) {
        next(err);
    }
};

export default registerHackathonPositionsAndPublish;