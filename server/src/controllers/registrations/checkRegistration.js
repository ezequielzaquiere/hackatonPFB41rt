import selectRegistrationByUserIdAndHackathonId from '../../models/registrations/selectRegistrationByUserIdAndHackathonId.js';

const checkRegistration = async (req, res) => {
    const { userId, hackathonId } = req.params;

    try {
        const registration = await selectRegistrationByUserIdAndHackathonId(
            userId,
            hackathonId
        );

        if (registration) {
            return res.json(registration); // Si el usuario está registrado, devolvemos los datos.
        }
    } catch (error) {
        res.status(500).json({
            error: 'Hubo un error al obtener la inscripción.',
        });
    }
};

export default checkRegistration;
