import generateErrorUtil from '../../utils/generateErrorUtil.js';
import HackathonesFilter from '../../models/hackathones/filterHackathonesModel.js';

const filterHackathonesController = async (req, res, next) => {
    try {

        const { title, programmingLang, startingDate, location, type, image } =

            req.query;
        const hackathones = await HackathonesFilter({
            title,
            programmingLang,
            startingDate,
            location,
            type,
            image,

        });

        if (hackathones.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron hackathones con esos filtros',
            });
        }

        res.json({ success: true, data: hackathones });
    } catch (error) {
        const customError = generateErrorUtil(
            500,
            'Error al filtrar los hackathones',
            error
        );
        res.status(customError.status).json({
            success: false,
            message: customError.message,
        });
    }
};

export default filterHackathonesController;
