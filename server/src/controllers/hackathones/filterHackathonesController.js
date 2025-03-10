import generateErrorUtil from '../../utils/generateErrorUtil.js';
import HackathonesFilter from '../../models/hackathones/filterHackathonesModel.js';

const filterHackathonesController = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const { title, programmingLang, startingDate, location, type, image } =
=======
        const { title, programmingLang, startingDate, location, type } =
>>>>>>> 0ee0556c7d56e893c980df2e0d9728984fc9a463
            req.query;
        const hackathones = await HackathonesFilter({
            title,
            programmingLang,
            startingDate,
            location,
            type,
<<<<<<< HEAD
            image,
=======
>>>>>>> 0ee0556c7d56e893c980df2e0d9728984fc9a463
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
