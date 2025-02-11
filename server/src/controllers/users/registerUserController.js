const registerUserController = async (req, res, next) => {
    try {
        res.status(201).send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

export default registerUserController;
