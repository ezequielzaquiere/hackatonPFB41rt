// Importamos los modelos necesarios.
import insertRatingModel from '../../models/ratings/insertRatingModel.js';
import selectHackathonDetailsByIdModel from '../../models/hackathones/selectHackathonDetailsByIdModel.js';
import checkUserParticipationModel from '../../models/users/checkUserParticipationModel.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que valora un hackathon.
const ratingHackathonController = async (req, res, next) => {
    try {
        // Obtenemos el ID del hackathon.
        const { hackathonId } = req.params;

        // Obtenemos los datos del hackathon.
        let hackathon = await selectHackathonDetailsByIdModel(hackathonId);

        // Verificamos si el hackathon ha finalizado.
        const now = new Date();
        const hackathonDeadline = new Date(hackathon.deadline);

        if (hackathonDeadline > now) {
            generateErrorUtil(
                400,
                'No puedes valorar un hackathon que aún no ha finalizado'
            );
        }

        // Verificamos si el usuario ha participado en el hackathon.
        const userParticipated = await checkUserParticipationModel(
            hackathonId,
            req.user.id
        );

        if (!userParticipated) {
            generateErrorUtil(
                401,
                'Solo los participantes pueden valorar el hackathon'
            );
        }

        // Si es el admin, lanzamos un error.
        if (req.user.role === 'admin') {
            generateErrorUtil(401, 'No tienes suficientes permisos');
        }

        // Obtenemos el valor de la valoración.
        const { rating } = req.body;

        // Validación del valor de la valoración.
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            generateErrorUtil(
                400,
                'La valoración debe ser un número entero entre 1 y 5'
            );
        }

        // Insertamos la valoración.
        await insertRatingModel(
            rating,
            hackathonId,
            req.user.id,
            req.user.role
        );

        // Obtenemos de nuevo los datos del hackathon para actualizar la media de valoraciones.
        hackathon = await selectHackathonDetailsByIdModel(hackathonId);

        res.send({
            status: 'ok',
            message: 'Valoración realizada',
            data: {
                hackathon: {
                    avgRating: hackathon.avgRating,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default ratingHackathonController;
