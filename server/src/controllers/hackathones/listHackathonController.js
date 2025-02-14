//Importar modelos necesarios
import selectAllHackathonesModel from '../../models/hackathones/selectAllHackathonesModel.js';

//Función controladora que lista los hackatones
const listHackathonController = async (req, res, next) => {
    try {
        //Obtener los filtros (query params)
        const { title, creator } = req.query;

        //Obtener los hackathones
        const hackathones = await selectAllHackathonesModel(title, creator);

        res.send({
            status: 'ok',
            data: {
                hackathones,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listHackathonController;
