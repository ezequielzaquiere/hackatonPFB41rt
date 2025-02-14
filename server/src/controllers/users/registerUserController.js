// Importamos los modelos necesarios.
import insertUserModel from '../../models/users/insertUserModel.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que registra un nuevo usuario.
const registerUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { username, email, password } = req.body;

        // Lanzamos un error si falta algún campo.
        if (!username || !email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Insertamos el usuario.
        await insertUserModel(username, email, password);

        res.status(201).send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, activa tu usuario en el email de verificación que recibirás en tu correo',
        });
    } catch (err) {
        next(err);
    }
};

export default registerUserController;
