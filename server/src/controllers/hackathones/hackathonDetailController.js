import selectHackathonByIdModel from '../../models/hackathones/selectHackathonByIdModel.js';

const hackathonDetailController = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Llamamos al modelo para obtener los detalles del hackathon
        const hackathon = await selectHackathonByIdModel(id);

        if (!hackathon) {
            return res.status(404).json({ message: 'Hackathon no encontrado' });
        }

        res.status(200).json(hackathon);
    } catch (error) {
        next(error);
    }
};

export default hackathonDetailController;
