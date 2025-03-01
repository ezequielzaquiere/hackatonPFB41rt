//función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importar el modelo
import selectHackathonDetailsByIdModel from '../../models/hackathones/selectHackathonDetailsByIdModel.js';

const hackathonDetailController = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Obtener los hackathones por el Id
        const detallesHackathones = await selectHackathonDetailsByIdModel(id);

        res.send({
            status: 'ok',
            data: {
                hackathon: detallesHackathones,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default hackathonDetailController;
