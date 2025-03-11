//Importar modelos necesarios
import selectRatingsByHackathonIdAndUserId from '../../models/ratings/selectRatingsByHackathonIdAndUserIdModel.js';

//Importar función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que lista los hackatones
const selectRatingsByHackathonIdAndUserIdController = async (req, res, next) => {
    try {
        //Obtener los hackathones
        const { hackathonId, userId } = req.params;
        const rating = await selectRatingsByHackathonIdAndUserId(hackathonId, userId);

        res.send({
            status: 'ok',
            data: {
                rating
            },
        });
    } catch (error) {
        next(error);
    }
    
};

export default selectRatingsByHackathonIdAndUserIdController;
